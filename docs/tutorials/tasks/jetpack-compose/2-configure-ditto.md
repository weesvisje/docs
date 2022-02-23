---
title: '2 - Configure Ditto'
---

## 2-1 Create Your Ditto App

Before we start coding, we first need to create a new app in the [portal](https://portal.ditto.live). Apps created on the portal will automatically sync data between them and also to the Ditto cloud.

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
        val identity = DittoIdentity.OnlinePlayground(appID = "REPLACE_ME", dependencies = androidDependencies);
        ditto = Ditto(androidDependencies, identity)
    }

}
```

Now you will be able to access this Ditto anywhere in your application like so:

```kotlin
val docs = TasksApplication.ditto!!.store["tasks].findAll().exec()
```

## 2-3 Add Permissions and Register Class

In order for Ditto to sync, we will need to add permissions to the __AndroidManifest.xml__ file. [For more information about these permissions, click here](/advanced/platform-permissions/android-platform-permissions). In addition we will need to register our custom `TasksApplication` as the main Application class in the `<application>` tag.

```diff title="AndroidManifest.xml" {5-15,18}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="live.ditto.compose.tasks">

+    <uses-permission android:name="android.permission.BLUETOOTH"
+        android:maxSdkVersion="30" />
+    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
+        android:maxSdkVersion="30" />
+    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"
+        android:usesPermissionFlags="neverForLocation" />
+    <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
+    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
+    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"
+        android:maxSdkVersion="30" />
+    <uses-permission android:name="android.permission.INTERNET" />
+    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
+    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
+    <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
+    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
+    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
+    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
+    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />


    <application
+       android:name=".TasksApplication"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        ... more
        />

```

## 2-4 Start Ditto Sync

When Android studio created the project, it should have created a file called __MainActivity.kt__. In this file, we will take the singleton `TasksApplication.ditto!!` and begin to start the sync process with `tryStartSync()`

The app will show a `Toast` error if `tryStartSync` encounters a mistake. Don't worry if an error occurs or if you omit this step, Ditto will continue to work as a local database. However, it's advised that you fix the errors to see the app sync across multiple devices.

```kotlin title="MainActivity" {5-18}
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)

      val ditto = TasksApplication.ditto
      try {
          ditto!!.tryStartSync()
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
}
```


## 2-5 Create a Task data class

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
  .ditto!!.store["tasks]
  .findAll()
  .exec().map { it -> Task(it) }
```

Once we set up our user interface, you'll notice that reading these values becomes a bit easier with this added structure.
