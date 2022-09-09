---
title: "3 - Showing the List of Tasks"
---

In the last part of the tutorial we setup the user interface using the Xcode interfaace builder and created a custom class TasksTableViewController

## 3-1 Setup TasksTableViewController class

First, we need to add some variables that will be created on `viewDidLoad` of the `TasksTableViewController` so adjust the class to match this code:

```csharp title="TasksTableViewController.cs"
using System;
using UIKit;
// Remember to import Ditto
using DittoSDK;
using System.Collections.Generic;

namespace Tasks
{
    public partial class TasksTableViewController : UITableViewController
    {
        // These hold references to Ditto for easy access
        private DittoLiveQuery liveQuery;
        private Ditto ditto
        {
            get
            {
                var appDelegate = (AppDelegate)UIApplication.SharedApplication.Delegate;
                return appDelegate.ditto;
            }
        }
        private DittoCollection collection
        {
            get
            {
                return this.ditto.Store.Collection("tasks");
            }
        }

        // List that will contain all the tasks
        List<Task> tasks = new List<Task>();

        // data source for the TasksTableViewController
        private TasksTableSource tasksTableSource = new TasksTableSource();

        public TasksTableViewController(IntPtr handle) : base(handle)
        {
        }

        public override void ViewWillAppear(bool animated)
        {
            base.ViewWillAppear(animated);

            TableView.Source = tasksTableSource;
        }

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();
            setupTaskList();
        }

        // Sets up Live Query for syncing
        public void setupTaskList()
        {
            liveQuery = ditto.Store["tasks"].Find("!isDeleted").Observe((docs, _event) =>
            {
                tasks = docs.ConvertAll(d => new Task(d));
                tasksTableSource.updateTasks(tasks);

                InvokeOnMainThread(() =>
                {
                    TableView.ReloadData();
                });

            });
        }

        // Creates a new task
        partial void didClickAddTask(UIBarButtonItem sender)
        {
            // Create an alert
            var alertControl = UIAlertController.Create(
                title: "Add New Task",
                message: null,
                preferredStyle: UIAlertControllerStyle.Alert);

            // Add a text field to the alert for the new task text
            alertControl.AddTextField(configurationHandler: (UITextField obj) => obj.Placeholder = "Enter Task");

            alertControl.AddAction(UIAlertAction.Create(title: "Cancel", style: UIAlertActionStyle.Cancel, handler: null));

            // Add a "OK" button to the alert.
            alertControl.AddAction(UIAlertAction.Create(title: "OK", style: UIAlertActionStyle.Default, alarm => addTask(alertControl.TextFields[0].Text)));

            // Present the alert to the user
            PresentViewController(alertControl, animated: true, null);
        }

        public void addTask(string text)
        {
            var dict = new Dictionary<string, object>
            {
                {"body", text},
                {"isCompleted", false}
            };

            var docId = this.collection.Upsert(dict);
        }
    }
}
```

Let's break down what this code does. First, we create the variables needed and then initialize them in `ViewWillAppear()`.

```csharp
// These hold references to Ditto for easy access
private DittoLiveQuery liveQuery;
private Ditto ditto
{
    get
    {
        var appDelegate = (AppDelegate)UIApplication.SharedApplication.Delegate;
        return appDelegate.ditto;
    }
}
private DittoCollection collection
{
    get
    {
        return this.ditto.Store.Collection("tasks");
    }
}

// List that will contain all the tasks
List<Task> tasks = new List<Task>();

// data source for the TasksTableViewController
private TasksTableSource tasksTableSource = new TasksTableSource();

public TasksTableViewController(IntPtr handle) : base(handle)
{
}

public override void ViewWillAppear(bool animated)
{
    base.ViewWillAppear(animated);

    TableView.Source = tasksTableSource;
}
```

After setting up the variables and starting Ditto, we then use Ditto's key API to observe changes to the database by creating a live-query in the `setupTaskList()` function. This allows us to set the initial state of the UITableView after the query is immediately run and then subsequently get callbacks for any new data changes that occur locally or that were synced from other devices:

Note, that we are using the `observe` API in Ditto. This API performs two functions. First, it sets up a local observer for data changes in the database that match the query and second it creates a subscription for the same query that will be used to request this data from other devices. For simplicity, we are using this combined API, but you can also call them independently.

```csharp
public override void ViewDidLoad()
{
    base.ViewDidLoad();
    setupTaskList();
}

// Sets up Live Query for syncing
public void setupTaskList()
{
    liveQuery = ditto.Store["tasks"].Find("!isDeleted").Observe((docs, _event) =>
    {
        tasks = docs.ConvertAll(d => new Task(d));

        // We will implement this later
        tasksTableSource.updateTasks(tasks);

        InvokeOnMainThread(() =>
        {
            TableView.ReloadData();
        });

    });
}
```

This is a best-practice when using Ditto, since it allows your UI to simply react to data changes which can come at any time given the ad-hoc nature of how Ditto synchronizes with nearby devices. With this in place, we can now add user actions and configure the UITableview to display the tasks.

Look in the `TasksTableViewController.design.cs` file and you should see `[Action ("didClickAddTask:")]` `partial void didClickAddTask (UIKit.UIBarButtonItem sender);`. This is the button we created earlier in Xcode.
Now we need to add an action to it.

```csharp
// Triggered when add button is pressed
partial void didClickAddTask(UIBarButtonItem sender)
{
    // Create an alert
    var alertControl = UIAlertController.Create(
        title: "Add New Task",
        message: null,
        preferredStyle: UIAlertControllerStyle.Alert);

    // Add a text field to the alert for the new task text
    alertControl.AddTextField(configurationHandler: (UITextField obj) => obj.Placeholder = "Enter Task");

    alertControl.AddAction(UIAlertAction.Create(title: "Cancel", style: UIAlertActionStyle.Cancel, handler: null));

    // Add an "OK" button to the alert.
    alertControl.AddAction(UIAlertAction.Create(title: "OK", style: UIAlertActionStyle.Default, alarm => addTask(alertControl.TextFields[0].Text)));

    // Present the alert to the user
    PresentViewController(alertControl, animated: true, null);
}

public void addTask(string text)
{

    var dict = new Dictionary<string, object>
    {
        {"body", text},
        {"isCompleted", false},
        {"isDeleted", false}
    };

    // Adds the new task to the ditto collection
    var docId = this.collection.Upsert(dict);
}
```

When we `Upsert` the new task into the ditto collection then the live query that is observing the collection will be triggered.
