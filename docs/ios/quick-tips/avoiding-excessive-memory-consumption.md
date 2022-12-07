---
title: 'Avoiding Excessive Memory Consumption'
---

Ditto's documents have value semantics by design. This means that whenever you
get a `DittoDocument` from the Ditto API, it's referencing an individual *copy*
of the corresponding document data in-memory, plus quite a bit of book-keeping.
To keep the memory footprint low, it is therefore crucial to *release those
blobs of data as early as possible*, freeing the claimed memory space.

Special care needs to be taken whenever you spread the work across multiple
queues or async APIs. It is very easy to end up with a lot of work items on a
queue, each holding on to large amounts of data, such as big arrays of Ditto
documents. This isn't always obvious, leads to mysterious excessive memory
consumption, eventually resulting in an out-of memory crash, especially on
mobile devices.

## Live Queries

Live queries are particularly prone to this problem. Consider the following
typical example:

```swift
// BAD:
self.liveQuery = ditto.store.collection("A").find("store_id == 'abc123'").observeLocal { [weak self] documents, event in
    self?.documentProcessingQueue.async {
        print("[INFO] Processing \(documents.count) changed documents...")
        // Inspect the changed documents, update UI state, etc.
    }
}
```

Depending on the amount of documents in the store and especially the rate at
which those are updated, that observation callback might be called many times,
each time with a fresh copy of the documents data (because value semantics) held
in-memory. Each of those dispatches will hold on to these document copies until
the work item had a chance to run. If the `documentProcessingQueue` can't keep
up processing those documents and releasing them fast enough, more and more
documents are accumulated in memory waiting to be processed, resulting in
excessive memory use.

## Back Pressure

To deal with these situations, all of our APIs prone to this problem have more
advanced variants allowing you to control the rate at which those callbacks are
called. This mechanism is commonly referred to as _Back Pressure_ (see for example
[here](https://tanaschita.com/20211205-back-pressure-in-combine) and
[here](https://medium.com/@jayphelps/backpressure-explained-the-flow-of-data-through-software-2350b3e77ce7)).
Here is a much safer and more efficient way to implement the example above:

```swift
// BETTER:
self.liveQuery = ditto.store.collection("A").find("store_id == 'abc123'").observeLocalWithNextSignal { [weak self] documents, event, signalNext in
    self?.documentProcessingQueue.async {
        print("[INFO] Processing \(documents.count) changed documents...")
        // Inspect the changed documents, update UI state, etc.
        
        // Tell Ditto we are done and ready to process the next batch:
        signalNext()
    }
}
```

Since this particular pattern is so common, Ditto offers a convenience variant.
But it requires *all work to be performed within the callback* without
dispatching onto different queues or using any async API that would hold on to
the documents.

```swift
// CONVENIENT:
self.liveQuery = ditto.store.collection("A").find("store_id == 'abc123'").observeLocal(deliverOn: self.documentProcessingQueue) { [weak self] documents, event in
        print("[INFO] Processing \(documents.count) changed documents...")
        // Inspect the changed documents, update UI state, etc.

        // IMPORTANT: all work needs to be performed within this block without
        // dispatching onto different queues or using any async APIs.
        
        // In this case, Ditto will internally call `signalNext` for us when
        // this block finishes.
    }
}
```

Sometimes you do need to use async APIs or dispatch onto more queues (including
the main queue), in which case the following, most versatile, variant should be
used:

```swift
// VERSATILE:
self.liveQuery = ditto.store.collection("A").find("store_id == 'abc123'").observeLocalWithNextSignal(deliverOn: self.liveQueryQueue) { [weak self] documents, event, signalNext in
    // Whenever we have to use asynchronous API that will hold on to the
    // documents, Ditto won't know when it's safe to deliver the next batch of
    // changes, so we have to tell it explicitly by calling `signalNext()`.    
    self?.processDocumentsAsynchronously(documents) {
        signalNext()
    }
}
```

## Rule of Thumb

All of this boils down to the following rule of thumb:

--------------------------------------------------------------------------------

Use `observeLocal(deliverOn:)` *only* if the received `documents` including the
`event` are processed and can be released within that callback without
dispatching onto other queues or using any async APIs. Otherwise, use
`observeLocalWithNextSignal(deliverOn:)` and call the `DittoSignalNext` block after
the received documents are fully processed and can be released.

--------------------------------------------------------------------------------

This of course doesn't mean that you can never keep a reference to the
documents and use or operate on them later on. In fact, a typical use-case
would be to always keep the latest set of documents returned by a (live) query
to display them in the UI or use otherwise. The important thing is to control
the rate at which those are delivered and let Ditto know when you are ready to
receive the next batch. This rule of thumb can help with that.

## Implementation Details

The four variants shown in this article are as follows:

```swift
- observeLocal(handler:)
- observeLocal(deliverOn:handler:)
- observeLocalWithNextSignal(handler:)
- observeLocalWithNextSignal(deliverOn:handler:)
````

The former three are convenience methods and are implemented in terms of the
latter:

```swift
.observeLocal() { documents, event in
    // Process documents.
}

// Equivalent to and implemented as:
.observeLocalWithNextSignal(deliverOn: .main) { documents, event, signalNext in
    // Process documents.
    signalNext()
}

```

```swift
.observeLocal(deliverOn: .someQueue) { documents, event, in
    // Process documents.
}

// Equivalent to and implemented as:
.observeLocalWithNextSignal(deliverOn: .someQueue) { documents, event, signalNext in
    // Process documents.
    signalNext()
}
```

```swift
.observeLocalWithNextSignal() { documents, event, signalNext in
    // Process documents.
    signalNext()
}

// Equivalent to and implemented as:
.observeLocalWithNextSignal(deliverOn: .main) { documents, event, signalNext in
    // Process documents.
    signalNext()
}
```
