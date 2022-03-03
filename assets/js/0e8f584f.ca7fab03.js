"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5830],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return m}});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var l=a.createContext({}),c=function(t){var e=a.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=c(t.components);return a.createElement(l.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,l=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),d=c(n),m=r,k=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(k,i(i({ref:e},u),{},{components:n})):a.createElement(k,i({ref:e},u))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s.mdxType="string"==typeof t?t:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91396:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var a=n(87462),r=n(63366),o=(n(67294),n(3905)),i=["components"],s={title:"1 - Enabling Kafka"},l="Enabling Kafka",c={unversionedId:"tutorials/kafka/intro",id:"tutorials/kafka/intro",isDocsHomePage:!1,title:"1 - Enabling Kafka",description:"The document change stream is a coarse user-consumable Kafka queue that allows you to react to changes made as documents are inserted, updated, or deleted from Ditto's Big Peer. You should use this in conjunction with the HTTP API.  Ditto supports connecting to Kafka and retrieving updates and events for your data through a Kafka topic.",source:"@site/docs/tutorials/kafka/1-intro.md",sourceDirName:"tutorials/kafka",slug:"/tutorials/kafka/intro",permalink:"/tutorials/kafka/intro",editUrl:"https://github.com/getditto/docs/edit/master/docs/tutorials/kafka/1-intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"1 - Enabling Kafka"},sidebar:"tutorialSidebar",previous:{title:"2 - Ditto SDK Integration",permalink:"/tutorials/security/sdk-integration"},next:{title:"2 - Ditto events",permalink:"/tutorials/kafka/consumer"}},u=[{value:"Installing Kafka",id:"installing-kafka",children:[],level:2},{value:"Handling credentials",id:"handling-credentials",children:[],level:2},{value:"Simple test",id:"simple-test",children:[],level:2}],p={toc:u};function d(t){var e=t.components,s=(0,r.Z)(t,i);return(0,o.kt)("wrapper",(0,a.Z)({},p,s,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"enabling-kafka"},"Enabling Kafka"),(0,o.kt)("p",null,"The document change stream is a coarse user-consumable Kafka queue that allows you to react to changes made as documents are inserted, updated, or deleted from Ditto's Big Peer. You should use this in conjunction with the HTTP API.  Ditto supports connecting to Kafka and retrieving updates and events for your data through a Kafka topic. "),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The Kafka settings are only enabled if your Organization is on a dedicated cluster. Contact us if you are interested in this feature."))),(0,o.kt)("h2",{id:"installing-kafka"},"Installing Kafka"),(0,o.kt)("p",null,"If you aren't familiar with Kafka, first follow the instructions on ",(0,o.kt)("a",{parentName:"p",href:"https://kafka.apache.org/quickstart"},"Kafka Quickstart")," to try out basic Kafka locally. In this tutorial, we used scripts in the ",(0,o.kt)("inlineCode",{parentName:"p"},"bin")," directory of ",(0,o.kt)("inlineCode",{parentName:"p"},"kafka_2.13-3.1.0"),"."),(0,o.kt)("h2",{id:"handling-credentials"},"Handling credentials"),(0,o.kt)("p",null,'To connect to your Kafka instance, you need to have an SSL connection. In your organization page, click "Live Query Settings" and you will see the credentials for your cluster. Download the Cluster Certificate and User Certificate. Keep these files safe!'),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Organization Apps > Your App Name > Live Query Settings > Kafka Connection Data")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"kafka credentials",src:n(195).Z})),(0,o.kt)("p",null,"Here is how these authentication tokens match to the Kafka configuration:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null},"Ditto Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ssl.truststore.location")),(0,o.kt)("td",{parentName:"tr",align:null},"Cluster Certificate"),(0,o.kt)("td",{parentName:"tr",align:null},"The CA cert in PKCS12 format.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ssl.truststore.password")),(0,o.kt)("td",{parentName:"tr",align:null},"Cluster certificate password"),(0,o.kt)("td",{parentName:"tr",align:null},"The password used to decrypt the CA Cert value.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ssl.keystore.location")),(0,o.kt)("td",{parentName:"tr",align:null},"User Certificate"),(0,o.kt)("td",{parentName:"tr",align:null},"User cert in PKCS12 format.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ssl.keystore.password")),(0,o.kt)("td",{parentName:"tr",align:null},"User certificate password"),(0,o.kt)("td",{parentName:"tr",align:null},"The password used to decrypt the user cert.")))),(0,o.kt)("h2",{id:"simple-test"},"Simple test"),(0,o.kt)("p",null,"You can use the following bash script to test out your cluster. Replace each variable with the corresponding information displayed in your app's live query settings."),(0,o.kt)("p",null,"If it's working, you won't see any errors and the script will not shut down. Leave this script running in a terminal, and open a new terminal for the next section."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"CLUSTER_CERT_LOCATION=/path/to/cluster.p12\nCLUSTER_CERT_PW=<YOUR_CLUSTER_CERT_PASSWORD>\n\nUSER_CERT_LOCATION=/path/to/user.p12\nUSER_CERT_PW=<YOUR_USER_CERT_PASSWORD>\n\nCLOUD_ENDPOINT=<YOUR_ENDPOINT>\nTOPIC=<YOUR_TOPIC>\n\nKAFKA=/path/to/kafka_2.13-3.1.0\n\n$KAFKA/bin/kafka-console-consumer.sh \\\n --bootstrap-server $CLOUD_ENDPOINT \\\n --consumer-property security.protocol=SSL \\\n --consumer-property ssl.truststore.password=$CLUSTER_CERT_PW \\\n --consumer-property ssl.truststore.location=$CLUSTER_CERT_LOCATION \\\n --consumer-property ssl.keystore.password=$USER_CERT_PW \\\n --consumer-property ssl.keystore.location=$USER_CERT_LOCATION \\\n --group $TOPIC \\\n --topic $TOPIC \n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The Kafka ",(0,o.kt)("inlineCode",{parentName:"p"},"Group")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Topic")," should both be set to the same string displayed in the Ditto portal."))))}d.isMDXComponent=!0},195:function(t,e,n){e.Z=n.p+"assets/images/kafka-browser-fc06d4e4570b17e09d3b114112159160.png"}}]);