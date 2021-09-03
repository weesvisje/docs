---
title: 'Syncing Data (Live Queries)'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Enabling Sync

To enable Ditto to sync data, you'll need to call `ditto.tryStartSync()`. Preferably, you should call `tryStartSync()` early on in your application's life cycle like in your `AppDelegate.application(_:didFinishLaunchingWithOptions:)` or `Application.onCreate` methods. Your application only needs to call this function once. 

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
const ditto = new Ditto()
try {
    ditto.tryStartSync()    
} catch(err) {
    console.error(err)   
}
```

</TabItem>
<TabItem value="swift">

```swift
let ditto = new Ditto()
try {
    ditto.tryStartSync()    
} catch(let err) {
    print(err.localizedDescription)
}
```

</TabItem>
<TabItem value="objc">

```objc
NSError *error = nil;
[ditto tryStartSync:&error];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
try {
    ditto.tryStartSync()
}
catch (e: DittoError) {
    assertThat(e.message).isEqualTo("The license failed verification. Obtain a valid license token at https://portal.ditto.live.")
}
```

</TabItem>
<TabItem value="java">

```java
try {
    ditto.tryStartSync();
} catch(DittoError e) {
    Log.e("Ditto", e.getMessage())
}
```

</TabItem>
<TabItem value="csharp">

```csharp
try
{
    ditto.TryStartSync();
}
catch (DittoException ex)
{
    Console.WriteLine(exception.ToString());
}
```

</TabItem>
<TabItem value="cpp">

```cpp
try {
    ditto.try_start_sync();
} catch (const DittoError &err) {
    // handle exception  
} catch (const std::exception &e) {
    std::cerr << e.what();
}
```

</TabItem>
</Tabs>

## Syncing Data with Live Queries

Ditto will only sync data with other peers when it has an active `LiveQuery`. With Ditto, syncing a _pull_ mechanism. Your app will sync by subscribing to a query, this is what we call a `LiveQuery`. A `LiveQuery` is a long-running subscription to a constructed Ditto query. Use a query to specify what types of data to sync with other devices. [Learn more about how to create queries](./querying)

To create a `LiveQuery`, simply add `.observe` to a query cursor like so:

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
    .observe((cars, event) => {
        // do something
    })
```

</TabItem>
<TabItem value="swift">

```swift
// Register live query to update UI
let liveQuery = ditto.store.collection("cars").find("color == 'red'")
  .observe { cars, event in
    // do something
  }
```

</TabItem>
<TabItem value="objc">

```objc
// Register live query to update UI
DITLiveQuery *liveQuery = [[collection find:@"color == 'red'"]
    observe:^(NSArray<DITDocument *> *docs, DITLiveQueryEvent *event) {

    }
}];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// --- Register live query to update UI
this.liveQuery = ditto.store.collection("cars").
    .findAll()
    .observe { docs, event ->
        // Do something...
    }
```

</TabItem>
<TabItem value="java">

```java
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
// --- Register live query to update UI
var liveQuery = ditto.Store.Collection("cars").Find("color == 'red'").Observe((docs, DittoLiveQueryEvent) =>
{
    // Do something...
});
```

</TabItem>
<TabItem value="cpp">

```cpp
std::shared_ptr<LiveQuery> query = collection
  .find("color == 'red'")
  .observe(LiveQueryEventHandler{
    [&](std::vector<Document> docs, LiveQueryEvent event) {
      // do something
    }});
```

</TabItem>
</Tabs>


Here are some quick facts about the `LiveQuery` behavior.

* The `.observe` handler will always fire _immediately_ with the current set of documents matching the query.
* Subsequent local and remote calls to `.observe` will be fired with the new set of documents that match the query. 
* To stop the observe callback, either call `liveQuery.stop()` or deallocate the `liveQuery` object. Deallocation can by done simply by assigning it to `nil` or `null` depending on the language and platform.
* You can create as many `LiveQuery` objects as you want.
* Calling `.observe` on a query before calling `ditto.tryStartSync()`, will only fire changes for local updates.

## Live Queries without Syncing Data

There are many situations where your app needs to observe live queries _without_ initiating syncing with other devices. For example, this is useful if your app intends to treat certain documents and collections as local-only data. Instead of `.observe`, call `.observeLocal` like so:

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

Note: if your ditto instance has not called `tryStartSync`, there will be no difference between `.observe` and `.observeLocal`.