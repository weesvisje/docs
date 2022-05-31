"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8642],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return h}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=a.createContext({}),c=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(n),h=i,m=p["".concat(u,".").concat(h)]||p[h]||d[h]||o;return n?a.createElement(m,r(r({ref:t},s),{},{components:n})):a.createElement(m,r({ref:t},s))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=p;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var c=2;c<o;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},79443:function(e,t,n){var a=(0,n(67294).createContext)(void 0);t.Z=a},80944:function(e,t,n){var a=n(67294),i=n(79443);t.Z=function(){var e=(0,a.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e}},30547:function(e,t,n){var a=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,i=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},49366:function(e,t,n){var a=n(67294),i=n(80944),o=n(86010);t.Z=function(e){var t,n=e.lazy,r=(e.block,e.defaultValue),l=e.values,u=e.groupId,c=(e.className,a.Children.toArray(e.children)),s=null!=l?l:c.map((function(e){return{value:e.props.value,label:e.props.label}})),d=null!=r?r:null==(t=c.find((function(e){return e.props.default})))?void 0:t.props.value,p=(0,i.Z)(),h=p.tabGroupChoices,m=p.setTabGroupChoices,f=(0,a.useState)(d),g=f[0],v=f[1];if(null!=u){var y=h[u];null!=y&&y!==g&&s.some((function(e){return e.value===y}))&&v(y)}var b=function(e){v(e),null!=u&&m(u,e)};return a.createElement("div",{className:"tabs-container"},a.createElement("div",{className:"sm:hidden"},a.createElement("label",{htmlFor:"tabs",className:"sr-only"},"Select a tab"),a.createElement("select",{id:"tabs",name:"tabs",value:g,onChange:function(e){return b(e.currentTarget.value)},className:"block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"},s.map((function(e){var t=e.value,n=e.label;return a.createElement("option",{value:t,key:t},null!=n?n:t)})))),a.createElement("div",{className:"hidden sm:block"},a.createElement("nav",{className:"flex space-x-4","aria-label":"Tabs"},s.map((function(e){var t=e.value,n=e.label;return a.createElement("button",{key:t,onClick:function(){return b(t)},className:(0,o.Z)(g===t?"bg-blue-100 text-blue-700":"text-gray-500 hover:text-gray-700","px-3 py-2 font-medium text-sm rounded-md"),"aria-current":g===t?"page":void 0},null!=n?n:t)})))),n?(0,a.cloneElement)(c.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},c.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==g})}))))}},50123:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return c},metadata:function(){return d},toc:function(){return p}});var a=n(87462),i=n(63366),o=(n(67294),n(3905)),r=n(49366),l=n(30547),u=["components"],c={title:"Login and Refresh",sidebar_position:2},s=void 0,d={unversionedId:"guides/authentication/login",id:"guides/authentication/login",isDocsHomePage:!1,title:"Login and Refresh",description:"Configure your Client App",source:"@site/docs/guides/authentication/3-login.mdx",sourceDirName:"guides/authentication",slug:"/guides/authentication/login",permalink:"/pr-preview/pr-217/guides/authentication/login",editUrl:"https://github.com/getditto/docs/edit/master/docs/guides/authentication/3-login.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Login and Refresh",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Server-side Webhook",permalink:"/pr-preview/pr-217/guides/authentication/server"},next:{title:"Logout",permalink:"/pr-preview/pr-217/guides/authentication/logout"}},p=[{value:"Configure your Client App",id:"configure-your-client-app",children:[],level:2}],h={toc:p};function m(e){var t=e.components,c=(0,i.Z)(e,u);return(0,o.kt)("wrapper",(0,a.Z)({},h,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"configure-your-client-app"},"Configure your Client App"),(0,o.kt)("p",null,"To configure your client application, you must first add URL of the POST\nendpoint you created in the previous section."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Sample Authentication Webhook Endpoint in the Portal",src:n(23706).Z})),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The provider name given to the Ditto Client must match a provider name in the Ditto Portal (for example, ",(0,o.kt)("inlineCode",{parentName:"p"},"my-auth"),")."))),(0,o.kt)("p",null,"This tutorial assumes you've already configured your ",(0,o.kt)("inlineCode",{parentName:"p"},"auth0")," client from the\nofficial ",(0,o.kt)("a",{parentName:"p",href:"https://auth0.com/docs/"},"Auth0 documentation"),"."),(0,o.kt)(r.Z,{groupId:"programming-language",defaultValue:"javascript",values:[{label:"JavaScript",value:"javascript"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,o.kt)("p",null,"Assuming you have a login button in the HTML:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<button onClick={login}>Login</button>\n")),(0,o.kt)("p",null,"We attach a ",(0,o.kt)("inlineCode",{parentName:"p"},"login")," function to the button."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import createAuth0Client from '@auth0/auth0-spa-js';\n// OR for React\nimport { useAuth0 } from '@auth0/auth0-react';\n\n// configure your auth0 client...\n\nasync function login () {\n  await auth0.loginWithRedirect({\n    redirect_uri: window.location.origin\n  });\n  startDitto()\n}\n")),(0,o.kt)("p",null,"We can then create a ",(0,o.kt)("inlineCode",{parentName:"p"},"startDitto")," function that gets the access token and starts a\nnew Ditto instance, and passes the token to your server route you created in the previous section."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import createAuth0Client from '@auth0/auth0-spa-js';\n// OR for React\nimport { useAuth0 } from '@auth0/auth0-react';\nimport { init, Ditto } from \"@dittolive/ditto\"\n\n// configure your auth0 client...\n\nlet ditto\n\n(async () => {\n  await init() // you need to call this at least once before using any of the Ditto API\n\n  function startDitto () {\n    let token = await auth0.getAccessTokenSilently();\n\n    const authHandler = {\n      authenticationRequired: async function(authenticator) {\n        await authenticator.loginWithToken(token, \"my-auth\");\n        console.log(\"Login request completed.\");\n      },\n      authenticationExpiringSoon: function(authenticator, secondsRemaining) {\n        console.log(`Auth token expiring in ${secondsRemaining} seconds`)\n        await authenticator.loginWithToken(token, \"my-auth\");\n        console.log(\"Login request completed.\");\n      }\n    }\n\n    const identity = {\n      type: 'onlineWithAuthentication',\n      appID: 'REPLACE_ME_WITH_YOUR_APP_ID',\n      authHandler\n    }\n\n    ditto = new Ditto(identity, '/persistence/file/path')\n    ditto.tryStartSync()\n  }\n\n  async function login () {\n    await auth0.loginWithRedirect({\n      redirect_uri: window.location.origin\n    });\n    startDitto()\n  }\n})()\n")),(0,o.kt)("p",null,"To demonstrate that this Ditto client has been authenticated, let's display the\nnumber of cars in the collection, and a button to add one item to it: "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<div>\n  <h1>Cars: {numberOfCars}</h1>\n  <button onClick={addItem}>+1</button>\n</div>\n")),(0,o.kt)("p",null,"Once we start the ditto instance, we can create a ",(0,o.kt)("inlineCode",{parentName:"p"},"liveQuery")," and create a\nbutton that adds items to a collection:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let liveQuery = ditto.store.collection('cars').findAll().observe((cars) => {\n  numberOfCars = cars.length\n})\n\nfunction addItem () {\n  ditto.store.collection('cars').upsert({\n    \"name\": 'Toyota'\n  })\n}\n")),(0,o.kt)("p",null,"The full JavaScript file is:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import createAuth0Client from '@auth0/auth0-spa-js';\n// OR for React\nimport { useAuth0 } from '@auth0/auth0-react';\nimport { init, Ditto } from \"@dittolive/ditto\"\n\n// configure your auth0 client...\n\nlet ditto\nlet numberOfCars = 0\n\n(async () => {\n  await init() // you need to call this at least once before using any of the Ditto API\n\n  function startDitto () {\n    let token = await auth0.getAccessTokenSilently();\n\n    const authHandler = {\n      authenticationRequired: async function(authenticator) {\n        await authenticator.loginWithToken(token, \"my-auth\");\n        console.log(\"Login request completed.\");\n      },\n      authenticationExpiringSoon: function(authenticator, secondsRemaining) {\n        console.log(`Auth token expiring in ${secondsRemaining} seconds`)\n        await authenticator.loginWithToken(token, \"my-auth\");\n        console.log(\"Login request completed.\");\n      }\n    }\n\n    const identity = {\n      type: 'onlineWithAuthentication',\n      appID: 'REPLACE_ME_WITH_YOUR_APP_ID',\n      authHandler\n    }\n\n    ditto = new Ditto(identity, '/persistence/file/path')\n    ditto.tryStartSync()\n\n    let liveQuery = ditto.store.collection('cars').findAll().observe((cars) => {\n      numberOfCars = cars.length\n    })\n\n    function addItem () {\n      ditto.store.collection('cars').upsert({\n        \"name\": 'Toyota'\n      })\n    }\n  }\n\n  async function login () {\n    await auth0.loginWithRedirect({\n      redirect_uri: window.location.origin\n    });\n    startDitto()\n  }\n})()\n"))),(0,o.kt)(l.Z,{value:"swift",mdxType:"TabItem"},(0,o.kt)("p",null,"Assuming you have a login button in your SwiftUI ContentView, we want to create\na new ",(0,o.kt)("inlineCode",{parentName:"p"},"ObservedObject")," that we can subscribe to for updates to the\nauthentication status."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'class ProfileViewModel: ObservableObject {\n  // your authentication code will go here\n}\n\nstruct ContentView: View {\n    @ObservedObject var viewModel: ProfileViewModel = ProfileViewModel()\n\n    var body: some View {\n      Button("Login").padding()\n    }\n}\n')),(0,o.kt)("p",null,"We attach a login function to the button"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'class ProfileViewModel: ObservableObject {\n  // highlight-start\n  let credentialsManager = CredentialsManager(authentication: Auth0.authentication())\n\n  func login () {\n      Auth0\n          .webAuth()\n          .scope("openid profile")\n          .audience("https://ENTER_YOUR_SCOPE_URL_HERE.auth0.com/userinfo")\n          .start { result in\n              switch result {\n              case .success(let credentials):\n                  print("Obtained credentials: \\(credentials)")\n                  self.credentialsManager.store(credentials: credentials)\n                  self.startDitto()\n              case .failure(let error):\n                  print("Failed with: \\(error)")\n                  // Handle Error\n              }\n          }\n  }\n  // highlight-end\n}\n\nstruct ContentView: View {\n    @ObservedObject var viewModel: ProfileViewModel = ProfileViewModel()\n\n    var body: some View {\n      Button("Login", action: viewModel.login).padding()\n    }\n}\n')),(0,o.kt)("p",null,"We can then create a startDitto function that:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Gets the access token from Auth0;"),(0,o.kt)("li",{parentName:"ol"},"Starts the Ditto instance; and "),(0,o.kt)("li",{parentName:"ol"},"Creates a liveQuery")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'class ProfileViewModel: ObservableObject {\n  // highlight-next-line\n    @Published var ditto: Ditto?\n  // highlight-next-line\n    @Published var docs: [DittoDocument] = []\n    ....\n\n    func startDitto () {\n      // 1. Get the access token from Auth0\n      // highlight-start\n        credentialsManager.credentials { error, credentials in\n            guard error == nil, let credentials = credentials else {\n                // Handle error\n                return\n            }\n            \n            guard let accessToken = credentials.accessToken else {\n                // Handle Error\n                return\n            }\n            self.authDelegate = AuthDelegate(token: accessToken)\n          // highlight-end\n        \n            // 2. Start the Ditto instance \n            // highlight-start\n            let identity = DittoIdentity.onlineWithAuthentication(\n                appID: "YOUR_APP_ID_HERE",\n                authenticationDelegate: self.authDelegate\n            )\n\n            let ditto = Ditto(identity: identity)\n            try! ditto.tryStartSync()\n            // highlight-end\n\n            // 3. Create a liveQuery \n            // highlight-start\n            self.ditto = ditto\n            let liveQuery = ditto.store.collection("cars").findAll().observe { docs, event in\n                self.docs = docs\n            }\n            // highlight-end\n            \n        }\n    }\n}\n        \n')),(0,o.kt)("p",null,"To pass the token to your server route you created in the previous section, you\nneed to create an ",(0,o.kt)("inlineCode",{parentName:"p"},"AuthDelegate")," class that is passed to the Ditto constructor:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'class AuthDelegate: DittoAuthenticationDelegate {\n    var token: String\n    \n    init (token: String) {\n        self.token = token\n    }\n\n    func authenticationRequired(authenticator: DittoAuthenticator) {\n        authenticator.loginWithToken(self.token, provider: "my-auth") { err in\n            print("Login request completed. Error? \\(err)")\n        }\n    }\n\n    func authenticationExpiringSoon(authenticator: DittoAuthenticator, secondsRemaining: Int64) {\n        print("Auth token expiring in \\(secondsRemaining)")\n        authenticator.loginWithToken(self.token, provider: "my-auth") { err in\n            print("Login request completed. Error? \\(err)")\n        }\n    }\n}\n')),(0,o.kt)("p",null,"Our ContentView can now display the number of cars, and you can add a button for\nadding an item to the database:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'\nstruct ContentView: View {\n    @ObservedObject var viewModel: ProfileViewModel = ProfileViewModel()\n    \n    var body: some View {\n          Button("Login", action: viewModel.login)\n              .padding()\n        }\n    \n        Text("Cars:" + String(viewModel.docs.count))\n        // Bonus points: implement addItem button using Ditto\'s `upsert`\n        Button("+1", viewModel.addItem)\n        \n    }\n}\n\n')))),(0,o.kt)("p",null,"To make this usable for real-world applications, you can retreieve the user's\nprofile details such as email, username, and full name. See the official Auth0\ndocumentation for your platform to add that functionality to your application."))}m.isMDXComponent=!0},86010:function(e,t,n){function a(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})},23706:function(e,t,n){t.Z=n.p+"assets/images/sample-authentication-webhook-endpoint-bcf6ba631bbd3e5b7a4d7f9fc802d2dc.png"}}]);