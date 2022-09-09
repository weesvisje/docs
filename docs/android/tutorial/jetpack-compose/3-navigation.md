---
title: 3 - Navigation
---

## 3-1 Creating a Root Navigation

This application will have two _Screens_ which are just Jetpack Compose views.

1. `TasksListScreen.kt` - A list where we can show the tasks.
2. `EditScreen.kt` - Where we can edit, create, and delete the Task

Create a file called __Root.kt__ file and add a Navigation Controller and a `NavHost` to the Root of our application.

You'll notice references to `TasksListScreen` and `EditScreen`, don't worry we will add them there.

The `Root` of our application hosts a `navController` which we use to switch between each Screen. There are __3__ routes:

1. `tasks` which will bring you the `TasksListScreen`
2. `tasks/edit` which will bring you the `EditScreen` but will be for __creating__ tasks. Notice that we will give a `null` to the `taskId`. This same screen will be in a "create" mode if the `taskId` is `null`
2. `tasks/edit/{taskId}` which will bring you the `EditScreen` but will be for __editing__ tasks. Notice that there is a `"{taskId}"` portion to this route. Similar to web apps, we will parse out a `Task._id` string from the route and use that for editing.

```kotlin title="Root.kt"

@Composable
fun Root() {
    val navController = rememberNavController()

    // A surface container using the 'background' color from the theme
    Surface(color = R.colors.white) {
        NavHost(navController = navController, startDestination = "tasks") {
            composable("tasks") { TasksListScreen(navController = navController) }
            composable("tasks/edit") {
                EditScreen(navController = navController, taskId = null)
            }
            composable("tasks/edit/{taskId}") { backStackEntry ->
                val taskId: String? = backStackEntry.arguments?.getString("taskId")
                EditScreen(navController = navController, taskId = taskId)
            }
        }
    }
}
```

## 3-2 Setting the `MainAcivity` to render `Root`

Now back in the __MainAcivity.kt__ file look for `setContent{ }` and replace it completely with the following highlighted lines.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val ditto = TasksApplication.ditto
        try {
            ditto!!.startSync()
        } catch (e: DittoError) {
            Toast.makeText(
                this@MainActivity,
                """
                    Uh oh! There was an error trying to start Ditto's sync feature.
                    That's okay, it will still work as a local database.
                    This is the error: ${e.localizedMessage}
                """.trimIndent(), Toast.LENGTH_LONG
            ).show()
        }

        // highlight-start
        setContent {
            Root()
        }
        // highlight-end
    }
}
```
