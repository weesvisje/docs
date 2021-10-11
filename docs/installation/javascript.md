---
title: 'JavaScript'
sidebar_position: 1
---

# JavaScript Installation Instructions

Ditto's JavaScript SDK can run either in the browser, NodeJS, or Electron environments. React Native support is currently under development. For more information about browser support or NodeJS and Electron support [click here.](/advanced/supported-platforms)

1. Add the JS package with either npm or yarn.

```
npm install --save @dittolive/ditto
# or with yarn
yarn add @dittolive/ditto
```

2. Import it like any other NPM package in your source and start using it:

```js
import { init, Ditto } from '@dittolive/ditto'

(async () => {
  await init() // you need to call this at least once before using any of the Ditto API
  const identity = { type: 'development', appName: 'com.example.ditto' }
  const ditto = new Ditto(identity, 'playground')
})()
```

## Important regarding browser setup

Notice the `init()` call above. Ditto is powered by a WebAssembly core when
running in the browser. By default, when running in the browser, Ditto will
fetch the corresponding WebAssembly file from the web. That same file is
contained within the NPM package under `web/ditto.wasm` so you can serve it
yourself. Simply make the file accessible somewhere on your server and pass the
URL to `init()`:

```js
import { init, Ditto } from '@dittolive/ditto'

(async () => {
  // Pass the URL to the ditto.wasm file:
  await init({ webAssemblyModule: 'https://my-app/assets/ditto.wasm' })

  // Then use Ditto as you normally would:
  const identity = { type: 'development', appID: 'live.ditto.playground' }
  const ditto = new Ditto(identity, 'playground')

  // ...
})
```

This may be useful for development or production environments without a
reliable internet connection. Make sure to properly configure the server to
return the correct MIME type (`application/wasm`) and the
[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
header if the `.wasm` file is served from a different domain. For production
environments, make sure to use compression (`gzip`) and proper caching headers.
