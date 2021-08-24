---
title: 'Syncing Data (Live Queries)'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Syncing Data with Live Queries

Ditto will only sync data with other peers when it has an active `LiveQuery`. A `LiveQuery` is a long-running subscription to a constructed Ditto query. 

## Live Queries without Syncing Data

There are many situations where an app needs to observe live queries without initiating syncing with other devices. 

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
  ]
}>
<TabItem value="javascript">

```js
const liveQuery = ditto.store.collection('cars')
    .find("color == 'red'")
    .observeLocal((cars, event) => {
        // do something
    })
```

</TabItem>
<TabItem value="swift">

```swift
// --- Action somewhere in your application
func userDidInsertCar() {
    _ = ditto.store.collection("cars").insert([
        "model": "Ford",
        "color": "black"
    ])
}

// Register live query to update UI
let liveQuery = ditto.store.collection("cars").find("color == 'red'")
  .observeLocal { cars, event in
    // do something
  }
```

</TabItem>
<TabItem value="objc">

```objc
// --- Action somewhere in your application
-(void) userDidInsertCar() {
    [[ditto.store collection:@"cars"] insert:@{
        @"model": @"Ford",
        @"color": @"black"
    }];
}

// Register live query to update UI
DITLiveQuery *liveQuery = [[collection find:@"color == 'red'"]
    observeLocal:^(NSArray<DITDocument *> *docs, DITLiveQueryEvent *event) {

    }
}];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// --- Action somewhere in your application
fun userDidInsertCar() {
    ditto.store.collection("cars").insert(mapOf(
        "model" to "Ford",
        "color" to "black"
    ))
}

// --- Register live query to update UI
this.liveQuery = ditto.store.collection("cars").
    .findAll()
    .observeLocal { docs, event ->
    // Do something...
}
```

</TabItem>
<TabItem value="java">

```java
// --- Action somewhere in your application
public void userDidInsertCar() {
    Map<String, Object> content = new HashMap<>();
    content.put("model", "Ford");
    content.put("color", "black");
    ditto.store.collection("cars").insert(content);
}

// --- Register live query to update UI
this.liveQuery = ditto.store.collection("cars")
    .findAll()
    .observe((docs, event) -> {
        // Do something...
    });
```

</TabItem>
<TabItem value="csharp">

```csharp
// --- Action somewhere in your application
// --- Action somewhere in your application
void user_did_insert_car()
{
    var carsDocument = new Dictionary<string, object>
    {
        { "model", "Ford" },
        { "color", "black" }
    };
    ditto.Store.Collection("cars").Insert(carsDocument);
}

// --- Register live query to update UI
var localLiveQuery = ditto.Store.Collection("cars").Find("color == 'red'").ObserveLocal((docs, DittoLiveQueryEvent) =>
{
    // Do something...
});
```

</TabItem>
<TabItem value="cpp">

```cpp
// --- Action somewhere in your application
void user_did_insert_car() {
    ditto.tore.collection("cars").insert({
        {"model", "Ford"},
        {"color", "black"}
    });
}

// --- Register live query to update UI
std::shared_ptr<LiveQuery> query = collection
  .find("color == 'red'")
  .observe_local(LiveQueryEventHandler{
    [&](std::vector<Document> docs, LiveQueryEvent event) {
      
    }});
```

</TabItem>
</Tabs>