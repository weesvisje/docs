---
title: '5 - Editing Tasks'
---

Our final screen will be the `EditScreen`. The `EditScreen` will be in charge of 3 functions:

* Editing an existing `Task` 
* Creating a `Task` and inserting into the tasks collection
* Deleting an existing `Task`

## 5-1 Creating the `@Composable` `EditForm`

The `EditForm` is a simple layout that includes:

1. A constructor `canDelete: Boolean` which determines whether or not to show a delete `Button`
2. A `body: String` and `isCompleted: Boolean`
3. Respective callback parameters for changes in the `TextField` and save and delete `Button` (see steps 4, 5, 6)
4. An `TextField` which we use to edit the `Task.body`
5. A `Switch` which is used to edit the `Task.isCompleted`
6. A `Button` for saving a task.
7. A `Button` for deleting a task

We've also included a `@Preview` of the `EditForm`:

![EditFormPreview](./EditFormPreview.png)

```kotlin title="EditForm.kt"
@Composable
fun EditForm(
    // 1
    canDelete: Boolean,
    // 2
    body: String,
    // 3
    onBodyTextChange: ((body: String) -> Unit)? = null,
    // 2
    isComplete: Boolean = false,
    // 3
    onIsComplete: ((isCompleted: Boolean) -> Unit)? = null,
    // 3
    onSaveButtonClicked: (() -> Unit)? = null,
    // 3
    onDeleteButtonClicked: (() -> Unit)? = null,
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = "Body:")
        // 4
        TextField(
            value = body,
            onValueChange = { onBodyTextChange?.invoke(it) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            Arrangement.SpaceBetween
        ) {
            Text(text = "Is Complete:")
            // 5
            Switch(checked = isComplete, onCheckedChange = { onIsComplete?.invoke(it) })
        }
        // 6
        Button(
            onClick = {
                onSaveButtonClicked?.invoke()
            },
            modifier = Modifier
                .padding(bottom = 12.dp)
                .fillMaxWidth(),
        ) {
            Text(
                text = "Save",
                modifier = Modifier.padding(8.dp)
            )
        }
        if (canDelete) {
            // 7
            Button(
                onClick = {
                    onDeleteButtonClicked?.invoke()
                },
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = Color.Red,
                    contentColor = Color.White),
                modifier = Modifier
                    .fillMaxWidth(),
            ) {
                Text(
                    text = "Delete",
                    modifier = Modifier.padding(8.dp)
                )
            }
        }
    }
}

@Preview(
    showBackground = true,
    device = Devices.PIXEL_3
)
@Composable
fun EditFormPreview() {
    EditForm(canDelete = true, "Hello")
}
```

## 5-2 Creating the `EditScreenViewModel`

Like the `TasksListScreenViewModel`, the `EditScreenViewModel` is a ViewModel for the `EditScreen`. Create a file called __EditScreenViewModel.kt__.

1. This ViewModel will be given a `setupWithTask` function that takes in a `taskId: String?`. If the `taskId == null`, then the user is attempting to _create_ a `Task`. If the `taskId != null`, the user has supplied to the `EditScreen` a `taskId` to _edit_.
2. If `taskId != null`, we will fetch a task from Ditto, and assign it to `isCompleted: MutableLiveData<Boolean>` and `body: MutableLiveData<String>` and assign `canDelete: MutableLiveData<Boolean>` to `true`
3. We add a `save` functionality to either `.insert` or `.update` into Ditto depending if the `_id` is `null` or not.
4. We add another function, `delete`, to call `.remove`

```kotlin title="EditScreenViewModel.kt"
class EditScreenViewModel: ViewModel() {

    var _id: String? = null;

    // 2.
    var body = MutableLiveData<String>("")
    var isCompleted = MutableLiveData<Boolean>(false)
    var canDelete = MutableLiveData<Boolean>(false)

    // 1.
    fun setupWithTask(taskId: String?) {
        canDelete.value = taskId != null
        val taskId: String = taskId?.let { it } ?: return;
        val doc: DittoDocument = TasksApplication.ditto!!.store["tasks"]
            .findByID(DittoDocumentID(taskId))
            .exec()?.let { it } ?: return;
        val task = Task(doc)
        _id = task._id
        body.value = task.body
        isCompleted.value = task.isCompleted

    }
    
    // 3.
    fun save() {
        if (_id == null) {
            // insert
            TasksApplication.ditto!!.store["tasks"]
                .insert(mapOf(
                    "body" to body.value,
                    "isCompleted" to isCompleted.value
                ))
        } else {
            // update
            TasksApplication.ditto!!.store["tasks"].findByID(DittoDocumentID(_id!!))
                .update { mutableDoc ->
                    val mutableDoc = mutableDoc?.let { it } ?: return@update
                    mutableDoc["body"].set(body.value ?: "")
                    mutableDoc["isCompleted"].set(isCompleted.value ?: "")
                }
        }
    }
  
    // 4.
    fun delete() {
        TasksApplication.ditto!!.store["tasks"].findByID(DittoDocumentID(_id!!))
            .remove()
    }
}
```

## 5-3 Creating the `EditScreen`

Just like the `TasksListScreen` in the previous section, we will now create an `EditScreen.kt`.

1. Add a constructor that accepts a `navController` and a `task: String?`. See [the section on navigation](./navigation) to reference these values.
2. Create a reference to the `EditScreenViewModel`
3. Call `setupWithTask` with the `taskId` from the constructor. The `EditScreenViewModel` will now know if the user is attempting to edit or create a new task. 
4. To help the user show if they are attempting or edit or create, we will show a `TopAppBar` `Text` with an appropriate title.
5. We will call `observeAsState` on the `EditScreenViewModel`'s `MutableLiveData` properties and extract the value to feed into our views.
6. Create a Scaffold with a `TopAppBar` and `content { EditForm... }`
7. Like before, we will bind all the change handlers from the `EditForm` and the values back to the `viewModel`
8. Upon saving or deleting, we will tell the `navController` to `popBackStack`, which will cause the app to go back to the `TasksListScreen`

```kotlin title="EditScreen.kt"
@Composable
fun EditScreen(navController: NavController, taskId: String?) { // 1.
    // 2.
    val editScreenViewModel: EditScreenViewModel = viewModel();
    // 3.
    editScreenViewModel.setupWithTask(taskId = taskId)
    // 4.
    val topBarTitle = if (taskId == null) "New Task" else "Edit Task"
    
    // 5.
    val body: String by editScreenViewModel.body.observeAsState("")
    val isCompleted: Boolean by editScreenViewModel.isCompleted.observeAsState(initial = false)
    val canDelete: Boolean by editScreenViewModel.canDelete.observeAsState(initial = false)

    // 6.
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(topBarTitle) },
                backgroundColor = colorResource(id = R.color.purple_700)
            )
        },
        content = {
            // 7.
            EditForm(
                canDelete = canDelete,
                body = body,
                onBodyTextChange = { editScreenViewModel.body.value = it },
                isCompleted = isCompleted,
                onIsCompletedChanged = { editScreenViewModel.isCompleted.value = it },
                onSaveButtonClicked = {
                    editScreenViewModel.save()
                    // 8.
                    navController.popBackStack()
                },
                onDeleteButtonClicked = {
                    editScreenViewModel.delete()
                    // 8.
                    navController.popBackStack()
                }
            )
        }
    )
}
```