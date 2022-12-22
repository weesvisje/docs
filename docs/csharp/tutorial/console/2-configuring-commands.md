---
title: "2 - Configuring Commands"
---

Unlike many UI applications, Console or Command Line applications have limitations to user interactions. For example, console applications typically read text commands during a `while` loop as a standard design pattern. This section will outline the command line design and set up the loop to allow the user to give continual commands.

## 2.1 Designing the Commands

Our Tasks Console app will have five commands that map to Ditto and general console commands. We will need:

1. `--insert` to allow the user to `.insert` a new document into the `ditto.collection('tasks")` collection
2. `--toggle` to allow the user to `.update` a new document's `bool isCompleted` property by its `_id`
3. `--delete` to allow the user to `.remove` a new document by its `_id`
4. `--list` will print every current Task that we have in the collection. In addition, we will always call this method before every item.
5. `--exit` will quit the console app.

As a best practice, long-running console applications should continuously print the primary set of commands as long as they are succinct. We'll create a utility method called `ListCommands()` which, will `Console.WriteLine` each of the commands.

```csharp title="Program.cs"
using System;
using DittoSDK;
using System.Collections.Generic;

namespace Tasks
{
    class Program
    {

      public static void Main(params string[] args)
      {
        ditto = new Ditto(DittoIdentity.OnlinePlayground("REPLACE_ME_WITH_YOUR_APP_ID", "REPLACE_ME_WITH_YOUR_PLAYGROUND_TOKEN"), path);

        // ... omitted for brevity
        // see `setup`
      }

      public static void ListCommands()
      {
          Console.WriteLine("************* Commands *************");
          Console.WriteLine("--insert my new task");
          Console.WriteLine("   Inserts a task");
          Console.WriteLine("   Example: \"--insert Get Milk\"");
          Console.WriteLine("--toggle myTaskTd");
          Console.WriteLine("   Toggles the isComplete property to the opposite value");
          Console.WriteLine("   Example: \"--toggle 1234abc\"");
          Console.WriteLine("--delete myTaskTd");
          Console.WriteLine("   Deletes a task");
          Console.WriteLine("   Example: \"--delete 1234abc\"");
          Console.WriteLine("--list");
          Console.WriteLine("   List the current tasks");
          Console.WriteLine("--exit");
          Console.WriteLine("   Exits the program");
          Console.WriteLine("************* Commands *************");
      }
    }
}
```

## 2.2 Observing the Tasks with a Live Query

As we insert, update, and delete our tasks, we will update the Tasks collection. To sync changes coming from other devices, we will need create a Live Query by calling `.Observe`. Remember Ditto will only sync with devices by calling `.Observe` on queries. The `.Observe` method will return a `DittoLiveQuery` object. As long as the `DittoLiveQuery` object stays in scope and is not garbage collected, the Live Query will fire for any changes to the `tasks` collection. Remember, the `.Observe` callback will fire for both _local changes_ and _remote changes_.

```csharp
DittoLiveQuery liveQuery = ditto.Store["tasks"].Find("!isDeleted").ObserveLocal((docs, _event) => {
  // this will fire for all changes syncronized to the store.
});
```

In the context of our console application, we need to:

1. Store a `List<Task>` as a `static` variable so that we can print it upon command
2. `.Observe` all the document in the tasks collection. Take care to store the `DittoLiveQuery` as a `static` variable as well.
3. In the `.Observe` callback, convert all the `List<DittoDocument> docs` into `List<Task>` and assign them to both variables detailed in step 1 and 2.

```csharp title="Program.cs"
using System;
using DittoSDK;
using System.Collections.Generic;

namespace Tasks
{
    class Program
    {
        static Ditto ditto;

        // 1.
        // highlight-next-line
        static List<Task> tasks = new List<Task>();
        // 2.
        // highlight-next-line
        static DittoLiveQuery liveQuery;
        static DittoSubscription subscription;


        public static void Main(params string[] args)
        {
            ditto = new Ditto(DittoIdentity.OnlinePlayground("REPLACE_ME_WITH_YOUR_APP_ID", "REPLACE_ME_WITH_YOUR_PLAYGROUND_TOKEN"), path);

            try
            {
                ditto.SetOfflineOnlyLicenseToken("<REPlACE_ME>");
                ditto.StartSync();
            }
            catch (DittoException ex)
            {
                Console.WriteLine("There was an error starting Ditto.");
                Console.WriteLine("Here's the following error");
                Console.WriteLine(ex.ToString());
                Console.WriteLine("Ditto cannot start sync but don't worry.");
                Console.WriteLine("Ditto will still work as a local database.");
            }

            Console.WriteLine("Welcome to Ditto's Task App");

            // 3.
            // highlight-start
            subscription = ditto.Store["tasks"].Find("!isDeleted").Subscribe()
            liveQuery = ditto.Store["tasks"].Find("!isDeleted").ObserveLocal((docs, _event) => {
                tasks = docs.ConvertAll(document => new Task(document));
            });
            // highlight-end
        }

        public static void ListCommands() {
          // omitted for brevity
        }
    }
}

```

We have all the basic building blocks for syncing tasks to a locally stored `List<Task>` variable. In the following section, we will go over how to map the user commands to actual Ditto live query, insert, update and delete methods.
