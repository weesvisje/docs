---
title: '2 - Configure Ditto'
---

## 2-1 Create Your Ditto App

Before we start coding, we first need to create a new app in the [portal](https://portal.ditto.live). Apps created on the portal will automatically sync data between them and also to the Ditto Big Peer.

Each app created on the portal has a unique `appID` which can be seen on your app's settings page once the app has been created. This ID is used in subsequent sections to configure your Ditto instance.

## 2-2 Create Application Class

Typically, applications with Ditto will need to run Ditto as a singleton. To construct Ditto it'll need access to a live Android `Context`. Since the Application class is a singleton and has the necessary `Context`, we can create a subclass called __TasksApplication.kt__

1. Add a `companion object` and declare `var ditto: Ditto? = null`. This will create a static variable that we can always access throughout our entire application.
2. In the `override fun onCreate()`, construct ditto with `DefaultAndroidDittoDependencies` see below.


```kotlin title="TasksApplication.kt"
import android.app.Application
import live.ditto.Ditto
import live.ditto.DittoIdentity
import live.ditto.android.DefaultAndroidDittoDependencies


class TasksApplication: Application() {

    companion object {
        var ditto: Ditto? = null;
    }

    override fun onCreate() {
        super.onCreate()
        // construct a DefaultAndroidDittoDependencies object with the applicationContext
        val androidDependencies = DefaultAndroidDittoDependencies(applicationContext)
        // for this example we will use a Development identity
        val identity = DittoIdentity.OnlinePlayground(
            appID = "REPLACE_ME", 
            dependencies = androidDependencies, 
            token = "REPLACE_ME")
        ditto = Ditto(androidDependencies, identity)
    }

}
```

Now you will be able to access this Ditto anywhere in your application like so:

```kotlin
val docs = TasksApplication.ditto!!.store["tasks].findAll().exec()
```

## 2-3 Start Ditto Sync

When Android studio created the project, it should have created a file called __MainActivity.kt__. In this file, we will take the singleton `TasksApplication.ditto!!` and begin to start the sync process with `startSync()`

The app will show a `Toast` error if `startSync` encounters a mistake. Don't worry if an error occurs or if you omit this step, Ditto will continue to work as a local database. However, it's advised that you fix the errors to see the app sync across multiple devices.

```kotlin title="MainActivity" {5-18}
class MainActivity : ComponentActivity() {

    val ditto = TasksApplication.ditto

    override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)

      try {
          ditto!!.startSync()
      } catch (e: DittoError) {
          // 2.
          Toast.makeText(
              this@MainActivity,
              """
                  Uh oh! There was an error trying to start Ditto's sync feature.
                  That's okay, it will still work as a local database.
                  This is the error: ${e.localizedMessage}
              """.trimIndent(), Toast.LENGTH_LONG
          ).show()
      }

      setContent {
          // ...
      }
    }

    fun checkPermissions() {
        val missing = DittoSyncPermissions(this).missingPermissions()
        if (missing.isNotEmpty()) {
            this.requestPermissions(missing, 0)
        }
    }

    override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        // Regardless of the outcome, tell Ditto that permissions maybe changed
        ditto?.refreshPermissions()
    }
}
```


## 2-4 Create a Task data class

Ditto is a document database, which represents all of its rows in the database a JSON-like structure. In this tutorial, we will define each task like so:

```jsonc
{
  "_id": "123abc",
  "body": "Get Milk",
  "isCompleted": true
}
```

These Task documents will all be in the "tasks" collection. We will be referencing this collection throughout this tutorial with:

```kotlin
val tasksCollection = TasksApplication.ditto!!.store["tasks"]
```

Ditto documents have a flexible structure. Oftentimes, in strongly-typed languages like Kotlin, we will create a data structure give more definition to the app.

Create a new Kotlin file called __Task.kt__ in your project.

```kotlin title="Task.kt"
data class Task(
    val _id: String = UUID.randomUUID().toString(),
    val body: String,
    val isCompleted: Boolean
) {
    constructor(document: DittoDocument) : this(
        document["_id"].stringValue,
        document["body"].stringValue,
        document["isCompleted"].booleanValue
    ) {

    }
}
```

This data class takes a `DittoDocument` and safely parses out the values into native Kotlin types. We also added an additional constructor that allows for us to preview data without requiring DItto.

So now in our application if we want a `List<Task>` we write the following code:

```kotlin
val tasks: List<Task> = TasksApplication
  .ditto!!.store["tasks"]
  .find("!isDeleted")
  .exec().map { it -> Task(it) }
```

Once we set up our user interface, you'll notice that reading these values becomes a bit easier with this added structure.
