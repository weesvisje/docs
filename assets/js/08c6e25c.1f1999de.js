"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7105],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=s(n),m=i,h=c["".concat(p,".").concat(m)]||c[m]||u[m]||o;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var s=2;s<o;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},64634:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return p},default:function(){return c},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return d}});var a=n(87462),i=n(63366),o=(n(67294),n(3905)),r=["components"],l={},p="2.0 Migration Guide",s={unversionedId:"v2",id:"v2",isDocsHomePage:!1,title:"2.0 Migration Guide",description:"We have heard and appreciate all of the feedback we've gotten over the past",source:"@site/docs/common/v2.md",sourceDirName:".",slug:"/v2",permalink:"/common/v2",editUrl:"https://github.com/getditto/docs/edit/main/docs/common/v2.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Troubleshooting",permalink:"/common/troubleshooting"}},d=[{value:"Android permissions",id:"android-permissions",children:[],level:2},{value:"Explicit types",id:"explicit-types",children:[{value:"Counter",id:"counter",children:[],level:3},{value:"DittoRegister",id:"dittoregister",children:[],level:3},{value:"Updating a Register",id:"updating-a-register",children:[],level:3},{value:"HTTP API",id:"http-api",children:[{value:"Example",id:"example",children:[],level:4}],level:3}],level:2},{value:"CDC",id:"cdc",children:[],level:2},{value:"Growable arrays",id:"growable-arrays",children:[],level:2},{value:"<code>insert</code>",id:"insert",children:[],level:2},{value:"Write strategy",id:"write-strategy",children:[],level:2},{value:"Sync limits",id:"sync-limits",children:[],level:2},{value:"Forward-compatibility with concurrent types",id:"forward-compatibility-with-concurrent-types",children:[],level:2},{value:"JavaScript changes",id:"javascript-changes",children:[{value:"Accessing document content",id:"accessing-document-content",children:[],level:3},{value:"Updating document content",id:"updating-document-content",children:[],level:3}],level:2}],u={toc:d};function c(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"20-migration-guide"},"2.0 Migration Guide"),(0,o.kt)("p",null,"We have heard and appreciate all of the feedback we've gotten over the past\nyear, and it is very clear: Ditto is maturing and developers want to build more\ncomplex applications. To do that, Ditto needs to expose more of the internal\nfunctionality so that developers have more flexibility and control. Ditto 2.0 is\nthe first step in that direction."),(0,o.kt)("p",null,"This is a migration guide that covers the most substantial changes that will\naffect most users. For a comprehensive list of all deprecated and removed\nmethods, see the ",(0,o.kt)("a",{parentName:"p",href:"/changelog"},"changelog"),"."),(0,o.kt)("h2",{id:"android-permissions"},"Android permissions"),(0,o.kt)("p",null,"On Android, permissions have changed. Remove ",(0,o.kt)("inlineCode",{parentName:"p"},'android:maxSdkVersion="30"')," from ",(0,o.kt)("inlineCode",{parentName:"p"},"ACCESS_FINE_LOCATION")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"ACCESS_COARSE_LOCATION"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />\n    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />\n')),(0,o.kt)("h2",{id:"explicit-types"},"Explicit types"),(0,o.kt)("p",null,"Types can now be made explicit. Ditto 2.0 introduces ",(0,o.kt)("inlineCode",{parentName:"p"},"DittoRegister")," and\n",(0,o.kt)("inlineCode",{parentName:"p"},"Counter")," as the first step:"),(0,o.kt)("h3",{id:"counter"},"Counter"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"replaceWithCounter")," is deprecated. Instead, use ",(0,o.kt)("inlineCode",{parentName:"li"},"DittoCounter()")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"increment(double)")),(0,o.kt)("li",{parentName:"ul"},"Counters always start at 0")),(0,o.kt)("p",null,"Counters are always initialized with no parameters in the constructor. This is\nto encourage all mutations to happen within an ",(0,o.kt)("inlineCode",{parentName:"p"},"update")," clause. This helps\nbehavior be more clear -- if you want to have a mutable type, you need to mutate\nthem using the methods available for that type."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let id = collection.upsert({\n  seat: '16c',\n  drinks: DittoCounter(),\n})\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"collection.findById(id).update(doc => {\n  doc.drinks.increment(1)\n})\n")),(0,o.kt)("h3",{id:"dittoregister"},"DittoRegister"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Added ",(0,o.kt)("inlineCode",{parentName:"li"},"DittoRegister")," to explicitly create Registers"),(0,o.kt)("li",{parentName:"ul"},"Added Map and Array to the list of valid register types")),(0,o.kt)("p",null,"Map and Array are now valid register types. We call these ",(0,o.kt)("em",{parentName:"p"},"Complex Registers"),".\nComplex Registers allow you to query and access data as their fundamental type.\nFor example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'collection.find("array[0] == 1")\ncollection.find("map[\'b\'] == \'c\'")\n\ncoll.findByID(docID).update({ mutDoc in\n  let one = mutDoc["array"][0]\n}\n')),(0,o.kt)("p",null,"However, updating a complex register is last writer wins for the entire type,\nsimilar to a string or number. These types are useful for pulling data into\nDitto from external databases, where Ditto is rarely modifying that data\ninternally."),(0,o.kt)("p",null,"All of the following are valid uses of ",(0,o.kt)("inlineCode",{parentName:"p"},"DittoRegister")," type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'let content: [String: Any?] = [\n    "string": DittoRegister(value: "string in register"),\n    "integer": DittoRegister(value: 123),\n    "float": DittoRegister(value: 4.56),\n    "bool": DittoRegister(value: false),\n    "nested": [\n        "inner": DittoRegister(value: "simple")\n    ],\n    "array": DittoRegister(value: [1, 2, 3]),\n    "complex_array": DittoRegister(value: [[[["a": 42]]]]),\n    "map": DittoRegister(value: ["b": "c"]),\n    "complex_map": DittoRegister(value: ["d": ["e": ["f": [["four": 4, "five": 5]]]]])\n]\n\nlet docID = try! collection.upsert(content)\n')),(0,o.kt)("p",null,"All supported ",(0,o.kt)("inlineCode",{parentName:"p"},"DittoRegister")," types are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"String"),(0,o.kt)("li",{parentName:"ul"},"Numbers (Int, Float, etc)"),(0,o.kt)("li",{parentName:"ul"},"Boolean"),(0,o.kt)("li",{parentName:"ul"},"null"),(0,o.kt)("li",{parentName:"ul"},"Binary"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Map")," (new Complex Register)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Array")," (new Complex Register)")),(0,o.kt)("h3",{id:"updating-a-register"},"Updating a Register"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Only use ",(0,o.kt)("inlineCode",{parentName:"li"},"set(value)")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"remove()")," a Register. Registers cannot be partially\nupdated.")),(0,o.kt)("p",null,"For example, say you have a document that contains complex content that inserted\nfrom a legacy database, where all values are registers. To modify a register:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'coll.findByID(docID).update(mutDoc => {\n  // This is ok. Retrieves the data at an index\n  let one = mutDoc["array"][0]\n\n  // To update the array\n  let newArray = mutDoc["array"]\n  newArray[0] = "foo \\(one)"\n  // To update the value\n  mutDoc["array"].set(DittoRegister(value: newArray))\n})\n')),(0,o.kt)("p",null,"You can also update registers using ",(0,o.kt)("inlineCode",{parentName:"p"},"upsert")," but you must not forget to always\nwrap your new value with ",(0,o.kt)("inlineCode",{parentName:"p"},"DittoRegister()"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'coll.upsert({\n  "map": DittoRegister(value: newMap)\n})\n')),(0,o.kt)("p",null,"The following example code will change the type of your register to a map. Do\nnot do this."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'coll.findByID(docID).update(mutDoc => {\n  // This is not ok. You should not modify a register at an index or path.\n  // You will lose any concurrent updates and the type will change.\n  mutDoc["complex_map"]["d"]["e"] = "bananas"\n}\n')),(0,o.kt)("h3",{id:"http-api"},"HTTP API"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The HTTP API will support explicit types through the ",(0,o.kt)("inlineCode",{parentName:"li"},"/api/v2/store/[method]")," endpoint."),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"/api/v1/store")," endpoint is deprecated, and will become unsupported in\nDitto 3.0.")),(0,o.kt)("p",null,"To create and modify a Register Array, Register Map, or Counter in the HTTP API\nfor v2, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"/api/v2/store/[method]")," endpoint and annotate the value with the type\nyou intend to use."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Endpoints")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"/api/v2/store/write")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"/api/v2/store/find")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"/api/v2/store/findbyid"))),(0,o.kt)("h4",{id:"example"},"Example"),(0,o.kt)("p",null,"A full example with ",(0,o.kt)("inlineCode",{parentName:"p"},"curl")," that shows how to use the HTTP API to create explicit\ntypes. In this example, we create a ",(0,o.kt)("inlineCode",{parentName:"p"},"friends")," key with a Register that is an\narray, and ",(0,o.kt)("inlineCode",{parentName:"p"},"orderCount")," which is a counter."),(0,o.kt)("p",null,"We use the ",(0,o.kt)("inlineCode",{parentName:"p"},"counter")," override by adding the following key to the payload:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'"valueTypeOverrides": {\n  "orderCount": "counter",\n  "friends": "register"\n}\n')),(0,o.kt)("p",null,"In v2, Arrays are registers by default. That means you do not need to add\n",(0,o.kt)("inlineCode",{parentName:"p"},"register")," to the ",(0,o.kt)("inlineCode",{parentName:"p"},"valueTypeOverrides")," payload, but you can if you want to be\nexplicit."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'curl -X POST \'https://{app_id}.cloud.ditto.live/api/v2/store/write\' \\\n  --header \'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==\' \\\n  --header \'Content-Type: application/json\' \\\n  --data-raw \'{\n      "commands": [{\n        "method": "upsert",\n        "collection": "people",\n        "id": "123abc",\n        "value": {\n          "name": "John",\n          "friends": ["Susan"],\n          "orderCount": 5\n        },\n        "valueTypeOverrides": {\n          "orderCount": "counter"\n        }\n      }]\n  }\'\n')),(0,o.kt)("p",null,"To find this document you can use ",(0,o.kt)("inlineCode",{parentName:"p"},"/api/v2/store/findbyid"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"curl --location --request POST '483acae0-035a-43f2-afa9-2d28239ad721.cloud.ditto.live/api/v2/store/findbyid' \\\n--header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \\\n--header 'Content-Type: application/json' \\\n--data-raw '{\n  \"collection\": \"people\",\n  \"id\": \"123abc\"\n}'\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n  "collection": "people",\n  "id": "123abc"\n}\n')),(0,o.kt)("p",null,"Optionally, When you query for this data using ",(0,o.kt)("inlineCode",{parentName:"p"},"/api/v2/store/find"),", you can use the key ",(0,o.kt)("inlineCode",{parentName:"p"},"serializedAs: latestValuesAndTypes")," to receive a response with each\ntype specified:"),(0,o.kt)("p",null,"Request:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'curl -X POST \'https://{app_id}.cloud.ditto.live/api/v2/store/find\' \\\n  --header \'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==\' \\\n  --header \'Content-Type: application/json\' \\\n  --data-raw \'{\n    "collection": "people",\n    "query": "name==\'John\'",\n    "limit": 2,\n    "serializedAs": "latestValuesAndTypes"\n}\'\n')),(0,o.kt)("p",null,"Response: "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "value": {\n    "_id": "123abc",\n    "fields": {\n      "name": {\n          "register": { "value": "John" },\n      },\n      "friends": {\n          "register": { "value": ["Susan"] },\n      },\n      "orderCount": {\n          "counter": { "value": 5 }\n      },\n    }\n  }\n}\n')),(0,o.kt)("h2",{id:"cdc"},"CDC"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"This feature is only available on Dedicated Clusters")),(0,o.kt)("p",null,"If you're using Ditto's CDC (Change Data Capture), such as a Kafka connector,\nyou can upgrade to a ",(0,o.kt)("inlineCode",{parentName:"p"},"v2")," topic to start getting information about explicit\ntypes. For example, if you create a ",(0,o.kt)("inlineCode",{parentName:"p"},"DittoRegister")," using Ditto v2, you'll get a\ntype annotation similar to the HTTP response. Contact your support engineer for\nmore information."),(0,o.kt)("h2",{id:"growable-arrays"},"Growable arrays"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"https://docs.ditto.live/android/common/datamodel/array"},"Growable Array"),"\nis deprecated."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},".push()")," and ",(0,o.kt)("inlineCode",{parentName:"li"},".pop()")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"array[index].remove()")," are deprecated.")),(0,o.kt)("p",null,"RGAs will be entirely unsupported in Ditto 3.0, so it is important that you\nstart migrating away from using Growable Arrays and start using a\n",(0,o.kt)("a",{parentName:"p",href:"#dittoregister"},"DittoRegister")," or a ",(0,o.kt)("a",{parentName:"p",href:"../datamodel/map/"},"Map")," instead."),(0,o.kt)("p",null,"We may bring back the Growable Array in 2023 for text editing. However, we do\nnot see the demand for Growable Arrays right now, so we decided to deprecate it\nfor the time being. Please reach out through the help center on the bottom right\nof your screen if you are interested in Growable Arrays. We would love to hear\nabout your use case."),(0,o.kt)("h2",{id:"insert"},(0,o.kt)("inlineCode",{parentName:"h2"},"insert")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"insert")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"insertWithStrategy")," have been removed from the ",(0,o.kt)("inlineCode",{parentName:"p"},"Collection")," type.\nYou should instead use ",(0,o.kt)("inlineCode",{parentName:"p"},"upsert")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"upsert_with_strategy"),"."),(0,o.kt)("p",null,"If you were previously providing a document identifier to an ",(0,o.kt)("inlineCode",{parentName:"p"},"insert")," call then\nyou should instead provide it to the ",(0,o.kt)("inlineCode",{parentName:"p"},"upsert")," call by specifying it under an\n",(0,o.kt)("inlineCode",{parentName:"p"},"_id")," key at the root of the value passed to the ",(0,o.kt)("inlineCode",{parentName:"p"},"upsert")," call."),(0,o.kt)("h2",{id:"write-strategy"},"Write strategy"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Ditto 2.0 will remove support for the ",(0,o.kt)("inlineCode",{parentName:"li"},"overwrite")," write strategy.")),(0,o.kt)("h2",{id:"sync-limits"},"Sync limits"),(0,o.kt)("p",null,"In 1.x ",(0,o.kt)("inlineCode",{parentName:"p"},"findAll().limit(10)")," would not limit replication by default. This would\ncause small peers to crash if they accidentally pulled down more data from the\nBig Peer than their platform or hardware could handle."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"veryLargeCollection.findAll().limit(10).observe(callback) // CRASH!!!!\n")),(0,o.kt)("p",null,"In the 2.0, ",(0,o.kt)("inlineCode",{parentName:"p"},"limit(10)")," will only replicate 10 documents as expected."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"veryLargeCollection.findAll().limit(10).observe(callback) // OK\n")),(0,o.kt)("h2",{id:"forward-compatibility-with-concurrent-types"},"Forward-compatibility with concurrent types"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"It is valid to use multiple types concurrently at the same document path.")),(0,o.kt)("p",null,"Distributed applications typically only add new fields and never remove or\nmodify existing fields in production. Despite these validation code paths, bugs\nhappen. It could be possible to have a version of your application that changed\nthe type of a field that an older application version is using. This would break\nthe ",(0,o.kt)("em",{parentName:"p"},"forward-compatibility")," of your software. This could cause a crash in\nproduction if an application version is expecting a different shape to your\ndata."),(0,o.kt)("p",null,"If this happens, Ditto 2.0's concurrent types ensure that data is never lost and\nthat old code can still work with new data. Devices can always access all types\nthat have been added to a particular field. Ditto does its best to preserve\ndata, even if the type was changed by another, incompatible version of your\napplication. This feature allows you to more easily build forward-compatibile\napplications."),(0,o.kt)("p",null,"It is another tool that Ditto gives you so that you can manage schema changes\nmore robustly, and reduce the chance of data loss or crashes in production."),(0,o.kt)("p",null,"Device A"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'try! coll.upsert(["edited_by": "john"])\n')),(0,o.kt)("p",null,"Device B"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'try! coll.upsert(["edited_by": ["timestamp": 16827219234, "user_id": "abc123"])\n')),(0,o.kt)("p",null,"After syncronization"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-swift"},'const doc = coll.findByID(docID)\ndoc["edited_by"].value // latest timestamp: ["timestamp": ..., "user_id": ...]\ndoc["edited_by"].dictionaryValue // ["timestamp": ..., "user_id": ...]\ndoc["edited_by"].stringValue // "john"\n')),(0,o.kt)("h2",{id:"javascript-changes"},"JavaScript changes"),(0,o.kt)("p",null,"The JS document API changes substantially with Ditto v2. In v1, we've proxied\ninstances of ",(0,o.kt)("inlineCode",{parentName:"p"},"Document")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MutableDocument")," allowing us to make accessing and\nupdating contents of a document feel as simple as manipulating a regular\nJavaScript object."),(0,o.kt)("p",null,'This "magic", however, led to many edge cases, inconsistencies, and confusion.\nTogether with the introduction of explicit CRDT types in v2, we\'ve taken the\nopportunity and redesigned the JS document API to be more explict and align with\nthe APIs of the other Ditto SDKs.'),(0,o.kt)("h3",{id:"accessing-document-content"},"Accessing document content"),(0,o.kt)("p",null,"To access and update the contents of a document, you'll now mainly interact with\n",(0,o.kt)("inlineCode",{parentName:"p"},"DocumentPath")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MutableDocumentPath")," instances directly. Given a document,\nyou can get the corresponding path object via the ",(0,o.kt)("inlineCode",{parentName:"p"},".path")," property:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const collection = ditto.store.collection('abc')\nconst document = await collection.findByID('123')\nconst path = await document.path\n")),(0,o.kt)("p",null,"This ",(0,o.kt)("inlineCode",{parentName:"p"},"path")," instance represents the document content at the root. With that, you\ncan access a property at a specific key-path via the ",(0,o.kt)("inlineCode",{parentName:"p"},"at()")," method, which yields\nanother path instance representing the document content at that key-path:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// Both are equivalent, the latter is a little more efficient:\nconst pathDeepDown1 = document.path.at('deep').at('down')\nconst pathDeepDown2 = document.path.at('deep.down')\n")),(0,o.kt)("p",null,"Since this is so common, ",(0,o.kt)("inlineCode",{parentName:"p"},"Document")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MutableDocument")," offer a convenience\nmethod ",(0,o.kt)("inlineCode",{parentName:"p"},"at()"),", which is equivalent to ",(0,o.kt)("inlineCode",{parentName:"p"},"path.at()"),", so the above becomes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const pathDeepDown3 = document.at('deep.down')\n")),(0,o.kt)("p",null,"With that, we can now access the ",(0,o.kt)("inlineCode",{parentName:"p"},"value")," of a property at a given key-path,\nregardless of the underlying CRDT type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const name = document.at('deep.down.name').value\n")),(0,o.kt)("p",null,"Or the value for a specific CRDT type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const name = document.at('deep.down.name').register.value\nconst count = document.at('deep.down.count').counter.value\nconst count = document.at('deep.down.elements').rga.value\n// ...\n")),(0,o.kt)("h3",{id:"updating-document-content"},"Updating document content"),(0,o.kt)("p",null,"There are only 2 update operations accessible via a ",(0,o.kt)("inlineCode",{parentName:"p"},"MutableDocumentPath"),"\nobject: ",(0,o.kt)("inlineCode",{parentName:"p"},"set()")," & ",(0,o.kt)("inlineCode",{parentName:"p"},"remove()"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"set()")," allows you to create a property with a\nspecific CRDT type, while ",(0,o.kt)("inlineCode",{parentName:"p"},"remove()")," allows you to remove that property:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"await collection.findByID('123').update((mutableDocument) => {\n  mutableDocument.at('some.new.name').set(new Register(''))\n  mutableDocument.at('some.existing.property').remove()\n})\n")),(0,o.kt)("p",null,"All other mutations, i.e. updating the value of an existing property, must be\nperformed via the operations offered by the corresponding (mutable) CRDT type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"await collection.findByID('123').update((mutableDocument) => {\n  mutableDocument.at('deep.down.name').register.set('Peter Pan')\n  mutableDocument.at('deep.down.count').counter.increment(456)\n\n  mutableDocument.at('deep.down.elements').rga.insertAt('some-element-789', 1)\n  mutableDocument.at('deep.down.elements').rga.removeAt(0)\n  mutableDocument.at('deep.down.elements').rga.push('some-element-abc')\n  const last = mutableDocument.at('deep.down.elements').rga.pop()\n  // ...\n})\n")))}c.isMDXComponent=!0}}]);