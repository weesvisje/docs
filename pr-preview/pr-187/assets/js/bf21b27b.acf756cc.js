"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3151],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=o.createContext({}),c=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return o.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(n),f=a,g=p["".concat(u,".").concat(f)]||p[f]||d[f]||r;return n?o.createElement(g,i(i({ref:t},s),{},{components:n})):o.createElement(g,i({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=p;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},79443:function(e,t,n){var o=(0,n(67294).createContext)(void 0);t.Z=o},80944:function(e,t,n){var o=n(67294),a=n(79443);t.Z=function(){var e=(0,o.useContext)(a.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e}},30547:function(e,t,n){var o=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return o.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},49366:function(e,t,n){var o=n(67294),a=n(80944),r=n(86010);t.Z=function(e){var t,n=e.lazy,i=(e.block,e.defaultValue),l=e.values,u=e.groupId,c=(e.className,o.Children.toArray(e.children)),s=null!=l?l:c.map((function(e){return{value:e.props.value,label:e.props.label}})),d=null!=i?i:null==(t=c.find((function(e){return e.props.default})))?void 0:t.props.value,p=(0,a.Z)(),f=p.tabGroupChoices,g=p.setTabGroupChoices,m=(0,o.useState)(d),h=m[0],v=m[1];if(null!=u){var b=f[u];null!=b&&b!==h&&s.some((function(e){return e.value===b}))&&v(b)}var y=function(e){v(e),null!=u&&g(u,e)};return o.createElement("div",{className:"tabs-container"},o.createElement("div",{className:"sm:hidden"},o.createElement("label",{htmlFor:"tabs",className:"sr-only"},"Select a tab"),o.createElement("select",{id:"tabs",name:"tabs",value:h,onChange:function(e){return y(e.currentTarget.value)},className:"block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"},s.map((function(e){var t=e.value,n=e.label;return o.createElement("option",{value:t,key:t},null!=n?n:t)})))),o.createElement("div",{className:"hidden sm:block"},o.createElement("nav",{className:"flex space-x-4","aria-label":"Tabs"},s.map((function(e){var t=e.value,n=e.label;return o.createElement("button",{key:t,onClick:function(){return y(t)},className:(0,r.Z)(h===t?"bg-blue-100 text-blue-700":"text-gray-500 hover:text-gray-700","px-3 py-2 font-medium text-sm rounded-md"),"aria-current":h===t?"page":void 0},null!=n?n:t)})))),n?(0,o.cloneElement)(c.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):o.createElement("div",{className:"margin-vert--md"},c.map((function(e,t){return(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==h})}))))}},40357:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return c},metadata:function(){return d},toc:function(){return p}});var o=n(87462),a=n(63366),r=(n(67294),n(3905)),i=n(49366),l=n(30547),u=["components"],c={title:"Logout",sidebar_position:4},s=void 0,d={unversionedId:"guides/authentication/logout",id:"guides/authentication/logout",isDocsHomePage:!1,title:"Logout",description:"Logout",source:"@site/docs/guides/authentication/4-logout.mdx",sourceDirName:"guides/authentication",slug:"/guides/authentication/logout",permalink:"/pr-preview/pr-187/guides/authentication/logout",editUrl:"https://github.com/getditto/docs/edit/master/docs/guides/authentication/4-logout.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Logout",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Login and Refresh",permalink:"/pr-preview/pr-187/guides/authentication/login"},next:{title:"Manual Network Configuration",permalink:"/pr-preview/pr-187/guides/network"}},p=[{value:"Logout",id:"logout",children:[],level:2}],f={toc:p};function g(e){var t=e.components,n=(0,a.Z)(e,u);return(0,r.kt)("wrapper",(0,o.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"logout"},"Logout"),(0,r.kt)("p",null,"First, we need some sort of way to monitor the state of the login flow. This\nallows us to display a Logout button when the user has already logged in."),(0,r.kt)(i.Z,{groupId:"programming-language",defaultValue:"javascript",values:[{label:"JavaScript",value:"javascript"},{label:"Swift",value:"swift"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"let loggedIn = false\nif (auth0.isAuthenticated()) {\n  loggedIn = true\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"if (loggedIn) {\n  // render the logout button\n  <button onClick={onLogoutClick}>Logout</button>\n} else {\n  <button onClick={login}>Login</button>\n}\n")),(0,r.kt)("p",null,"And then we can write the logout function and attach it to the button."),(0,r.kt)("p",null,"We also recommend calling ",(0,r.kt)("inlineCode",{parentName:"p"},"ditto.auth.logout")," with a callback function that\nevicts any data from the local database. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function onLogoutClick() {\n  ditto.auth.logout(() => {\n    ditto.store.collection('cars').findAll().evict()\n  })\n  await auth0.logout({ returnTo: window.location.origin })\n}\n"))),(0,r.kt)(l.Z,{value:"swift",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},'class ProfileViewModel: ObservableObject {\n  //highlight-start\n  @Published private(set) var state = State.isLoading\n\n  enum State {\n      case isLoading\n      case loaded(UserInfo)\n  }\n  //highlight-end\n\n}\n\nstruct ContentView: View {\n    @ObservedObject var viewModel: ProfileViewModel = ProfileViewModel()\n    \n    var body: some View {\n       \n        switch viewModel.state {\n          case .isLoading:\n              Button("Login", action: viewModel.login)\n          case .loaded(let user):\n              Text(user.name ?? "Anonymous Ditto User")\n              Button("Logout", action: viewModel.logout)\n          }\n    \n        Text("Cars:" + String(viewModel.docs.count))\n        \n    }\n}\n')),(0,r.kt)("p",null,"And then we can write the logout function and attach it to the button."),(0,r.kt)("p",null,"We also recommend calling ",(0,r.kt)("inlineCode",{parentName:"p"},"ditto.auth.logout")," with a callback function that\nevicts any data from the local database. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-swift"},'class ProfileViewModel: ObservableObject {\n  ...\n  \n  func logout () {\n      Auth0\n          .webAuth()\n          .clearSession(federated: false) { result in\n              if result {\n                  if (self.ditto != nil) {\n                    // Clean up the cars collection after logout\n                    // highlight-start\n                      self.ditto!.auth?.logout(cleanup: { ditto in\n                          ditto.store.collection("cars").findAll().evict()\n                      })\n                    // highlight-end\n                  }\n                  self.state = State.isLoading\n              }\n          }\n  }\n  \n}\n\n')))),(0,r.kt)("p",null,"\ud83c\udf89 You now have a fully functioning ",(0,r.kt)("inlineCode",{parentName:"p"},"onlineWithAuthentication")," app. Build and\nrun it on a device."),(0,r.kt)("p",null,"For the full application code in React and iOS, see the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/getditto/samples/tree/master/authentication"},"code samples on GitHub"),"."))}g.isMDXComponent=!0},86010:function(e,t,n){function o(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=o(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function a(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=o(e))&&(a&&(a+=" "),a+=t);return a}n.d(t,{Z:function(){return a}})}}]);