"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9689],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=s(n),h=i,f=p["".concat(c,".").concat(h)]||p[h]||d[h]||a;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=p;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},79443:function(e,t,n){var r=(0,n(67294).createContext)(void 0);t.Z=r},80944:function(e,t,n){var r=n(67294),i=n(79443);t.Z=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e}},30547:function(e,t,n){var r=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,i=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},49366:function(e,t,n){var r=n(67294),i=n(80944),a=n(86010);t.Z=function(e){var t,n=e.lazy,l=(e.block,e.defaultValue),o=e.values,c=e.groupId,s=(e.className,r.Children.toArray(e.children)),u=null!=o?o:s.map((function(e){return{value:e.props.value,label:e.props.label}})),d=null!=l?l:null==(t=s.find((function(e){return e.props.default})))?void 0:t.props.value,p=(0,i.Z)(),h=p.tabGroupChoices,f=p.setTabGroupChoices,m=(0,r.useState)(d),y=m[0],v=m[1];if(null!=c){var k=h[c];null!=k&&k!==y&&u.some((function(e){return e.value===k}))&&v(k)}var b=function(e){v(e),null!=c&&f(c,e)};return r.createElement("div",{className:"tabs-container"},r.createElement("div",{className:"sm:hidden"},r.createElement("label",{htmlFor:"tabs",className:"sr-only"},"Select a tab"),r.createElement("select",{id:"tabs",name:"tabs",value:y,onChange:function(e){return b(e.currentTarget.value)},className:"block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"},u.map((function(e){var t=e.value,n=e.label;return r.createElement("option",{value:t,key:t},null!=n?n:t)})))),r.createElement("div",{className:"hidden sm:block"},r.createElement("nav",{className:"flex space-x-4","aria-label":"Tabs"},u.map((function(e){var t=e.value,n=e.label;return r.createElement("button",{key:t,onClick:function(){return b(t)},className:(0,a.Z)(y===t?"bg-blue-100 text-blue-700":"text-gray-500 hover:text-gray-700","px-3 py-2 font-medium text-sm rounded-md"),"aria-current":y===t?"page":void 0},null!=n?n:t)})))),n?(0,r.cloneElement)(s.filter((function(e){return e.props.value===y}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},s.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==y})}))))}},5088:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return c},default:function(){return p},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return u}});var r=n(87462),i=n(63366),a=(n(67294),n(3905)),l=(n(49366),n(30547),["components"]),o={title:"Certificate Based Security",sidebar_position:10},c=void 0,s={unversionedId:"how-it-works/certificate-security",id:"how-it-works/certificate-security",isDocsHomePage:!1,title:"Certificate Based Security",description:"This section contains an advanced discussion of Ditto's underlying certificate, identity, and",source:"@site/docs/how-it-works/certificate-security.mdx",sourceDirName:"how-it-works",slug:"/how-it-works/certificate-security",permalink:"/pr-preview/pr-217/how-it-works/certificate-security",editUrl:"https://github.com/getditto/docs/edit/master/docs/how-it-works/certificate-security.mdx",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Certificate Based Security",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Mesh Network",permalink:"/pr-preview/pr-217/how-it-works/mesh-network"},next:{title:"Big Peer",permalink:"/pr-preview/pr-217/how-it-works/big-peer"}},u=[{value:"Identities",id:"identities",children:[],level:2},{value:"Certificate",id:"certificate",children:[],level:2},{value:"App-level Security",id:"app-level-security",children:[],level:2}],d={toc:u};function p(e){var t=e.components,n=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"This section contains an advanced discussion of Ditto's underlying certificate, identity, and\nencryption implementation. Most readers can skip this section.  However, if you are deploying an enterprise\non-premises deployment of Ditto, you may be required to reference the following\nmaterial.  "))),(0,a.kt)("p",null,"All communications are consistently protected by modern and robust encryption\nfor all of Ditto's communication methods. Cryptographically-signed business\nrules ensure users can only sync data that they are permitted to access. The app\ndeveloper is in complete control of the keys, certificates, and rules."),(0,a.kt)("p",null,"The Ditto Big Peer provisions signed x509 certificate. This certificate may then\nbe presented to other Ditto peers to mutually establish trust and create\nencrypted communications channels. "),(0,a.kt)("p",null,"The following details information about the certificates used to encrypt the\ncommunication channels."),(0,a.kt)("table",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Capability"),(0,a.kt)("th",null,"Type")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Encryption"),(0,a.kt)("td",null,"TLS 1.3")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Authentication"),(0,a.kt)("td",null,"EC keypairs with signed certificates")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Trust infrastructure"),(0,a.kt)("td",null,"X.509 with a developer-controlled certificate authority")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Access Rules"),(0,a.kt)("td",null,"Query patterns on Document _id's describing read and or write access"))),(0,a.kt)("h2",{id:"identities"},"Identities"),(0,a.kt)("p",null,"An identity is a bundle of device and app-specific information:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Site ID - A number unique to this device."),(0,a.kt)("li",{parentName:"ul"},"App Name - A name identifying the application. This avoids different Ditto-enabled apps trying to sync with each other. These are unique identifiers, for example, ",(0,a.kt)("inlineCode",{parentName:"li"},"5322afcd-5a70-43a3-bc2d-85d98ccf5ac0")),(0,a.kt)("li",{parentName:"ul"},"Access Rules - Define which documents this device is allowed to read or write during sync."),(0,a.kt)("li",{parentName:"ul"},"Private Key - A secret for authenticating as this identity."),(0,a.kt)("li",{parentName:"ul"},"Identity Certificate - A certificate verifying the particulars of this device, signed by the CA."),(0,a.kt)("li",{parentName:"ul"},"CA Certificate - Used to verify certificates presented by other devices with the same app.")),(0,a.kt)("table",null,(0,a.kt)("tr",null,(0,a.kt)("th",null),(0,a.kt)("th",null,"Production"),(0,a.kt)("th",null,"Development")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Site ID"),(0,a.kt)("td",null,"Allocated by central authority"),(0,a.kt)("td",null,"Defaults to a random number; can be customized")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"App ID"),(0,a.kt)("td",null,"Set by central authority"),(0,a.kt)("td",null,'For example, "5322afcd-5a70-43a3-bc2d-85d98ccf5ac0"')),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Access Rules"),(0,a.kt)("td",null,"Set by central authority"),(0,a.kt)("td",null,"All devices may read/write all documents")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Private Key"),(0,a.kt)("td",null,"Either generated on device, or distributed by central authority"),(0,a.kt)("td",null,"Hard-coded and shared by all devices")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"Identity Certificate"),(0,a.kt)("td",null,"Unique and signed by central authority; contains this device's public key"),(0,a.kt)("td",null,"Hard-coded and shared by all devices")),(0,a.kt)("tr",null,(0,a.kt)("td",null,"CA Certificate"),(0,a.kt)("td",null,"Shared by all users of the same app"),(0,a.kt)("td",null,"Hard-coded and shared by all devices")),(0,a.kt)("table",null)),(0,a.kt)("h2",{id:"certificate"},"Certificate"),(0,a.kt)("p",null,"Ditto identities and public keys are distributed in the standard X.509\ncertificate format. By default, these are distributed through the Ditto Portal.\nThey do not directly contain potentially sensitive data such as access rules,\nbut these can be defined by an authentication webhook with the\n",(0,a.kt)("a",{parentName:"p",href:"/security/designing-permissions"},"OnlineWithAuthentication identity"),", or by the\ndeveloper through the ",(0,a.kt)("inlineCode",{parentName:"p"},"Manual")," identity."),(0,a.kt)("p",null,"When you are ready to use production identities, feel free to contact\nus through the Ditto Portal and we will help you set up the right CA\ntooling for your use case - or provide specifications so you can build your own."),(0,a.kt)("h2",{id:"app-level-security"},"App-level Security"),(0,a.kt)("p",null,"The access rules contained in the identity are rigid, signed by the central\ncertificate authority, and enforced by all participating devices. This offers\nthe highest level of security. If a person is not allowed to access particular\ndata, it will never be synced to their device."),(0,a.kt)("p",null,"For apps with weaker security requirements, a developer may choose to relax the\naccess rules for Ditto, then restrict access in their application code."),(0,a.kt)("p",null,"One advantage is that the developer has more flexibility to change the access\nrules dynamically, since they are not encoded in signed certificates. Another\nadvantage is that all devices in the mesh can participate in syncing the data,\nwhich may help it propagate faster. If certain data is only accessible to a few\nprivileged devices which are not often in range of each other, it will take\nlonger for them to sync."),(0,a.kt)("p",null,"The disadvantage is that an unprivileged user does have a device containing\nprivileged data. A technically savvy user or phone thief may be able to gain\naccess to not only their regular data, but also the more privileged data that\nthey were never intended to be able to view."),(0,a.kt)("p",null,"Therefore relaxed access rules - app-level security - are only suitable for\nenvironments where there is a degree of trust that the devices won't end up\nunlocked in the wrong hands."))}p.isMDXComponent=!0},86010:function(e,t,n){function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);