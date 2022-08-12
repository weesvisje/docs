"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2247],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=l(n),d=r,m=h["".concat(c,".").concat(d)]||h[d]||p[d]||i;return n?o.createElement(m,a(a({ref:t},u),{},{components:n})):o.createElement(m,a({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},45466:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return c},default:function(){return h},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return u}});var o=n(87462),r=n(63366),i=(n(67294),n(3905)),a=["components"],s={title:"Api Key",sidebar_position:1},c=void 0,l={unversionedId:"common/security/apikey",id:"common/security/apikey",isDocsHomePage:!1,title:"Api Key",description:"Ditto\u2019s \u201cOnline with Authentication\u201d workflow provides all the tools needed to implement API token authentication. Our implementation guide as follows:",source:"@site/docs/http/common/security/apikey.md",sourceDirName:"common/security",slug:"/common/security/apikey",permalink:"/http/common/security/apikey",editUrl:"https://github.com/getditto/docs/tree/main/docs/http/common/security/apikey.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Api Key",sidebar_position:1},sidebar:"docs",previous:{title:"Map",permalink:"/http/common/datamodel/map"},next:{title:"OAuth",permalink:"/http/common/security/auth0"}},u=[],p={toc:u};function h(e){var t=e.components,n=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Ditto\u2019s \u201cOnline with Authentication\u201d workflow provides all the tools needed to implement API token authentication. Our implementation guide as follows:"),(0,i.kt)("p",null,"Decide on a format for the API tokens. We suggest creating tokens that are made of two parts, a prefix and a secret. The first X number of characters will make the prefix and the last Y will be the secret. Users of the API token don't need to know about these two portions. They will only see it as one string. Splitting it into two parts helps us keep it secure while quick to look up.\nWhen stored at rest, the prefix will be used as an index to look up the record and the secret will be hashed with an algorithm like scrypt or PBKDF2. Similar approaches to protecting user passwords should also be applied to the secret portion of the key.\nThe database record for each API key should also include the permissions assigned to the key and a userID. For example, the API token 123456789 the record could look like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n   "prefix": "123",\n   "userID": "ETL API Key",\n   "secret" : hash(456789),\n   "permissions": { \u2026 }\n}\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"These records should be stored at rest in some type of datastore that belongs to the authentication webhook receiver. This could be anything. Postgres, SQLite, or even a secured immutable configuration file. It shouldn\u2019t be stored in the Ditto application the webhook is managing authentication for."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/http/common/security/online-with-authentication/"},"Now it is time to write an authentication webhook receiver. Documentation about how to do this can be found here.")),(0,i.kt)("li",{parentName:"ul"},"When a client attempts to authenticate using this API key it will be provided to the webhook in the token property of the webhook request."),(0,i.kt)("li",{parentName:"ul"},"The webhook receiver will take this token and use the first X characters to look up the API key\u2019s record."),(0,i.kt)("li",{parentName:"ul"},"Once the record is retrieved then the last Y characters of the provided API key can be hashed and compared to the stored hash."),(0,i.kt)("li",{parentName:"ul"},"If they match the client should be authenticated with the stored permissions and userID.")))}h.isMDXComponent=!0}}]);