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
| [Register](../datamodel/register)    | A single primitive value (Number, String, Boolean, Binary File)            | Last (temporal) Write Wins     |
| [Counter](../datamodel/counter)     | A special number capable of preserving incrementing and decrementing semantics | The sum of all site's counters |
| [Replicated Growable Array](../datamodel/array)       | An ordered sequence of any of the other types                              | Remove wins, updates merge     |
| [Map](../datamodel/map)         | A dictionary of name->value mappings where name is a string and value is any of the other types | Remove wins, updates merge     |

## Documents 

The Ditto document is a JSON like document made from a CRDT Map that represents
the JSON Object. The JSON properties are map keys, and the values are any of the
types listed above. One way to think about the types that make up a Ditto
document is like a tree, where there are collections (Array and Map) and leaf
values that are registers or counters.


## Hybrid Logical Clock

It might be tempting to use physical clocks to resolve conflicts when attempting to merge concurrent data changes. However, it's essential to know that even quartz-crystal-based physical clocks can skew forwards or backward in time. Almost every device regularly attempts to synchronize with an NTP-synchronized clock server. But even then, the round trip time from the request to the server's response adds additional variability. In addition, there are limitations to nature and physics that will never allow two measurements of physical time to align precisely. Thus, these conditions led us to determine that physical clocks were not reliable in a distributed mesh network. 

Each Ditto document includes a version vector. The replication system uses the version vector to capture local and observed edits from other peers. When a peer incorporates changes from other peers, the local peer can use the incoming remote peer's version vectors to determine whether the changes are new or old. In other words, a peer can distinguish from other peer's incoming version vectors if the incoming data has "happened before" or not.

Although we decided that we could not build a system that resolved conflicts based purely on physical time, we needed to preserve the notion of physical time as not to confuse users of collaborative applications. However, each peer still needs a deterministic way to resolve conflicts. In other words, each peer when sharing CRDT deltas needs to always resolve conflicts exactly the same way. This requirement still needs _logical_ ordering. This requirement led us to implement the version vector with a Hybrid Logical Clock (often referred to as HLC).

In Ditto's distributed system, the HLC is a 64-bit timestamp comprised of 48 bits of a physical timestamp and 16 bits of a monotonically increasing logical clock. 

## Causal Consistency

Causal Consistency is guaranteed by Ditto. It is causally consistent across any number of related
changes, across many documents and different collections, as long as they are
within the same Ditto AppID. 

To give an intuition about causal consistency,
imagine the following scenario:

On a social network Bob posts a message:

    Bob: "I lost my cat"

Then after some time, he posts:

    Bob: "I found him! What a relief!"

To which Sue replies:

    Sue: "Great news!"

In contrast, an **eventually consistent** database shows messages in any order:

    Bob: "I lost my cat"
    Sue: "Great news!"
    Bob: ...etc

Ditto's Causal Consistency ensures that if a new message is written after seeing some
prior message, then the new message is not visible unless that prior message is
also visible.

To help differentiate Causal Consistency from stronger consistency models, imagine that Alice replies:

    Alice: "Wonderful!"

Causal Consistency allows that the two concurrent messages "Great news!" from
Sue and "Wonderful!" from Alice appear in any order. Both:

    Bob: "I lost my cat"
    Bob: "I found him! What a relief!"
    Sue: "Great news!"
    Alice: "Wonderful!"

And:

    Bob: "I lost my cat"
    Bob: "I found him! What a relief!"
    Alice: "Wonderful!"
    Sue: "Great news!"

Are allowed with Causal Consistency.
