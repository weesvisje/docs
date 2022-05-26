---
title: '4 - Producing events'
---
 
## Producing events

Currently, Ditto only supports consuming events from the Kafka endpoint topic  `user-consumable-APPID`.  If you want to produce changes to the ditto database as a result of a consumable event, use the the [Ditto SDK](/concepts/upsert). We recommend that you use the HTTP API to react to document changes.

## RequeryRequired
​
In the event of a failure of the consumer stream fails to keep up with the incoming changes or when there are gaps of data, you may get an event that looks like:
​
```jsonc
{
  "txnID": 45,
  "type": "RequeryRequired"
}
```

This should signal you to call our HTTP RPC API endpoint to query using the transaction_id to catch your system up. Use the `txn_id` as part of the `X-DITTO-TXN-ID`. 

## MirrorMaker2

Alternatively, you can use Kafka's MirrorMaker2 as the client so you can bring the Ditto data straight into your stream and process from there rather than having a custom client.
