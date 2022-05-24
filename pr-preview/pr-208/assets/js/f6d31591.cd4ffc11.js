"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9203],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),f=o,h=d["".concat(s,".").concat(f)]||d[f]||u[f]||a;return n?i.createElement(h,r(r({ref:t},p),{},{components:n})):i.createElement(h,r({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,r=new Array(a);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var c=2;c<a;c++)r[c]=n[c];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91632:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var i=n(87462),o=n(63366),a=(n(67294),n(3905)),r=["components"],l={title:"1 - Setup"},s=void 0,c={unversionedId:"tutorials/uikit/setup",id:"tutorials/uikit/setup",isDocsHomePage:!1,title:"1 - Setup",description:"1-1 Create the App",source:"@site/docs/tutorials/uikit/1-setup.md",sourceDirName:"tutorials/uikit",slug:"/tutorials/uikit/setup",permalink:"/pr-preview/pr-208/tutorials/uikit/setup",editUrl:"https://github.com/getditto/docs/edit/master/docs/tutorials/uikit/1-setup.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"1 - Setup"},sidebar:"tutorialSidebar",previous:{title:"5 - Editing Tasks",permalink:"/pr-preview/pr-208/tutorials/jetpack-compose/edit-screen"},next:{title:"2 - Configure Ditto",permalink:"/pr-preview/pr-208/tutorials/uikit/configure-ditto"}},p=[{value:"1-1 Create the App",id:"1-1-create-the-app",children:[],level:2},{value:"1-2 Create the UI Interface",id:"1-2-create-the-ui-interface",children:[],level:2},{value:"1-3 Configure Storyboard",id:"1-3-configure-storyboard",children:[],level:2},{value:"1-4 Wire Up UI",id:"1-4-wire-up-ui",children:[],level:2}],u={toc:p};function d(e){var t=e.components,l=(0,o.Z)(e,r);return(0,a.kt)("wrapper",(0,i.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"1-1-create-the-app"},"1-1 Create the App"),(0,a.kt)("p",null,'The first step is to create a basic Xcode project. Go to File New \u2192 Project and select "App":'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Xcode app selection",src:n(3007).Z})),(0,a.kt)("p",null,'Next, fill out the options with the product name: "Tasks" and choose the following values.'),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},'For "Interface" -> "Storyboard"'),(0,a.kt)("li",{parentName:"ul"},'For "Life Cycle" -> "UIKit App Delegate"'),(0,a.kt)("li",{parentName:"ul"},'For Language -> "Swift"')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Xcode app selection",src:n(62829).Z})),(0,a.kt)("h2",{id:"1-2-create-the-ui-interface"},"1-2 Create the UI Interface"),(0,a.kt)("p",null,"The UI for the app will look like this:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Create UI Interface for XCode",src:n(11853).Z})),(0,a.kt)("p",null,"This requires that we create several elements:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"UINavigationController")," to represent the top navigation bar"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"UITableViewController")," which contains the UITableView to display the list of tasks"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"UIBarButtonItem")," which is in the navigation bar to display the UIAlertController to input the task name\nFor simplicity we will use the built-in storyboard to create these.")),(0,a.kt)("p",null,"First, we need to add a new file to the project for the ",(0,a.kt)("inlineCode",{parentName:"p"},"UITableViewController"),'. Go to File New \u2192 File and select "Cocoa Touch Class":'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Create UI Interface for XCode",src:n(748).Z})),(0,a.kt)("p",null,"Name your class ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController")," and make sure it is a subclass of ",(0,a.kt)("inlineCode",{parentName:"p"},"UITableViewController"),":"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Create UI Interface for XCode",src:n(99321).Z})),(0,a.kt)("p",null,"You can then delete the ",(0,a.kt)("inlineCode",{parentName:"p"},"ViewController.swift")," file from the project so your structure should now look like this:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Create UI Interface for XCode",src:n(14017).Z})),(0,a.kt)("p",null,"Now the project is set up, so we can configure ",(0,a.kt)("inlineCode",{parentName:"p"},"Main.storyboard")," to create the UI."),(0,a.kt)("h2",{id:"1-3-configure-storyboard"},"1-3 Configure Storyboard"),(0,a.kt)("p",null,"Click on ",(0,a.kt)("inlineCode",{parentName:"p"},"Main.storyboard")," to load the storyboard editor. The initial storyboard includes a scene tied to the ViewController. We deleted it, so we need to remove it and add a ",(0,a.kt)("inlineCode",{parentName:"p"},"UINavigationController")," . Click on the View Controller Scene on the left-hand panel and click delete so the storyboard is now empty:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 1",src:n(19331).Z})),(0,a.kt)("p",null,"Now we need to add a ",(0,a.kt)("inlineCode",{parentName:"p"},"UINavigationController")," into the storyboard. Click the circle with a square in it icon in the top right to display your list of UI elements and search for ",(0,a.kt)("inlineCode",{parentName:"p"},"UINavigationController")," and click to add it to the storyboard. You should end up with this:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 2",src:n(8395).Z})),(0,a.kt)("p",null,"This created a ",(0,a.kt)("inlineCode",{parentName:"p"},"UINavigationController")," and a root view controller based on ",(0,a.kt)("inlineCode",{parentName:"p"},"UITableViewController"),", but it needs to be configured to work with our ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController.swift"),' file. Click on the "Root View Controller Scene" and navigate the right hand menu to declare the ',(0,a.kt)("inlineCode",{parentName:"p"},"UITableViewController")," as a custom class of ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController"),":"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 3",src:n(23896).Z})),(0,a.kt)("p",null,'Next, we need to ensure that the "Navigation Controller Scene" is the initial view controller for our app, so click on it and navigate the right hand menu to set this property:'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 4",src:n(51937).Z})),(0,a.kt)("p",null,"Now we need to customize the ",(0,a.kt)("inlineCode",{parentName:"p"},"UITableViewController"),' to include the add task button. Click on the "Root View Controller Scene" and then click the "Circle with square" icon in the top right to add a ',(0,a.kt)("inlineCode",{parentName:"p"},"UIBarButtonItem"),' , search for "Bar Button Item" and drag it onto the top right corner of the ',(0,a.kt)("inlineCode",{parentName:"p"},"UINavigationBar"),'. Finally, configure the bar item to use the "System Item" "Add" in the right-hand menu:'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 5",src:n(97799).Z})),(0,a.kt)("p",null,'The last configuration is to adjust the name in the navigation bar to "Tasks", click on the "Root View Controller" text and navigate the right-hand menu to adjust the name:'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Configure Storyboard 6",src:n(14463).Z})),(0,a.kt)("p",null,"Great! We have the UI elements in place, but now we need to wire them up, or connect them with our implementation code in ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController"),"."),(0,a.kt)("h2",{id:"1-4-wire-up-ui"},"1-4 Wire Up UI"),(0,a.kt)("p",null,'First, we need to declare a function that will called when the user clicks on the add icon in the navigation bar. To do so, click the "Show Assistant Editor" button in the top right so that our storyboard and ',(0,a.kt)("inlineCode",{parentName:"p"},"TaskTableViewController.swift")," file are both displayed:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Wire up UI 1",src:n(85637).Z})),(0,a.kt)("p",null,"Now, right click on the add button and drag it into the class implementation of ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController")," just above the ",(0,a.kt)("inlineCode",{parentName:"p"},"numberOfSections()")," function:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Wire up UI 2",src:n(49696).Z})),(0,a.kt)("p",null,"Name the function ",(0,a.kt)("inlineCode",{parentName:"p"},"didClickAddTask")," and adjust the type to ",(0,a.kt)("inlineCode",{parentName:"p"},"UIBarButtonItem")," and click connect. You should now have a function that is wired up to be called whenever that button is clicked:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Wire up UI 3",src:n(46651).Z})),(0,a.kt)("p",null,"Finally, we will need to configure ",(0,a.kt)("inlineCode",{parentName:"p"},"UITableView")," in ",(0,a.kt)("inlineCode",{parentName:"p"},"TasksTableViewController"),' and as part of this, we need to provide a "Table view cell reuse identifier", so let\'s configure our storyboard cell to include an identifier. Click on the "Prototype Cells" area in your view and navigate the right-hand menu to display the configuration for the "Table View Cell" and insert ',(0,a.kt)("inlineCode",{parentName:"p"},"taskCell")," as the identifier:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Wire up UI 4",src:n(94010).Z})),(0,a.kt)("p",null,"Almost done! Our UI is now setup and configured, all that is left is to add Ditto and the associated logic to create and display tasks!"))}d.isMDXComponent=!0},19331:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard1-a5aeb1407166e80ccc2f6d4a8a54ab72.png"},8395:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard2-cff67346c915e0acc724b40c37c78b72.png"},23896:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard3-eeb2e74abb12bf3423ba32afc2b35613.png"},51937:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard4-03c976adaa94ef65baf24f811f7c6284.png"},97799:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard5-d2eb72c7c196a3ad96336820a1937c6c.png"},14463:function(e,t,n){t.Z=n.p+"assets/images/configure_storyboard6-c40add480539b7dbc5a38c3934128d25.png"},11853:function(e,t,n){t.Z=n.p+"assets/images/create_ui1-2a1b9b6ca333d2800e7ee600c326df9f.png"},748:function(e,t,n){t.Z=n.p+"assets/images/create_ui2-3adc0be1768c824a996786ff02443c83.png"},99321:function(e,t,n){t.Z=n.p+"assets/images/create_ui3-9013e1ba6c55bb03ea6937e719554348.png"},14017:function(e,t,n){t.Z=n.p+"assets/images/create_ui4-ae2c2a4c3592732d7d7c36ae5a468919.png"},85637:function(e,t,n){t.Z=n.p+"assets/images/wire_up1-a53558fc2a9d39e54fba0a1584451526.png"},49696:function(e,t,n){t.Z=n.p+"assets/images/wire_up2-5776f92cceb54b4ced496150f80eb813.png"},46651:function(e,t,n){t.Z=n.p+"assets/images/wire_up3-fe978359340553b87a5b89dab491e46a.png"},94010:function(e,t,n){t.Z=n.p+"assets/images/wire_up4-9be668d95c6b78a2d5c9db3ea87f9798.png"},3007:function(e,t,n){t.Z=n.p+"assets/images/xcode1-50e221e6c98cdbf694d5e30f9e5757cd.png"},62829:function(e,t,n){t.Z=n.p+"assets/images/xcode2-42187b7718b2a13e9a888c4e15661ab2.png"}}]);