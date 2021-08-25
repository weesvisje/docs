---
title: "Conflict-Free Replicated Data Types (CRDTs)"
sidebar_position: 1
---

# Ditto Delta State CRDT

> This current page is undergoing extensive updates and edits. Please visit this page frequently for more up-to-date information. 

Ditto's data types are based on CRDTs. CRDTs stand for Conflict Free Replicated Data Types.
CRDTs can be updated concurrently by multiple users in a distributed system, without locking or
consensus. Each user edits their own version of the data, and when the versions
are replicated the concurrently edited versions merge together to form a single
version.

This merged version's value is deterministic, which means regardless of the
order that the versions are merged the result is the same. As well as
deterministic we strive to make it unsurprising, and meaningful, in that the
result reflects the input, and some rational interpretation of the input. For
example, if two users set a register to the values "Coca-Cola" and "Pepsi" we
don't deterministically resolve all conflicting registers to the value "Sprite",
but instead pick whichever value of "Coca-Cola" or "Pepsi" was written at the
latest time.

## Version Vector

The foundation of determining how data should be merged is using a Ditto document's version vector. 
Each document in each peer contains a hidden metadata map of a `Site_ID` and a `HLC`. The HLC stands for a 
hybrid logical clock. This `HLC` is used to determine whether a change has "happened before". 
For more information about the Hybrid Logical Clock, see below.

Say we have DocumentId: `"123abc"` on Peer A. 

```
DocumentId: "123abc"
Version Vector: {
  "A": 5,
  "B": 1,
  "C": 4
}
```

The version vector above represents that Peer `"A"` has incorporated change from other peers `"B"` and `"C"` at times `1` an `4` respectively.

_Disclaimer: Ditto uses a `UInt128` to represent the `Site_ID` and `64bit timestamp` for the `HLC`. But for educational purposes, 
this documentation will often use strings and numbers for readability. Please continue to the Hybrid Logical Clock portion below to learn more._

If an incoming change arrives at Peer `"A"` with `"B": 4`, then Document will merge the incoming data. This is because Peer `"A"` determined that the document's current state has yet not seen the new change. 


```
DocumentId: "123abc"
Version Vector: {
  "A": 5,
  "B": 1, // 👈 merge in {"B": 4} because 4 > 1
  "C": 4
}
```


## Types


| Type        | Description                                                                | Merge Semantics                |
| ----------- | -----------                                                                | ---                            |
| Register    | A single primitive value (Number, String, Boolean, Binary File)            | Last (temporal) Write Wins     |
| Counter     | A special number capable of preserving incrementing and decrementing semantics | The sum of all site's counters |
| Array       | An ordered sequence of any of the other types                              | Remove wins, updates merge     |
| Map         | A dictionary of name->value mappings where name is a string and value is any of the other types | Remove wins, updates merge     |

{.table .table-striped}

## Examples

The Ditto document is a JSON like document made from a CRDT Map that represents
the JSON Object. The JSON properties are map keys, and the values are any of the
types listed above. One way to think about the types that make up a Ditto
document is like a tree, where there are collections (Array and Map) and leaf
values that are registers or counters.

The examples below illustrate the merge behaviour of each type with an example
of using the type, and how to reason about concurrent changes.

Ditto replicates `deltas` that describe changes to properties of the document. If
a document has 100 named properties, and only the "X" property is changed, only
the metadata and value for the change to the "X" property is replicated. If "X"
is at the end of a path like `"a.b.c.y.X = 'foo'"` then the information that
enables other replicas to correctly merge the nested objects that make up the
path to "X" is replicated.

### Register

A primitive value, a string, or number, or boolean. Ditto uses a temporal
timestamp called an HLC (hybrid logical clock) to associate each register value
with a time. When two registers are merged the value with the highest timestamp
wins.

Imagine a customer who encounters two attendants, one after the other, in this
case a Last Write Wins register is the perfect data type. For example, one
attendant updates a customer's apartment number to '6', and another to apartment
'9'. When the two conflicting versions merge, the edit with the highest
timestamp wins.

In that case that two updates occur at _exactly_ the same time, we use the unique ID of
the Ditto SDK to tie-break, preferring the highest ID.

In the case of a number like an apartment number, a last-write-wins register is
a good choice, but some numbers represent quantities, and that is when a Counter
is useful.

### Counter

A counter is a number that can be incremented and decremented. In this case we
don't want the value with the latest time.

Imagine a property with 3 entrances, each has a member of staff incrementing a
counter each time a customer enters the location. If we used a last-write-wins
register here the value would alternate between the latest updated value for any
single entrance. Instead a counter merges by taking the sum of each locations
value. Entrance A has seen 100 customer, Entrance B has see 33, and Entrance C
has seen 98. The value of the counter is 100 + 33 + 98 = 231.

Counters can be decremented too. A word of warning, there is nothing to stop a
counter from going negative. If there is one can of Pepsi left, and two
attendants decrement the Pepsi count by 1 concurrently, the result is -1 Pepsi
cans.

### Array

An ordered collection of things. The elements of the array can be registers,
counters, maps, even more arrays!

Elements are added to the array at a position. For example a queue of customer
objects can be inserted into an array. Where two customers are inserted at
position four, after customer `X`, the merge will use causal information from
the logical clock to decide which element gets the position, and which gets the
following position. The result is deterministic.

When elements of an array are updated, then the element merges as-per the merge
behaviour of the type at that position in the array.

Merging works in such a way that we never merge the element with a different
element, even if it moves. If some element's position has changed (due to
insertions or removes) at one device, we ensure to merge that element with it's
corresponding version in the other devices.

When an element is removed from the array, a tombstone is recorded, ensuring
that if there is an update concurrent with the remove the remove wins.

### Map

The map represents a JSON like object, and it is the basis of the Ditto Document.
Whenever you create a document you are creating a CRDT Map at its root. We nest maps within
maps to allow complex JSON like document structures. A map is made up of
properties and values. The values can be registers, counter, arrays, or maps.

Maps merge with a remove-wins semantic. This means if some property of the map
is concurrently updated and removed, the remove wins. The values of map
properties merge using the correct method of their type.

#### Type Conflicts

One unique problem for Maps is that it is possible for one device to create a
document where some property is a map, and another device creates the same
document where that property is an array. For example:

Site A creates:

```json
{
  "name":"Bob Jones",
  "address": {
    "street":"Long Road",
    "house number":10298,
    "zip":"90210"
  }
}
```

Whilst Site B creates:

```json
{
  "name": "Bob Jones",
  "address":[
    10298,
    "Long Road",
    "90210"
  ]
}
```

In this instance we cannot merge an array with an object. We chose not to let
the "last updated type" win, as this could lead to a ping-pong of type changes
between the devices. Instead we keep BOTH values for the the "address" property.
We render only the last updated type when we show JSON, but we also provide a
way for the programmer to chose which type to render for a property, or to
render ALL types for a property. This way we can manage type level conflict, and
allow different versions of an application that use different implicit schema to
co-exist.

## Hybrid Logical Clock

It might be tempting to use physical clocks to resolve conflicts when attempting to merge concurrent data changes. However, it's essential to know that even quartz-crystal-based physical clocks can skew forwards or backward in time. Almost every device regularly attempts to synchronize with an NTP-synchronized clock server. But even then, the round trip time from the request to the server's response adds additional variability. In addition, there are limitations to nature and physics that will never allow two measurements of physical time to align precisely. Thus, these conditions led us to determine that physical clocks were not reliable in a distributed mesh network. 

Each Ditto document includes a version vector. The replication system uses the version vector to capture local and observed edits from other peers. When a peer incorporates changes from other peers, the local peer can use the incoming remote peer's version vectors to determine whether the changes are new or old. In other words, a peer can distinguish from other peer's incoming version vectors if the incoming data has "happened before" or not.

Although we decided that we could not build a system that resolved conflicts based purely on physical time, we needed to preserve the notion of physical time as not to confuse users of collaborative applications. However, each peer still needs a deterministic way to resolve conflicts. In other words, each peer when sharing CRDT deltas needs to always resolve conflicts exactly the same way. This requirement still needs _logical_ ordering. This requirement led us to implement the version vector with a Hybrid Logical Clock (often referred to as HLC).

In Ditto's distributed system, the HLC is a 64-bit timestamp comprised of 48 bits of a physical timestamp and 16 bits of a monotonically increasing logical clock. 