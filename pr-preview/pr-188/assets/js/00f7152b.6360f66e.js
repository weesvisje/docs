"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5945],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),d=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=d(e.components);return i.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),p=d(n),m=a,h=p["".concat(s,".").concat(m)]||p[m]||k[m]||l;return n?i.createElement(h,o(o({ref:t},c),{},{components:n})):i.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=p;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var d=2;d<l;d++)o[d]=n[d];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},46634:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return p},frontMatter:function(){return r},metadata:function(){return d},toc:function(){return c}});var i=n(87462),a=n(63366),l=(n(67294),n(3905)),o=["components"],r={title:"3 - Showing the List of Tasks"},s=void 0,d={unversionedId:"tutorials/swiftui/tasks-list-screen",id:"tutorials/swiftui/tasks-list-screen",isDocsHomePage:!1,title:"3 - Showing the List of Tasks",description:"In the last part of the tutorial we referenced a class called TasksListScreen. This screen will show a List using a JetPack Compose Column.",source:"@site/docs/tutorials/swiftui/3-tasks-list-screen.md",sourceDirName:"tutorials/swiftui",slug:"/tutorials/swiftui/tasks-list-screen",permalink:"/pr-preview/pr-188/tutorials/swiftui/tasks-list-screen",editUrl:"https://github.com/getditto/docs/edit/master/docs/tutorials/swiftui/3-tasks-list-screen.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"3 - Showing the List of Tasks"},sidebar:"tutorialSidebar",previous:{title:"2 - Configure Ditto",permalink:"/pr-preview/pr-188/tutorials/swiftui/configure-ditto"},next:{title:"4 - Editing Tasks",permalink:"/pr-preview/pr-188/tutorials/swiftui/edit-screen"}},c=[{value:"3-1 Create a <code>TaskRow</code> views",id:"3-1-create-a-taskrow-views",children:[],level:2},{value:"3-2 Create a <code>TasksListScreenViewModel</code>",id:"3-2-create-a-taskslistscreenviewmodel",children:[],level:2},{value:"3-3 Render <code>TaskRow</code> in a <code>ForEach</code> within the <code>TasksListScreen</code>",id:"3-3-render-taskrow-in-a-foreach-within-the-taskslistscreen",children:[],level:2}],k={toc:c};function p(e){var t=e.components,r=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,i.Z)({},k,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"In the last part of the tutorial we referenced a class called ",(0,l.kt)("inlineCode",{parentName:"p"},"TasksListScreen"),". This screen will show a ",(0,l.kt)("inlineCode",{parentName:"p"},"List<Task>")," using a JetPack Compose Column."),(0,l.kt)("h2",{id:"3-1-create-a-taskrow-views"},"3-1 Create a ",(0,l.kt)("inlineCode",{parentName:"h2"},"TaskRow")," views"),(0,l.kt)("p",null,"Each row of the tasks will be represented by a SwiftUI ",(0,l.kt)("inlineCode",{parentName:"p"},"View")," called ",(0,l.kt)("inlineCode",{parentName:"p"},"TaskRow")," which takes in a ",(0,l.kt)("inlineCode",{parentName:"p"},"Task")," and two callbacks which we will use later."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"If the ",(0,l.kt)("inlineCode",{parentName:"li"},"task.isCompleted")," is ",(0,l.kt)("inlineCode",{parentName:"li"},"true"),", we will show a filled circle icon and a\nstrikethrough style for the ",(0,l.kt)("inlineCode",{parentName:"li"},"body"),"."),(0,l.kt)("li",{parentName:"ol"},"If the ",(0,l.kt)("inlineCode",{parentName:"li"},"task.isCompleted")," is ",(0,l.kt)("inlineCode",{parentName:"li"},"false"),", we will show an open circle icon."),(0,l.kt)("li",{parentName:"ol"},"If the user taps the ",(0,l.kt)("inlineCode",{parentName:"li"},"Icon"),", we will call a ",(0,l.kt)("inlineCode",{parentName:"li"},"onToggle: ((_ task: Task) -> Void)?"),", we will reverse the ",(0,l.kt)("inlineCode",{parentName:"li"},"isCompleted")," from ",(0,l.kt)("inlineCode",{parentName:"li"},"true")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"false")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"false")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"true")),(0,l.kt)("li",{parentName:"ol"},"If the user taps the ",(0,l.kt)("inlineCode",{parentName:"li"},"Text"),", we will call a ",(0,l.kt)("inlineCode",{parentName:"li"},"onClickBody: ((_ task: Task) -> Void)?"),". We will use this to navigate an ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")," (we will create this later)")),(0,l.kt)("p",null,"For brevity, we will skip discussions on styling as it's best to see the code snippet below:"),(0,l.kt)("p",null,"We've also included a ",(0,l.kt)("inlineCode",{parentName:"p"},"TaskRow_Previews")," that allows you to see the end result with some test data quickly."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"TaskRowPreview",src:n(82119).Z})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift",metastring:'title="TaskRow.swift"',title:'"TaskRow.swift"'},'import SwiftUI\n\nstruct TaskRow: View {\n\n    let task: Task\n\n    var onToggle: ((_ task: Task) -> Void)?\n    var onClickBody: ((_ task: Task) -> Void)?\n\n    var body: some View {\n        HStack {\n            // 2.\n            Image(systemName: task.isCompleted ? "circle.fill": "circle")\n                .renderingMode(.template)\n                .foregroundColor(.accentColor)\n                .onTapGesture {\n                    onToggle?(task)\n                }\n            if task.isCompleted {\n                Text(task.body)\n                    // 2.\n                    .strikethrough()\n                    .onTapGesture {\n                        onClickBody?(task)\n                    }\n\n            } else {\n                // 3.\n                Text(task.body)\n                    .onTapGesture {\n                        onClickBody?(task)\n                    }\n            }\n\n        }\n    }\n}\n\nstruct TaskRow_Previews: PreviewProvider {\n    static var previews: some View {\n        List {\n            TaskRow(task: Task(body: "Get Milk", isCompleted: true))\n            TaskRow(task: Task(body: "Do Homework", isCompleted: false))\n            TaskRow(task: Task(body: "Take out trash", isCompleted: true))\n        }\n    }\n}\n')),(0,l.kt)("h2",{id:"3-2-create-a-taskslistscreenviewmodel"},"3-2 Create a ",(0,l.kt)("inlineCode",{parentName:"h2"},"TasksListScreenViewModel")),(0,l.kt)("p",null,"In the world of SwiftUI, the most important design pattern is the MVVM, which stands for Model-View-ViewModel. MVVM strives to separate all data manipulation (Model and ViewModel) and data presentation (UI or View) into distinct areas of concern. When it comes to Ditto, we recommend that you never include references to edit ",(0,l.kt)("inlineCode",{parentName:"p"},"ditto")," in ",(0,l.kt)("inlineCode",{parentName:"p"},"View.body"),". All interactions with ",(0,l.kt)("inlineCode",{parentName:"p"},"ditto")," for ",(0,l.kt)("inlineCode",{parentName:"p"},"upsert"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"update"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"find"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"remove")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"observe")," should be within a ",(0,l.kt)("inlineCode",{parentName:"p"},"ViewModel"),". The View should only render data from observable variables from the ",(0,l.kt)("inlineCode",{parentName:"p"},"ViewModel")," and only the ",(0,l.kt)("inlineCode",{parentName:"p"},"ViewModel")," should make direct edits to these variables."),(0,l.kt)("p",null,"Typically we create a ",(0,l.kt)("inlineCode",{parentName:"p"},"ViewModel")," per screen or per page of an application. For the ",(0,l.kt)("inlineCode",{parentName:"p"},"TasksListScreen")," we need some functionality like:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Showing a realtime list of ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")," objects"),(0,l.kt)("li",{parentName:"ul"},"Triggering an intention to edit a ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")),(0,l.kt)("li",{parentName:"ul"},"Triggering an intention to create a ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")),(0,l.kt)("li",{parentName:"ul"},"Clicking an icon to toggle the icon from ",(0,l.kt)("inlineCode",{parentName:"li"},"true")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"false")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"false")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"true"))),(0,l.kt)("p",null,"In SwiftUI we create a view model by inheriting the ",(0,l.kt)("inlineCode",{parentName:"p"},"ObservableObject"),". The ",(0,l.kt)("inlineCode",{parentName:"p"},"ObservableObject")," allows SwiftUI to watch changes to certain variables to trigger view updates intelligently. To learn more about ",(0,l.kt)("inlineCode",{parentName:"p"},"ObservableObject")," we recommend this excellent ",(0,l.kt)("a",{parentName:"p",href:"https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-observedobject-to-manage-state-from-external-objects"},"tutorial from Hacking with Swift"),"."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Create a file called ",(0,l.kt)("strong",{parentName:"li"},"TasksListScreenViewModel.swift")," in your project"),(0,l.kt)("li",{parentName:"ol"},"Add an ",(0,l.kt)("inlineCode",{parentName:"li"},"init")," constructor to pass in a ",(0,l.kt)("inlineCode",{parentName:"li"},"ditto: Ditto")," instance and store it in a local variable."),(0,l.kt)("li",{parentName:"ol"},"Create two ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published")," variables for ",(0,l.kt)("inlineCode",{parentName:"li"},"tasks")," and i",(0,l.kt)("inlineCode",{parentName:"li"},"sPresentingEditScreen"),". ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published")," variables are special variables of an ",(0,l.kt)("inlineCode",{parentName:"li"},"ObservableObject"),". If these variables change, SwiftUI will update the view accordingly. Any variables that are ",(0,l.kt)("em",{parentName:"li"},"not")," decorated with ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published")," can change but will be ignored by SwiftUI."),(0,l.kt)("li",{parentName:"ol"},"We also add a normal variable, ",(0,l.kt)("inlineCode",{parentName:"li"},"private(set) var taskToEdit: Task? = nil"),". When a user is attempting to ",(0,l.kt)("em",{parentName:"li"},"edit")," a task, we need to tell the view model which task the user would like to edit. This does not need to trigger a view reload, so it's a simple variable."),(0,l.kt)("li",{parentName:"ol"},"Here's where the magic happens. As soon as the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreenViewModel")," is initialized, we need to ",(0,l.kt)("inlineCode",{parentName:"li"},".observe")," all the tasks by creating a live query. To prevent the ",(0,l.kt)("inlineCode",{parentName:"li"},"liveQuery")," from being prematurely deallocated, we store it as a variable. In the observe callback, we convert all the documents into ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")," objects and set it to the ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published tasks")," variable. Every time to ",(0,l.kt)("inlineCode",{parentName:"li"},".observe")," fires, SwiftUI will pick up the changes and tell the view to render the list of tasks."),(0,l.kt)("li",{parentName:"ol"},"Add a function called ",(0,l.kt)("inlineCode",{parentName:"li"},"toggle()"),". When a user clicks on a task's image icon, we need to trigger reversing the ",(0,l.kt)("inlineCode",{parentName:"li"},"isCompleted")," state. In the function body we add a standard call to find the task by it's ",(0,l.kt)("inlineCode",{parentName:"li"},"_id")," and attempt to mutate the ",(0,l.kt)("inlineCode",{parentName:"li"},"isCompleted")," property."),(0,l.kt)("li",{parentName:"ol"},"Add a function called ",(0,l.kt)("inlineCode",{parentName:"li"},"clickedBody"),". When the user taps the ",(0,l.kt)("inlineCode",{parentName:"li"},"TaskRow"),"'s ",(0,l.kt)("inlineCode",{parentName:"li"},"Text")," field, we need to store that task and change the ",(0,l.kt)("inlineCode",{parentName:"li"},"isPresentingEditScreen")," to true. This will give us enough information to present a ",(0,l.kt)("inlineCode",{parentName:"li"},".sheet")," in the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreenViewModel")," to feed to the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")),(0,l.kt)("li",{parentName:"ol"},"In the previous setup of the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreen"),", we added a ",(0,l.kt)("inlineCode",{parentName:"li"},"navigationBarItem")," with a plus icon. When the user clicks this button we need to tell the view model that it should show the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen"),". So we've set the ",(0,l.kt)("inlineCode",{parentName:"li"},"isPresentingEditScreen")," property to ",(0,l.kt)("inlineCode",{parentName:"li"},"true"),". However, because we are attempting to ",(0,l.kt)("em",{parentName:"li"},"create")," a ",(0,l.kt)("inlineCode",{parentName:"li"},"Task"),", we need to set the ",(0,l.kt)("inlineCode",{parentName:"li"},"taskToEdit")," to ",(0,l.kt)("inlineCode",{parentName:"li"},"nil")," because we don't yet have a task.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift",metastring:'title="TasksListScreenViewModel.swift"',title:'"TasksListScreenViewModel.swift"'},'class TasksListScreenViewModel: ObservableObject {\n\n    // 3.\n    // highlight-start\n    @Published var tasks = [Task]()\n    @Published var isPresentingEditScreen: Bool = false\n    // highlight-end\n\n    // 4.\n    // highlight-next-line\n    private(set) var taskToEdit: Task? = nil\n\n    let ditto: Ditto\n    // 5.\n    // highlight-start\n    var liveQuery: DittoLiveQuery?\n\n    init(ditto: Ditto) {\n        self.ditto = ditto\n        self.liveQuery = ditto.store["tasks"]\n            .findAll()\n            .observe(eventHandler: {  docs, _ in\n                self.tasks = docs.map({ Task(document: $0) })\n            })\n    }\n    // highlight-end\n\n    // 6.\n    // highlight-start\n    func toggle(task: Task) {\n        self.ditto.store["tasks"].findByID(task._id)\n            .update { mutableDoc in\n                guard let mutableDoc = mutableDoc else { return }\n                mutableDoc["isCompleted"].set(!mutableDoc["isCompleted"].boolValue)\n            }\n    }\n    // highlight-end\n\n    // 7.\n    // highlight-start\n    func clickedBody(task: Task) {\n        taskToEdit = task\n        isPresentingEditScreen = true\n    }\n    // highlight-end\n\n    // 8.\n    // highlight-start\n    func clickedPlus() {\n        taskToEdit = nil\n        isPresentingEditScreen = true\n    }\n    // highlight-end\n}\n')),(0,l.kt)("h2",{id:"3-3-render-taskrow-in-a-foreach-within-the-taskslistscreen"},"3-3 Render ",(0,l.kt)("inlineCode",{parentName:"h2"},"TaskRow")," in a ",(0,l.kt)("inlineCode",{parentName:"h2"},"ForEach")," within the ",(0,l.kt)("inlineCode",{parentName:"h2"},"TasksListScreen")),(0,l.kt)("p",null,"Now we need to update our ",(0,l.kt)("inlineCode",{parentName:"p"},"TasksListScreen")," to properly bind any callbacks, events, and data to the ",(0,l.kt)("inlineCode",{parentName:"p"},"TasksListScreenViewModel"),"."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Back in the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreen")," view, we need to construct our ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreenViewModel")," and store it as an ",(0,l.kt)("inlineCode",{parentName:"li"},"@ObservedObject"),". This ",(0,l.kt)("inlineCode",{parentName:"li"},"@ObservedObject")," tells the view to watch for specific changes in the ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel")," variable."),(0,l.kt)("li",{parentName:"ol"},"We will need to store our ",(0,l.kt)("inlineCode",{parentName:"li"},"ditto")," object to pass to the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")," later."),(0,l.kt)("li",{parentName:"ol"},"In our ",(0,l.kt)("inlineCode",{parentName:"li"},"body")," variable, find the ",(0,l.kt)("inlineCode",{parentName:"li"},"List")," and add:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift"},"ForEach(viewModel.tasks) { task in\n    TaskRow(task: task,\n        onToggle: { task in viewModel.toggle(task: task) },\n        onClickBody: { task in viewModel.clickedBody(task: task) }\n    )\n}\n")),(0,l.kt)("p",null,"This will tell the list to iterate over all the ",(0,l.kt)("inlineCode",{parentName:"p"},"viewModel.tasks")," and render a ",(0,l.kt)("inlineCode",{parentName:"p"},"TaskRow"),". In each of the ",(0,l.kt)("inlineCode",{parentName:"p"},"TaskRow")," children, we need to bind the ",(0,l.kt)("inlineCode",{parentName:"p"},"onToggle")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"onClick")," callbacks to the viewModel methods."),(0,l.kt)("ol",{start:4},(0,l.kt)("li",{parentName:"ol"},"Bind the plus button to the ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel.clickedPlus")," event"),(0,l.kt)("li",{parentName:"ol"},"Now we need to present a ",(0,l.kt)("inlineCode",{parentName:"li"},".sheet")," which will activate based on the ",(0,l.kt)("inlineCode",{parentName:"li"},"$viewModel.isPresentingEditScreen")," variable. Notice how we added the ",(0,l.kt)("inlineCode",{parentName:"li"},"$")," before ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel"),". ",(0,l.kt)("inlineCode",{parentName:"li"},".sheet")," can edit the ",(0,l.kt)("inlineCode",{parentName:"li"},"isPresentingEditScreen")," once it's dismissed, so we need to treat the variable as a bidirectional binding."),(0,l.kt)("li",{parentName:"ol"},"We've also included a ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreen_Previews")," so that you can add some test data and see the result in a live view.")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"xcode TasksListScreen_Previews.png",src:n(94924).Z})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift",metastring:'title="TasksListScreen.swift"',title:'"TasksListScreen.swift"'},'struct TasksListScreen: View {\n\n    // 2.\n    // highlight-next-line\n    let ditto: Ditto\n\n    // 1.\n    // highlight-start\n    @ObservedObject var viewModel: TasksListScreenViewModel\n\n    init(ditto: Ditto) {\n        self.ditto = ditto\n        self.viewModel = TasksListScreenViewModel(ditto: ditto)\n    }\n    // highlight-end\n\n    var body: some View {\n        NavigationView {\n            List {\n                // 3.\n                // highlight-start\n                ForEach(viewModel.tasks) { task in\n                    TaskRow(task: task,\n                        onToggle: { task in viewModel.toggle(task: task) },\n                        onClickBody: { task in viewModel.clickedBody(task: task) }\n                    )\n                }\n                // highlight-end\n            }\n            .navigationTitle("Tasks - SwiftUI")\n            .navigationBarItems(trailing: Button(action: {\n                // 4\n                // highlight-next-line\n                viewModel.clickedPlus()\n            }, label: {\n                Image(systemName: "plus")\n            }))\n            // 5.\n            // highlight-start\n            .sheet(isPresented: $viewModel.isPresentingEditScreen, content: {\n                EditScreen(ditto: ditto, task: viewModel.taskToEdit)\n            })\n            // highlight-end\n        }\n    }\n}\n// 6.\n// highlight-start\nstruct TasksListScreen_Previews: PreviewProvider {\n    static var previews: some View {\n        TasksListScreen(ditto: Ditto())\n    }\n}\n// highlight-end\n')),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"Notice that we ",(0,l.kt)("em",{parentName:"p"},"DO NOT HAVE TO")," manipulate the ",(0,l.kt)("inlineCode",{parentName:"p"},"tasks")," value. Calling ",(0,l.kt)("inlineCode",{parentName:"p"},".update")," on ",(0,l.kt)("inlineCode",{parentName:"p"},"ditto")," will automatically fire the liveQuery to update the ",(0,l.kt)("inlineCode",{parentName:"p"},"tasks"),". You can always trust the liveQuery to immediately update the ",(0,l.kt)("inlineCode",{parentName:"p"},"@Published var tasks"),". There is no reason to poll or force reload. Ditto will automatically handle the state changes and SwiftUI will pick these changes up automatically."))))}p.isMDXComponent=!0},82119:function(e,t,n){t.Z=n.p+"assets/images/xcode-taskrow-preview-ef754ad4365c50b084ebdf0a938e3085.png"},94924:function(e,t,n){t.Z=n.p+"assets/images/xcode-taskslistscreen-preview-7011abc616291382a35ae49c91d1ac6a.png"}}]);