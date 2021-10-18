---
title: "Loading the JavaScript ditto.wasm File"
---

Unlike most JavaScript libraries, Ditto's JavaScript runs as a WebAssembly module in the browser environment. WebAssembly modules have to be loaded asynchronously. Thus, before you call any of the Ditto API's, you must call `await init()` at least once in your application. Preferably, you should call this early in the entry point of your application. 

```js
import { init, Ditto } from '@dittolive/ditto'

(async () => {
  await init() // you need to call this at least once before using any of the Ditto API
  const identity = { type: 'onlinePlayground', appID: 'com.example.ditto' }
  const ditto = new Ditto(identity, '/playground')
})()
```

By default, `init()` will asynchronously download the underlying WebAssembly module from our CDN. Once this is complete, then you can use Ditto APIs. Note, if you call `init()` in a NodeJS or Electron app, nothing will happen since the runtime will use a native binary.

## Customizing a URL of a `ditto.wasm` file. 

There are times where your application may not have access to the CDN and needs the `.wasm` file from another location. Once you've ran `npm install @dittolive/ditto`, we've already included a copy of `ditto.wasm` in the `node_modules/@dittolive/ditto` directory. It's up to you if you'd like to host it on your own server or load it from a local static directory. 

You can customize the URL of the `ditto.wasm` file like so:

```js
import { init, Ditto } from '@dittolive/ditto'

(async () => {
  // Pass the URL to the ditto.wasm file:
  await init({ webAssemblyModule: 'https://my-app/assets/ditto.wasm' })
  // Then use Ditto as you normally would:
  const identity = { type: 'development', appID: 'live.ditto.playground' }
  const ditto = new Ditto(identity, '/playground')
  // ...
})
```

:::caution

Make sure to properly configure the server to
return the correct MIME type (`application/wasm`) and the
[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
header if the `.wasm` file is served from a different domain. For production
environments, make sure to use compression (`gzip`) and proper caching headers.

:::