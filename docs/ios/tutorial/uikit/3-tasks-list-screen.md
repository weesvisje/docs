---
title: "3 - Showing the List of Tasks"
---

Almost done! We have our UI in place and Ditto installed, so let's add the logic to create and display tasks by using Ditto's APIs.


## 3-1 Create Your Ditto App on the Portal

Before we start coding, we first need to create a new app in the [portal](https://portal.ditto.live). Apps created on the portal will automatically sync data between them and also to the Ditto Big Peer.

Each app created on the portal has a unique `appID` which can be seen on your app's settings page once the app has been created. This ID is used in subsequent sections to configure your Ditto instance.


## 3-2 Setup TasksTableViewController

First, we need to add some variables that will be created on `viewDidLoad` of the `TasksTableViewController` so adjust the class to match this code:

```swift
// Remember to import DittoSwift!
import DittoSwift

class TaskTableViewController: UITableViewController {
    // These hold references to Ditto for easy access
    var ditto: Ditto!
    var store: DittoStore!
    var liveQuery: DittoLiveQuery?
    var subscription: DittoSubscription?
    var collection: DittoCollection!

    // This is the UITableView data source
    var tasks: [DittoDocument] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Create an instance of Ditto
        ditto = Ditto(identity: .onlinePlayground(appID: "YOUR_APP_ID_HERE", token: "YOUR_TOKEN_HERE"))

        // This starts Ditto's background synchronization
        ditto.startSync()

        // Create some helper variables for easy access
        store = ditto.store
        // We will store data in the "tasks" collection
        // Ditto stores data as collections of documents
        collection = store.collection("tasks")

        // Subscribe to changes with a live-query 
        subscription = collection.find("!isDeleted").subscribe()

        // This function will create a "live-query" that will update
        // our UITableView
        setupTaskList()
    }

    func setupTaskList() {
        // Query for all tasks
        // Observe changes and update the UITableView when anything changes
        liveQuery = collection.find("!isDeleted").observeLocal { [weak self] docs, event in
            guard let `self` = self else { return }
            switch event {
            case .update(let changes):
                guard changes.insertions.count > 0 || changes.deletions.count > 0 || changes.updates.count > 0  || changes.moves.count > 0 else { return }
                DispatchQueue.main.async {
                    self.tableView.beginUpdates()
                    self.tableView.performBatchUpdates({
                        let deletionIndexPaths = changes.deletions.map { idx -> IndexPath in
                            return IndexPath(row: idx, section: 0)
                        }
                        self.tableView.deleteRows(at: deletionIndexPaths, with: .automatic)
                        let insertionIndexPaths = changes.insertions.map { idx -> IndexPath in
                            return IndexPath(row: idx, section: 0)
                        }
                        self.tableView.insertRows(at: insertionIndexPaths, with: .automatic)
                        let updateIndexPaths = changes.updates.map { idx -> IndexPath in
                            return IndexPath(row: idx, section: 0)
                        }
                        self.tableView.reloadRows(at: updateIndexPaths, with: .automatic)
                        for move in changes.moves {
                            let from = IndexPath(row: move.from, section: 0)
                            let to = IndexPath(row: move.to, section: 0)
                            self.tableView.moveRow(at: from, to: to)
                        }
                    }) { _ in }
                    // Set the tasks array backing the UITableView to the new documents
                    self.tasks = docs
                    self.tableView.endUpdates()
                }
            case .initial:
                // Set the tasks array backing the UITableView to the new documents
                self.tasks = docs
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            default: break
            }
        }
    }

// remaining TaskTableViewController code...

}
```

Let's breakdown what this code does. First, we create the variables needed and then initialize them in `viewDidLoad()` . To enable background synchronization, we need to call `startSync()` which allows you to control when synchronization occurs. For this application we want it to run the entire time the app is in use.

```swift
// These hold references to Ditto for easy access
var ditto: Ditto!
var store: DittoStore!
var liveQuery: DittoLiveQuery?
var collection: DittoCollection!
var subscription: DittoSubscription?

// This is the UITableView data source
var tasks: [DittoDocument] = []

override func viewDidLoad() {
    super.viewDidLoad()

    // Create an instance of Ditto
    ditto = Ditto(identity: .onlinePlayground(appID: "YOUR_APP_ID_HERE", token: "YOUR_TOKEN_HERE"))

    // This starts Ditto's background synchronization
    ditto.startSync()

    // Create some helper variables for easy access
    store = ditto.store
    // We will store data in the "tasks" collection
    // Ditto stores data as collections of documents
    collection = store.collection("tasks")

    // Subscribe to changes with a live-query 
    subscription = collection.find("!isDeleted").subscribe()


    // This function will create a "live-query" that will update
    // our UITableView
    setupTaskList()
}
```

After setting up the variables and starting Ditto, we then use Ditto's key API to observe changes to the database by creating a live-query in the `setupTaskList()` function. This allows us to set the initial state of the `UITableView` after the query is immediately run and then subsequently get callbacks for any new data changes that occur locally or that were synced from other devices:

Note, that we are using the `observe` API in Ditto. This API performs two functions. First, it sets up a local observer for data changes in the database that match the query and second it creates a subscription for the same query that will be used to request this data from other devices. For simplicity, we are using this combined API, but you can also call them independently. To learn more, see the [Observing Changes](../common/concepts/syncing-data) section in the documentation.

```swift
func setupTaskList() {
    liveQuery = collection.find("!isDeleted").observeLocal { [weak self] docs, event in
        guard let `self` = self else { return }
        switch event {
        case .update(let changes):
            guard changes.insertions.count > 0 || changes.deletions.count > 0 || changes.updates.count > 0  || changes.moves.count > 0 else { return }
            DispatchQueue.main.async {
                self.tableView.beginUpdates()
                self.tableView.performBatchUpdates({
                    let deletionIndexPaths = changes.deletions.map { idx -> IndexPath in
                        return IndexPath(row: idx, section: 0)
                    }
                    self.tableView.deleteRows(at: deletionIndexPaths, with: .automatic)
                    let insertionIndexPaths = changes.insertions.map { idx -> IndexPath in
                        return IndexPath(row: idx, section: 0)
                    }
                    self.tableView.insertRows(at: insertionIndexPaths, with: .automatic)
                    let updateIndexPaths = changes.updates.map { idx -> IndexPath in
                        return IndexPath(row: idx, section: 0)
                    }
                    self.tableView.reloadRows(at: updateIndexPaths, with: .automatic)
                    for move in changes.moves {
                        let from = IndexPath(row: move.from, section: 0)
                        let to = IndexPath(row: move.to, section: 0)
                        self.tableView.moveRow(at: from, to: to)
                    }
                }) { _ in }
                // Set the tasks array backing the UITableView to the new documents
                self.tasks = docs
                self.tableView.endUpdates()
            }
        case .initial:
            // Set the tasks array backing the UITableView to the new documents
            self.tasks = docs
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        default: break
        }
    }
    
    collection.find("isDeleted == true").evict()
}
```

This is a best-practice when using Ditto, since it allows your UI to simply react to data changes which can come at any time given the ad-hoc nature of how Ditto synchronizes with nearby devices. With this in place, we can now add user actions and configure the `UITableview` to display the tasks.

## 3-3 Add A Task

To allow the user to create a task we want to display an alert view in response to clicking the add bar item. Add the following code to the `didClickAddTask()` function we added earlier:
code-tabs

```swift
@IBAction func didClickAddTask(_ sender: UIBarButtonItem) {
    // Create an alert
    let alert = UIAlertController(
        title: "Add New Task",
        message: nil,
        preferredStyle: .alert)

    // Add a text field to the alert for the new task text
    alert.addTextField(configurationHandler: nil)

    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))

    // Add a "OK" button to the alert.
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { [weak self] (_) in
        guard let self = self else { return }
        if let body = alert.textFields?[0].text
        {
            // Insert the data into Ditto
            _ = try! self.collection.upsert([
                "body": body,
                "isCompleted": false
            ])
        }
    }))

    // Present the alert to the user
    present(alert, animated: true, completion: nil)
}
```

Take note that this logic is using the Ditto `insert()` API to create a task document. Ditto's API is designed around JSON-compatible documents which are organized into collections:
code-tabs

```swift
_ = try! self.collection.upsert([
    "body": body,
    "isCompleted": false
])
```

## 3-4 Configure UITableView To Display Task List

To ensure the UITableView can display the tasks, we need to configure it. Adjust
your `TasksTableViewController` to include the following code (these functions
were already created when the file was generated by Xcode):
code-tabs

```swift
// MARK: - Table view data source

override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}

override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return tasks.count
}


override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "taskCell", for: indexPath)

    // Configure the cell...
    let task = tasks[indexPath.row]
    cell.textLabel?.text = task["body"].stringValue
    let taskComplete = task["isCompleted"].boolValue
    if taskComplete {
        cell.accessoryType = .checkmark
    }
    else {
        cell.accessoryType = .none
    }

    return cell
}
```

Earlier, we created the `tasks` array which is the data source to the `UITableView`. This code configures the `UITableView` to use this array and then configures the table view cell to display the task text and a checkmark on whether it is complete or not.
