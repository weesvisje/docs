---
title: "4 - Editing Tasks"
---

Now, we will implement the `TasksTableSource` class we called earlier.

## 4-1 Creating the `TaskTableSource` class

1. Open File->New File-> Empty Class (C#) and name it `TaskTableSource`
2. Import UIKit with `using UIKit`
3. This class will implement UITableViewSource.

```csharp title="TaskTableSource.cs"
using System;
using Foundation;
using UIKit;

namespace Tasks
{
    public class TaskTableSource : UITableViewSource
    {
        public TaskTableSource()
        {
        }

        public override UITableViewCell GetCell(UITableView tableView, NSIndexPath indexPath)
        {
            throw new NotImplementedException();
        }

        public override nint RowsInSection(UITableView tableview, nint section)
        {
            throw new NotImplementedException();
        }
    }
}
```

Now we need to get our instance of Ditto and setup the other class variables we will be using.

```csharp title="TaskTableSource.cs"
public class TaskTableSource : UITableViewSource
{
    Task[] tasks;
    NSString cellIdentifier = new NSString("taskCell");

    private DittoCollection collection
    {
        get
        {
            return this.ditto.Store.Collection("tasks");
        }
    }

    private Ditto ditto
    {
        get
        {
            var appDelegate = (AppDelegate)UIApplication.SharedApplication.Delegate;
            return appDelegate.ditto;
        }
    }
    public TaskTableSource()
    {
    }

    public override UITableViewCell GetCell(UITableView tableView, NSIndexPath indexPath)
    {
        throw new NotImplementedException();
    }

    public override nint RowsInSection(UITableView tableview, nint section)
    {
        throw new NotImplementedException();
    }
}
```

Next thing we will implement is the `UITableViewSource` inherited methods `GetCell` and `RowsInSection`.

RowsInSection:

1. Check whether the tasks array is empty. If its not empty then return the number of tasks in the tasks array.

```csharp
public override nint RowsInSection(UITableView tableview, nint section)
{
    if (this.tasks == null)
    {
        return 0;
    }
    return tasks.Length;
}
```

GetCell:

1. Get the cell using the cell identifier
2. Within our cell we want a text label and a cell accessory that will be used to check whether the task has been completed or not. We will assign the name of the task to the TextLabel.Text.
3. Setup a tap gesture that will update whether the task has been completed or not. When tapped, we will update the task document inside the Ditto Collection and update the `isCompleted` key.

```csharp
public override UITableViewCell GetCell(UITableView tableView, NSIndexPath indexPath)
{
    // 1
    UITableViewCell cell = tableView.DequeueReusableCell(cellIdentifier);
    if (cell == null)
    {
        cell = new UITableViewCell(UITableViewCellStyle.Default, cellIdentifier);
    }

    Task task = tasks[indexPath.Row];

    // 2
    cell.TextLabel.Text = task.body;
    var taskComplete = task.isCompleted;

    //Checks whether the tasks has been completed or not
    if (taskComplete)
    {
        cell.Accessory = UITableViewCellAccessory.Checkmark;
    }
    else
    {
        cell.Accessory = UITableViewCellAccessory.None;
    }

    // 3
    var tapGesture = new UITapGestureRecognizer();
    tapGesture.AddTarget(() =>
    {
        if (taskComplete)
        {
            collection.FindById(task._id).Update(mutableDoc =>
                mutableDoc["isCompleted"].Set(false)
            );
        }
        else
        {
            collection.FindById(task._id).Update(mutableDoc =>
                mutableDoc["isCompleted"].Set(true)
            );
        }
    });
    cell.AddGestureRecognizer(tapGesture);

    return cell;
}
```

The next thing to add to our `TasksTableSource` is the `updateTasks` method we called earlier.
This method will take a list of Tasks and then assign it to our Tasks array that is used for displaying the tasks.

```csharp
public void updateTasks(List<Task> tasks)
{
    this.tasks = tasks.ToArray();
}
```

The last thing that we need to do is to add a way to delete any tasks that we no longer want.
To do so, we will override the `CommitEditingStyle` method. This method has a default delete value and so we just need to tell the app what to do when the delete is called. In this case, we want to remove the task document from the Ditto Collection. When we remove that documents the live query we setup earlier will be called and will refresh the UI with the removed task.

```csharp
public override void CommitEditingStyle(UITableView tableView, UITableViewCellEditingStyle editingStyle, Foundation.NSIndexPath indexPath)
{
    switch (editingStyle)
    {
        case UITableViewCellEditingStyle.Delete:

            var task = tasks[indexPath.Row];
            collection.FindById(task._id).Update((mutableDoc) => {
                if (mutableDoc == null) return;
                mutableDoc["isDeleted"].Set(true);
            });

            break;
        case UITableViewCellEditingStyle.None:
            Console.WriteLine("CommitEditingStyle:None called");
            break;
    }
}
```

## 4-4 Final Application

Our application is complete! Our TasksTableSource.cs file should look like the following.

```csharp title="TasksTableSource.cs"
using System;
using System.Collections.Generic;
using Foundation;
using UIKit;
using DittoSDK;

namespace Tasks
{
    public class TasksTableSource : UITableViewSource
    {
        Task[] tasks;
        NSString cellIdentifier = new NSString("taskCell");

        private DittoCollection collection
        {
            get
            {
                return this.ditto.Store.Collection("tasks");
            }
        }

        private Ditto ditto
        {
            get
            {
                var appDelegate = (AppDelegate)UIApplication.SharedApplication.Delegate;
                return appDelegate.ditto;
            }
        }

        public TasksTableSource(Task[] taskList)
        {
            this.tasks = taskList;
        }

        public TasksTableSource()
        {
        }

        public override UITableViewCell GetCell(UITableView tableView, NSIndexPath indexPath)
        {
            UITableViewCell cell = tableView.DequeueReusableCell(cellIdentifier);
            if (cell == null)
            {
                cell = new UITableViewCell(UITableViewCellStyle.Default, cellIdentifier);
            }

            Task task = tasks[indexPath.Row];

            cell.TextLabel.Text = task.body;
            var taskComplete = task.isCompleted;
            if (taskComplete)
            {
                cell.Accessory = UITableViewCellAccessory.Checkmark;
            }
            else
            {
                cell.Accessory = UITableViewCellAccessory.None;

            }

            var tapGesture = new UITapGestureRecognizer();
            tapGesture.AddTarget(() =>
            {
                if (taskComplete)
                {
                    collection.FindById(task._id).Update(mutableDoc =>
                        mutableDoc["isCompleted"].Set(false)
                    );
                }
                else
                {
                    collection.FindById(task._id).Update(mutableDoc =>
                        mutableDoc["isCompleted"].Set(true)
                    );
                }
            });
            cell.AddGestureRecognizer(tapGesture);

            return cell;

        }

        public override nint RowsInSection(UITableView tableview, nint section)
        {
            if (this.tasks == null)
            {
                return 0;
            }
            return tasks.Length;
        }

        public void updateTasks(List<Task> tasks)
        {
            this.tasks = tasks.ToArray();
        }

        public override void CommitEditingStyle(UITableView tableView, UITableViewCellEditingStyle editingStyle, Foundation.NSIndexPath indexPath)
        {
            switch (editingStyle)
            {
                case UITableViewCellEditingStyle.Delete:

                    var task = tasks[indexPath.Row];
                    collection.FindById(task._id).Update((mutableDoc) => {
                        if (mutableDoc == null) return;
                        mutableDoc["isDeleted"].Set(true);
                    });

                    break;
                case UITableViewCellEditingStyle.None:
                    Console.WriteLine("CommitEditingStyle:None called");
                    break;
            }
        }
    }
}

```

Congratulations you are now complete with the Ditto Xamarin.iOS task app!
