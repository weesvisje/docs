"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2899],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=i.createContext({}),s=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,h=u["".concat(d,".").concat(m)]||u[m]||c[m]||l;return n?i.createElement(h,r(r({ref:t},p),{},{components:n})):i.createElement(h,r({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,r=new Array(l);r[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,r[1]=o;for(var s=2;s<l;s++)r[s]=n[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},89797:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return d},default:function(){return u},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return p}});var i=n(87462),a=n(63366),l=(n(67294),n(3905)),r=["components"],o={title:"4 - Editing Tasks"},d=void 0,s={unversionedId:"tutorials/swiftui/edit-screen",id:"tutorials/swiftui/edit-screen",isDocsHomePage:!1,title:"4 - Editing Tasks",description:"Our final screen will be the EditScreen and it's ViewModel. The EditScreen will be in charge of 3 functions:",source:"@site/docs/tutorials/swiftui/4-edit-screen.md",sourceDirName:"tutorials/swiftui",slug:"/tutorials/swiftui/edit-screen",permalink:"/pr-preview/pr-188/tutorials/swiftui/edit-screen",editUrl:"https://github.com/getditto/docs/edit/master/docs/tutorials/swiftui/4-edit-screen.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"4 - Editing Tasks"},sidebar:"tutorialSidebar",previous:{title:"3 - Showing the List of Tasks",permalink:"/pr-preview/pr-188/tutorials/swiftui/tasks-list-screen"},next:{title:"1 - Setup",permalink:"/pr-preview/pr-188/tutorials/jetpack-compose/setup"}},p=[{value:"4-1 Creating the <code>EditScreenViewModel</code>",id:"4-1-creating-the-editscreenviewmodel",children:[],level:2},{value:"4-3 Create the <code>EditScreen</code>:",id:"4-3-create-the-editscreen",children:[],level:2},{value:"4-4 Run the app!",id:"4-4-run-the-app",children:[],level:2}],c={toc:p};function u(e){var t=e.components,o=(0,a.Z)(e,r);return(0,l.kt)("wrapper",(0,i.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Our final screen will be the ",(0,l.kt)("inlineCode",{parentName:"p"},"EditScreen")," and it's ViewModel. The ",(0,l.kt)("inlineCode",{parentName:"p"},"EditScreen")," will be in charge of 3 functions:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Editing an existing ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")),(0,l.kt)("li",{parentName:"ul"},"Creating a ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")," and inserting into the tasks collection"),(0,l.kt)("li",{parentName:"ul"},"Deleting an existing ",(0,l.kt)("inlineCode",{parentName:"li"},"Task"))),(0,l.kt)("h2",{id:"4-1-creating-the-editscreenviewmodel"},"4-1 Creating the ",(0,l.kt)("inlineCode",{parentName:"h2"},"EditScreenViewModel")),(0,l.kt)("p",null,"Like before, we need to create an ",(0,l.kt)("inlineCode",{parentName:"p"},"EditScreenViewModel")," for the ",(0,l.kt)("inlineCode",{parentName:"p"},"EditScreen"),". Since we've already gone over the concepts of MVVM, we will go a bit faster."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreenViewModel")," needs to be initialized with ",(0,l.kt)("inlineCode",{parentName:"li"},"ditto")," and an optional ",(0,l.kt)("inlineCode",{parentName:"li"},"task: Task?")," value. If the task value is ",(0,l.kt)("inlineCode",{parentName:"li"},"nil")," we need to set the ",(0,l.kt)("inlineCode",{parentName:"li"},"canDelete")," variable to ",(0,l.kt)("inlineCode",{parentName:"li"},"false"),". This means that the user is attempting ",(0,l.kt)("em",{parentName:"li"},"create")," a new ",(0,l.kt)("inlineCode",{parentName:"li"},"Task"),". We will use this value to show a delete ",(0,l.kt)("inlineCode",{parentName:"li"},"Button")," in the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")," later. We will store the ",(0,l.kt)("inlineCode",{parentName:"li"},"_id: String?")," from the ",(0,l.kt)("inlineCode",{parentName:"li"},"task")," parameter and use it later in the ",(0,l.kt)("inlineCode",{parentName:"li"},"save()")," function."),(0,l.kt)("li",{parentName:"ol"},"We need two ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published")," variables to bind to a ",(0,l.kt)("inlineCode",{parentName:"li"},"TextField")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"Toggle")," SwiftUI views for the task's ",(0,l.kt)("inlineCode",{parentName:"li"},"isCompleted")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"body")," values. If the ",(0,l.kt)("inlineCode",{parentName:"li"},"task == nil"),", we will set some default values like an empty string and a false ",(0,l.kt)("inlineCode",{parentName:"li"},"isCompleted")," value."),(0,l.kt)("li",{parentName:"ol"},"When the user wants to click a save ",(0,l.kt)("inlineCode",{parentName:"li"},"Button"),", we need to ",(0,l.kt)("inlineCode",{parentName:"li"},"save()")," and handle either an ",(0,l.kt)("inlineCode",{parentName:"li"},".upsert")," or ",(0,l.kt)("inlineCode",{parentName:"li"},".update")," function appropriately. If the local ",(0,l.kt)("inlineCode",{parentName:"li"},"_id")," variable is ",(0,l.kt)("inlineCode",{parentName:"li"},"nil"),", we assume the user is attempting to create a ",(0,l.kt)("inlineCode",{parentName:"li"},"Task")," and will call ditto's ",(0,l.kt)("inlineCode",{parentName:"li"},".upsert")," function. Otherwise, we will attempt to ",(0,l.kt)("inlineCode",{parentName:"li"},".update")," an existing task with a known ",(0,l.kt)("inlineCode",{parentName:"li"},"_id"),"."),(0,l.kt)("li",{parentName:"ol"},"Finally if a delete button is clicked, we attempt to find the document and call ",(0,l.kt)("inlineCode",{parentName:"li"},".remove"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift",metastring:'title="EditScreenViewModel.swift"',title:'"EditScreenViewModel.swift"'},'import SwiftUI\nimport DittoSwift\n\nclass EditScreenViewModel: ObservableObject {\n\n    @Published var canDelete: Bool = false\n    // 2.\n    // highlight-start\n    @Published var body: String = ""\n    @Published var isCompleted: Bool = false\n    // highlight-end\n\n    // 1.\n    // highlight-start\n    private let _id: String?\n    private let ditto: Ditto\n\n    init(ditto: Ditto, task: Task?) {\n        self._id = task?._id\n        self.ditto = ditto\n\n        canDelete = task != nil\n        body = task?.body ?? ""\n        isCompleted = task?.isCompleted ?? false\n    }\n    // highlight-end\n\n    // 3.\n    // highlight-start\n    func save() {\n        if let _id = _id {\n            // the user is attempting to update\n            ditto.store["tasks"].findByID(_id).update({ mutableDoc in\n                mutableDoc?["isCompleted"].set(self.isCompleted)\n                mutableDoc?["body"].set(self.body)\n            })\n        } else {\n            // the user is attempting to upsert\n            try! ditto.store["tasks"].upsert([\n                "body": body,\n                "isCompleted": isCompleted\n            ])\n        }\n    }\n    // highlight-end\n\n    // 4.\n    // highlight-start\n    func delete() {\n        guard let _id = _id else { return }\n        ditto.store["tasks"].findByID(_id).remove()\n    }\n    // highlight-end\n}\n')),(0,l.kt)("h2",{id:"4-3-create-the-editscreen"},"4-3 Create the ",(0,l.kt)("inlineCode",{parentName:"h2"},"EditScreen"),":"),(0,l.kt)("p",null,"Like the ",(0,l.kt)("inlineCode",{parentName:"p"},"TasksListScreen.swift")," in the previous section, we will create an ",(0,l.kt)("inlineCode",{parentName:"p"},"EditScreen.swift"),".\nThis screen will use SwiftUI's Form and Section wrapper."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"An ",(0,l.kt)("inlineCode",{parentName:"li"},"TextField")," which we use to edit the ",(0,l.kt)("inlineCode",{parentName:"li"},"Task.body")),(0,l.kt)("li",{parentName:"ol"},"A ",(0,l.kt)("inlineCode",{parentName:"li"},"Switch")," which is used to edit the ",(0,l.kt)("inlineCode",{parentName:"li"},"Task.isCompleted")),(0,l.kt)("li",{parentName:"ol"},"A ",(0,l.kt)("inlineCode",{parentName:"li"},"Button")," for saving a task."),(0,l.kt)("li",{parentName:"ol"},"A ",(0,l.kt)("inlineCode",{parentName:"li"},"Button")," for deleting a task")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"Xcode Edit Screen Preview",src:n(12333).Z})),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"In the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")," we need to add a ",(0,l.kt)("inlineCode",{parentName:"li"},"@Environment(\\.presentationMode) private var presentationMode"),". In SwiftUI views house some environment variables. Because the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreen")," presened the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen")," as a ",(0,l.kt)("inlineCode",{parentName:"li"},".sheet"),", we need a way to dismiss the current screen if the user taps any of the buttons. To learn more about ",(0,l.kt)("inlineCode",{parentName:"li"},"Environment"),", ",(0,l.kt)("a",{parentName:"li",href:"https://developer.apple.com/documentation/swiftui/environment"},"read Apple's official documentation."),". To dismiss the current screen we can call ",(0,l.kt)("inlineCode",{parentName:"li"},"self.presentationMode.wrappedValue.dismiss()")),(0,l.kt)("li",{parentName:"ol"},"Like before, store the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreenViewModel")," as an ",(0,l.kt)("inlineCode",{parentName:"li"},"ObservedObject"),". Pass the ",(0,l.kt)("inlineCode",{parentName:"li"},"task: Task?")," and the ",(0,l.kt)("inlineCode",{parentName:"li"},"ditto")," instance to properly initialize the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreenViewModel"),". Now the ViewModel should know if the user is attempting a creation or update flow."),(0,l.kt)("li",{parentName:"ol"},"We now can bind the ",(0,l.kt)("inlineCode",{parentName:"li"},"TextField")," for the ",(0,l.kt)("inlineCode",{parentName:"li"},"$viewModel.body")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"Toggle")," to the ",(0,l.kt)("inlineCode",{parentName:"li"},"$viewModel.isCompleted"),". Notice the ",(0,l.kt)("inlineCode",{parentName:"li"},"$"),", this allows SwiftUI fields to bi-directionally edit these ",(0,l.kt)("inlineCode",{parentName:"li"},"@Published")," values and trigger efficient view reloading."),(0,l.kt)("li",{parentName:"ol"},"Bind the save button's ",(0,l.kt)("inlineCode",{parentName:"li"},"action:")," handler to the ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel.save()")," function and dismiss the view. Whenever the user clicks the save button, they will save the current data and return back to the ",(0,l.kt)("inlineCode",{parentName:"li"},"TasksListScreen")),(0,l.kt)("li",{parentName:"ol"},"If the ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel.canDelete")," is ",(0,l.kt)("inlineCode",{parentName:"li"},"true"),", we can show a delete ",(0,l.kt)("inlineCode",{parentName:"li"},"Button"),". Notice how we don't need the ",(0,l.kt)("inlineCode",{parentName:"li"},"$")," since we are only reading the value once. Moreover, we do not need to tell SwiftUI to re-render on ",(0,l.kt)("inlineCode",{parentName:"li"},"canDelete")," since it will never change during the ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen"),"'s life cycle."),(0,l.kt)("li",{parentName:"ol"},"Bind the delete button's ",(0,l.kt)("inlineCode",{parentName:"li"},"action:")," to the ",(0,l.kt)("inlineCode",{parentName:"li"},"viewModel.delete()")," function and dismiss the view."),(0,l.kt)("li",{parentName:"ol"},"Finally we add a ",(0,l.kt)("inlineCode",{parentName:"li"},"EditScreen_Previews")," so that you can easily watch the view's final rendering as you develop.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-swift",metastring:'title="EditScreen.swift"',title:'"EditScreen.swift"'},'struct EditScreen: View {\n\n    // 1.\n    // highlight-next-line\n    @Environment(\\.presentationMode) private var presentationMode\n\n    // 2.\n    // highlight-start\n    @ObservedObject var viewModel: EditScreenViewModel\n\n    init(ditto: Ditto, task: Task?) {\n        viewModel = EditScreenViewModel(ditto: ditto, task: task)\n    }\n    // highlight-end\n\n    var body: some View {\n        NavigationView {\n            Form {\n                Section {\n                    // 3.\n                    // highlight-start\n                    TextField("Body", text: $viewModel.body)\n                    Toggle("Is Completed", isOn: $viewModel.isCompleted)\n                    // highlight-end\n                }\n                Section {\n                    Button(action: {\n                        // 4.\n                        // highlight-start\n                        viewModel.save()\n                        self.presentationMode.wrappedValue.dismiss()\n                        // highlight-end\n                    }, label: {\n                        Text(viewModel.canDelete ? "Save" : "Create")\n                    })\n                }\n                // 5.\n                // highlight-next-line\n                if viewModel.canDelete {\n                    Section {\n                        Button(action: {\n                            // 6.\n                            // highlight-start\n                            viewModel.delete()\n                            self.presentationMode.wrappedValue.dismiss()\n                            // highlight-end\n                        }, label: {\n                            Text("Delete")\n                                .foregroundColor(.red)\n                        })\n                    }\n                }\n            }\n            .navigationTitle(viewModel.canDelete ? "Edit Task": "Create Task")\n            .navigationBarItems(trailing: Button(action: {\n                self.presentationMode.wrappedValue.dismiss()\n            }, label: {\n                Text("Cancel")\n            }))\n        }\n    }\n}\n\n// 7.\n// highlight-start\nstruct EditScreen_Previews: PreviewProvider {\n    static var previews: some View {\n        EditScreen(ditto: Ditto(), task: Task(body: "Get Milk", isCompleted: true))\n    }\n}\n// highlight-end\n')),(0,l.kt)("h2",{id:"4-4-run-the-app"},"4-4 Run the app!"),(0,l.kt)("p",null,"Congratulations you are now complete with the Ditto SwiftUI task app!"))}u.isMDXComponent=!0},12333:function(e,t,n){t.Z=n.p+"assets/images/xcode-editscreen-preview-c1b93c4808680c2ae4151768aa313e5d.png"}}]);