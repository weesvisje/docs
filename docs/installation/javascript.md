---
title: 'JavaScript'
sidebar_position: 1
---

# JavaScript Installation Instructions

Ditto's JavaScript SDK can run either in the browser, NodeJS, or Electron environments. React Native support is currently under development. For more information about browser support or NodeJS and Electron support [click here.](../reference/supported-platforms)

1. Add the JS package with either npm or yarn.

```
npm install --save @dittolive/ditto
# or with yarn
yarn add @dittolive/ditto
```

2. Once you make sure the ditto.wasm file is served properly, you can import it like any other NPM package in your source and start using it:

```js
import { init, Ditto } from '@dittolive/ditto'

(async () => {
  await init() // you need to call this at least once before calleding `new Ditto`
  const identity = { type: 'development', appName: 'com.example.ditto', siteID: BigInt('123') }
  const ditto = new Ditto(identity, 'playground')
})()
```

## Important regarding browser setup

Notice the `init()` call above. Ditto is powered by a WebAssembly core when running in the browser. Because WebAssembly (.wasm) files bigger than 4 KB can only be loaded from a proper URL, Ditto won't work when imported from an HTML page opened locally. At least the Ditto JS files together with the ditto.wasm file need to be served via a web server. The ditto.wasm file needs to be located in the exact same location as the ditto.es6.js (or ditto.umd.js if you are using the UMD module). Note that bundlers combine everything into one main.js file (or similar). In that case you'll have to make sure the ditto.wasm file is copied to the same location. If you are using Webpack, take a look at our minimal Webpack example: getditto/ditto-js-example-webpack. You can also pass the location or the actual WebAssembly module explicitly to the init() function.