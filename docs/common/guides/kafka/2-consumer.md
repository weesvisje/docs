---
title: '2 - Ditto events'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Consuming events

Once you have your consumer running, you will see events written to the console every time a change is replicated to the Ditto Big Peer. 

While the script is running, make a change to see the event in the console. For example, `upsert` a new value into the `people` collection:


<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'HTTP', value: 'http'},
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>

<TabItem value="http">

  ```bash
  curl -X POST 'https://{app_id}.cloud.ditto.live/api/v1/collections/people/documents' \
    --header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
    --header 'Content-Type: application/json' \
    --data-raw '{"name": "Susan", "age": 31}'
  ```

</TabItem>
<TabItem value="javascript">

```js
const docID = await ditto.store.collection('people').upsert({
    name: "Susan",
    age: 31
})
```

</TabItem>
<TabItem value="swift">

```swift
// upsert JSON-compatible data into Ditto
let docId = ditto.store["people"].upsert([
    "name": "Susan",
    "age": 31
])
```

</TabItem>
<TabItem value="objc">

```objc
// upsert JSON-compatible data into Ditto
DITDocumentID *docID = [[ditto.store collection:@"people"]
     upsert:@{ @"name": @"Susan", @"age": [NSNumber numberWithInt:31] }
     isDefault:false
     error:nil];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
val docId = ditto.store["people"].upsert(mapOf(
    "name" to "Susan",
    "age" to 31
))
```

</TabItem>
<TabItem value="java">

```java
Map<String, Object> content = new HashMap<>();
content.put("name", "Susan");
content.put("age", 31);
DittoDocumentID docId = ditto.store.collection("people").upsert(content);
```

</TabItem>
<TabItem value="csharp">

```csharp
var content = new Dictionary<string, object>
{
    { "name", "Susan" },
    { "age", 31 }
};
var docId = ditto.Store.Collection("people").upsert(content);
```

</TabItem>
<TabItem value="cpp">

```cpp
json content = json({
    { "name", "Susan" },
    { "age", 31 }
});
DocumentId doc_id = ditto.store.collection("people").upsert(content);
```

</TabItem>
<TabItem value="rust">

  ```rust
  use serde_json::json;
  let content = json!({
    "name": "Susan",
    "age": 31
  });
  let doc_id = ditto.store().collection("people")?.upsert(content, None, false)?;
  ```

</TabItem>
</Tabs>


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

