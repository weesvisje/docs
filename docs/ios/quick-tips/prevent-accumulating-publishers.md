---
title: 'Preventing Accumulating Combine Publishers'
sidebar_position: 6
---

_Note: This is a general concept that isn't specific to Ditto, but really towards all applications that might use Combine or RxSwift._

* [For the full source code visit the GitHub Sample here](https://github.com/getditto/samples/tree/master/combine-switchtolatest)
* [Video demonstration of the issue and solution](https://www.loom.com/share/40e110dfecf54fcbbeb6c4e69537c055)

A common issue we see in reactive apps is a failure to dispose of resources as conditions change. Perhaps your app sees a large accumulation of publishers that infinitely grow. Let's take a look at this common pitfall in a simple example. 

Let's say we have a collection of flights and each document has a structure like this:

```js
[
  {
    "_id": "123abc",
    "carrier": "BA",
    "number": 45,
    "from": "SFO",
    "to": "LHR"
  },
  {
    "_id": "456284a",
    "carrier": "BA",
    "number": 8942,
    "from": "SFO",
    "to": "LHR"
  },
  {
    "_id": "8sd24s",
    "carrier": "LH",
    "number": 8942,
    "from": "JFK",
    "to": "FRA"
  }
  {
    "_id": "79542",
    "carrier": "UA",
    "number": 1234,
    "from": "ORD",
    "to": "MIA"
  }
  // etc...
]
```

## Creating a memory leak with Combine

Now our application code has a `ViewModel` that creates a live queries based off a change of the `carrier` property. Each time the carrier changes, we register a new `liveQueryPublisher` with the `args: ["carrier": carrier]` query argument. Like all good Combine best practices, we store the publisher references in a `var cancellables = Set<AnyCancellables>()`.

```swift
import DittoSwift
import Combine
import SwiftUI

class ViewModel: ObservableObject {
  
  @Published var flights: [Flight] = []
  @Published var carrier: String = "BA"
  
  var cancellables = Set<AnyCancellables>()
  
  init() {
    $carrier.sink { carrier in
            DittoManager.shared.ditto.store.collection("flights")
                .find("carrier == $args.carrier", args: ["carrier": carrier])
                .liveQueryPublisher()
                .sink { (docs, _) in
                    self.flights = docs.map({ try! $0.typed(as: Flight.self).value })
                }
                .store(in: &self.cancellables)
        }
        .store(in: &cancellables)
  }
}
```

Here's our problem, each time we change the `carrier` to a new value, you will notice that your app's memory usage will gradually rise. It will be even worse if new documents change while this happens. Why is this?

Our app is to filter the ` @Published var flights: [Flight]` variable to match the current `carrier`. However, each time the carrier changes, __we are registering a new `liveQueryPublisher` without disposing the previous live query__! There lies the root cause of the accumulation of publishers. 

### A hacky fix

A hacky way to fix this is by storing the `liveQueryPublisher()` into another set of cancellables and dispose of them whenever the carrier changes. 

```swift
import DittoSwift
import Combine
import SwiftUI

class ViewModel: ObservableObject {
  
  @Published var flights: [Flight] = []
  @Published var carrier: String = "BA"
  
  var cancellables = Set<AnyCancellables>()
  // this was added
  var liveQueryCancellables = Set<AnyCancellables>()
  
  init() {
    $carrier.sink { carrier in
            // cancel all the live queries when this value changes. 
            liveQueryCancellables.removeAll()
            DittoManager.shared.ditto.store.collection("flights")
                .find("carrier == $args.carrier", args: ["carrier": carrier])
                .liveQueryPublisher()
                .sink { (docs, _) in
                    self.flights = docs.map({ try! $0.typed(as: Flight.self).value })
                }
                .store(in: &self.liveQueryCancellables) // store it in another set of cancellables
        }
        .store(in: &cancellables)
  }
}
```

Hooray! This solves the problem! You'll notice that there is now only `1` live query regardless of the `carrier` changes. However, this has made the application more complex and hard to read, as every `sink` requires managing cancellable states. If you add more live queries this gets complicated quite fast. 

:::caution 
### Key Takeaway
Do not put a `.sink` within `.sink`. This is almost always an anti-pattern that will cause a lot of headache. 
:::

## The Good way!

How do we maintain only 1 liveQueryPublisher even if the carrier changes in the most clean Combine-friendly way? Let's see:

```swift
class SolutionViewModel: ObservableObject {

    @Published var carrier: String = DittoManager.carriers.randomElement()!
    @Published var flights: [Flight] = []

    var cancellables = Set<AnyCancellable>()

    init() {

        $carrier
            .removeDuplicates() // 1. 
            .map({ carrier in // 2.
                return DittoManager.shared.ditto.store.collection("flights")
                    .find("carrier == $args.carrier", args: ["carrier": carrier])
                    .liveQueryPublisher()
            })
            .switchToLatest() // 3.
            .map({ (docs, _) in // 4.
                return docs.map({ try! $0.typed(as: Flight.self).value })
            })
            .assign(to: \.flights, on: self) // 5. 
            .store(in: &cancellables) // 6. 
        
    }
}
```

Let's review what we did (see the code comments for the correlated bullet numbers):

1. We observe the carrier, but only if the values change by using `removeDuplicates()`. This means if the carrier value goes from `AS` to `AS`, it is fired only once. But if the value goes from `AS` to `LH` it's fired twice. It will compare the new and the old value and emit once the values are different. 
2. Once we get the `carrier`, we `.map` it to a `liveQueryPublisher` while feeding in the query arguments. Note that this `.map` isn't returning documents, but a `Publisher`. This key is difference is important in step 3. 
3. The next operator is the most critical, we add a `switchToLatest()`. This operator will switch the chain of operators to the latest publisher (from the last `.map`). _Any previous publisher will be disposed or canceled!_. This is the operator that does all the work! 
4. We can now `.map` the `docs` results of the `liveQueryPublisher` and decode them to `Flight`. 
5. Instead of using `.sink`, we `.assign` the `flights: [Flight]` to the `self.flights` variable. 
6. Finally, we store the entire chain of commands as _a single publisher in a single `Set<AnyCancellable>()`_! 

The summary:

Use `.map` to return a `Publisher` and follow it immediately with `switchToLatest()` to ensure the publishers do not accumulate and that only one is registered down the chain of operators. Using both is not only helpful with Ditto-based applications, but also any application that uses Combine. This will prevent quite a lot of memory leaks in the future. 

If you are familiar with [RxSwift](https://github.com/ReactiveX/RxSwift), `.map` + `switchToLatest` is the same as `flatMapLatest`.
