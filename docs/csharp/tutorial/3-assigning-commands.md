---
title: 'Assigning Commands'
---

## 3.1 Setting up the `while` loop.

Our application will continually ask for commands that we setup in the last section. For a console application, this is generally a `while` loop.

1. To determine whether or not the while loop should run, we need an addition `static bool isAskedToExit = false`. If the user turns this to `true` via the `--exit` command, the while loop will stop and the application will exit.
2. In each iteration of the while loop, we will need read the command from the user. In C#, we can use the `Console.ReadLine` API, which will prompt the user for a string entry. We can store this into `string command`.
3. We can add a `switch` statement which will parse the correct command and react to the command.
4. If the user types in `--insert`, we will parse out the string without the `--insert` command. We assume this string is the `body` for a new document. So we will call the `.upsert` command with ditto via:

```csharp
string taskBody = s.Replace("--insert ", "");
ditto.Store["tasks"].Upsert(new Task(taskBody, false).ToDictionary());
```

5. Check for a switch case for `--toggle`. We will parse out the string without `--toggle` and assume the user's input is a Task document's `_id`. We can then find the document by it's `_id` and call `.update`
6. Check for a switch case for `--delete`. We will parse out the string without `--delete` and assume the user's input is a Task document's `_id`. We can then find the document by it's `_id` and call `.update`
7. Finally we will add a command to look for `--list`, which will print out all the tasks that we've synced.


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
        static bool isAskedToExit = false;
        static List<Task> tasks = new List<Task>();
        static DittoLiveQuery liveQuery;


        public static void Main(params string[] args)
        {
            ditto = new Ditto(DittoIdentity.OnlinePlayground("REPLACE_ME_WITH_YOUR_APP_ID", "REPLACE_ME_WITH_YOUR_PLAYGROUND_TOKEN"), path);

            /**
            * Omitted for brevity
            */

            liveQuery = ditto.Store["tasks"].FindAll().Observe((docs, _event) => {
                tasks = docs.ConvertAll(d => new Task(d));
            });

            ListCommands();

            while (!isAskedToExit)
            {

                // 2.
                // highlight-start
                Console.Write("\nYour command: ");
                string command = Console.ReadLine();
                // highlight-end

                switch (command)
                {

                    // 3. 4.
                    // highlight-start
                    case string s when command.StartsWith("--insert"):
                        string taskBody = s.Replace("--insert ", "");
                        ditto.Store["tasks"].Upsert(new Task(taskBody, false).ToDictionary());
                        break;
                        // highlight-end
                    // 5.
                    // highlight-start
                    case string s when command.StartsWith("--toggle"):
                        string _idToToggle = s.Replace("--toggle ", "");
                        ditto.Store["tasks"]
                            .FindById(new DittoDocumentID(_idToToggle))
                            .Update((mutableDoc) => {
                                if (mutableDoc == null) return;
                                mutableDoc["isCompleted"].Set(!mutableDoc["isCompleted"].BooleanValue);
                            });
                        break;
                    // highlight-end
                    // 6.
                    // highlight-start
                    case string s when command.StartsWith("--delete"):
                        string _idToDelete = s.Replace("--delete ", "");
                        ditto.Store["tasks"]
                            .FindById(new DittoDocumentID(_idToDelete))
                            .Remove();
                        break;
                    case { } when command.StartsWith("--list"):
                        tasks.ForEach(task =>
                        {
                            Console.WriteLine(task.ToString());
                        });
                        break;
                    // highlight-end
                    // 1.
                    // highlight-start
                    case { } when command.StartsWith("--exit"):
                        Console.WriteLine("Good bye!");
                        isAskedToExit = true;
                        break;
                    // highlight-end
                    default:
                        Console.WriteLine("Unknown command");
                        ListCommands();
                        break;
                }
            }
        }
    }
}
```

## 3.2 Final application

Our application is complete! Our __Program.cs__ file should look like the following. Now you can run the example in your terminal, command line or right within the run command in Visual Studio.

```csharp title="Program.cs"
using System;
using DittoSDK;
using System.Collections.Generic;

namespace Tasks
{
    class Program
    {
        static Ditto ditto;
        static bool isAskedToExit = false;
        static List<Task> tasks = new List<Task>();
        static DittoLiveQuery liveQuery;


        public static void Main(params string[] args)
        {
            ditto = new Ditto(identity: DittoIdentity.Development(appName: "live.ditto.tasks"));

            try
            {
                ditto.SetLicenseToken("<REPlACE_ME>");
                ditto.TryStartSync();
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

            liveQuery = ditto.Store["tasks"].FindAll().Observe((docs, _event) => {
                tasks = docs.ConvertAll(d => new Task(d));
            });

            ListCommands();

            while (!isAskedToExit)
            {

                Console.Write("\nYour command: ");
                string command = Console.ReadLine();

                switch (command)
                {

                    case string s when command.StartsWith("--insert"):
                        string taskBody = s.Replace("--insert ", "");
                        ditto.Store["tasks"].Upsert(new Task(taskBody, false).ToDictionary());
                        break;
                    case string s when command.StartsWith("--toggle"):
                        string _idToToggle = s.Replace("--toggle ", "");
                        ditto.Store["tasks"]
                            .FindById(new DittoDocumentID(_idToToggle))
                            .Update((mutableDoc) => {
                                if (mutableDoc == null) return;
                                mutableDoc["isCompleted"].Set(!mutableDoc["isCompleted"].BooleanValue);
                            });
                        break;
                    case string s when command.StartsWith("--delete"):
                        string _idToDelete = s.Replace("--delete ", "");
                        ditto.Store["tasks"]
                            .FindById(new DittoDocumentID(_idToDelete))
                            .Remove();
                        break;
                    case { } when command.StartsWith("--list"):
                        tasks.ForEach(task =>
                        {
                            Console.WriteLine(task.ToString());
                        });
                        break;
                    case { } when command.StartsWith("--exit"):
                        Console.WriteLine("Good bye!");
                        isAskedToExit = true;
                        break;
                    default:
                        Console.WriteLine("Unknown command");
                        ListCommands();
                        break;
                }
            }
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
