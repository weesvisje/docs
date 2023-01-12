---
title: '2 - Ditto events'
---

import SnippetGroup from '@site/src/components/SnippetGroup';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Testing the consumer

Once you have your consumer running, you will see events written to the console
every time a change is replicated to the Ditto Big Peer.  If you want to create
changes to the Ditto database as a result of a consumable event, use the [Ditto
HTTP API](/http/common/concepts/writing).


While the script is running, make a change to see the event in the console. For example, `upsert` a new value:

<SnippetGroup name='upsert' />

After changing a document, look at the terminal running the `bin/kafka-console-consumer.sh` script. 

## New document created

When a new document is created, `method` is `upsert` and the property `change.oldValue` will always be null.

:::info
Please take note of the `txnID` field which describes a timestamp of when the big peer internally replicated data modifications from small peers. This number is an always increasing value.
:::

```json
{
  "txnId": 552789,
  "type": "documentChanged",
  "collection": "people",
  "change": {
    "method": "upsert",
    "oldValue": null,
    "newValue": {
      "_id": "6213e9c90012e4af0017cb9f",
      "date": 1645472201,
      "name": "Susan",
      "age": 31
    }
  }
}
```


## Update

When a document was updated, `method` is `upsert`, `change.oldValue` will contain the old version of the document and `change.newValue` contains the full document after the upsert was complete. `newValue` also includes all properties that did not change as a result of this operation. For example, even though we do not change "age" in the following example, we still see `age` in the resulting Kafka stream. 

After updating the document `6213e9c90012e4af0017cb9f` with the properties:
```
{
  ownedCars: 0, 
  friends: [], 
  name: "Frank"
}
```

We will see the following JSON event stream through the Kafka console:

```json
{
  "txnId": 553358,
  "type": "documentChanged",
  "collection": "people",
  "change": {
    "method": "upsert",
    "oldValue": {
      "_id": "6213e9c90012e4af0017cb9f",
      "date": 1645472312,
      "name": "Susan",
      "age": 31
    },
    "newValue": {
      "_id": "6213e9c90012e4af0017cb9f",
      "date": 1645472312,
      "name": "Frank",
      "age": 31,
      "ownedCars": 0,
      "friends": []
    }
  }
}
```


## Remove

When a document was removed, `method` is `remove`, and the property `change.value` contains the full document at the time it was removed. 

```json
{
  "txnId": 701251,
  "type": "documentChanged",
  "collection": "people",
  "change": {
    "method": "remove",
    "value": {
      "_id": "6213e9c90012e4af0017cb9f",
      "date": 1645468039,
      "name": "Susan",
      "age": 31 
    }
  }
}
```

## RequeryRequired
​
In the event of a failure of the consumer stream fails to keep up with the incoming changes or when there are gaps of data, you may get an event that looks like:
​
```jsonc
{
  "txnID": 45,
  "type": "requeryRequired,
  "documents": [{
    "appId": "abc",
    "collectionName": "people",
    "documentId": "6213e9c90012e4af0017cb9f"
  }]
}
```

This should signal you to call our HTTP RPC API endpoint to query using the transaction_id to catch your system up for each document listed in the collection. Use the `txnId` as a value of the header `X-DITTO-TXN-ID`. 
