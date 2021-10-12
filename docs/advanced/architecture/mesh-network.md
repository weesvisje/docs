---
title: "Mesh Network"
sidebar_position: 2
---

When you use Ditto in your app you don’t have to think about how your devices will connect to each other. A device like an iPhone will build an interconnected mesh all on its own. As soon as you call `tryStartSync()` it fires up Bluetooth LE, scans for peers on the WiFi, and activates AWDL to create high-speed connections with nearby Apple devices—all this with one line of code.

<img src={require("./diagram1_basic_sync.png").default} className="max-h-72 m-auto py-4" />

The mesh is an underlay for data sync. It operates independently of your queries and subscriptions. Data updates will propagate through the mesh automatically, [provided your subscriptions match](/concepts/syncing-data).

Ditto contains a number of algorithms to maintain an optimal mesh automatically, whether you have two devices or two thousand.

Many applications need to sync data with the cloud or an on-premises server. The Ditto SDK uses peer-to-peer and cloud connections simultaneously, turning your mesh global. This is as easy as setting your server’s URL.

## Types of Transports

Ditto uses as many technologies as possible to communicate with other devices running your app. These different modes, such as Bluetooth Low Energy and LAN, are called _transports_.

Where possible Ditto will create a mesh using a mixture of transports. They offer different advantages and disadvantages. For example Bluetooth LE generally has a longer range but much lower bandwidth than WiFi. Therefore Ditto uses WiFi when it's available, and falls back to Bluetooth when it isn’t.

Which transports are supported depends on what kind of device or SDK you are using. Some examples:

* A mobile phone can use **Bluetooth LE**, **LAN**, **P2P WiFi**, or a **WebSocket** connection to a cloud server.
* A web application running in a browser can use **WebSocket**.
* A Raspberry Pi can use **Bluetooth LE**, **LAN**, or **WebSocket**.

Many transports will work automatically. Others like WebSocket require configuration. [You can learn more about the supported transports and upcoming transports here](https://www.ditto.live/docs/references/network-transport-support)

## Discovering Peers

When Ditto starts syncing it advertises itself on all enabled peer-to-peer transports. This advertisement is transmitted in different ways depending on the transport but it always involves two small pieces of information.

* **App ID Hash** - A 32-bit hash of the app’s id.
* **Announce** - An encoded piece of text identifying an app session.

All devices running the same app will have the same _App ID Hash_ so they know they should connect to each other. In the rare event of a hash collision, Ditto may try to connect to a different app, but verification will fail and the connection will be cancelled immediately.

If you are monitoring network traffic you might come across a Ditto Announce. This is a Ditto-specific advertisement format which contains basic information about the device. This provides hints to Ditto so that it can construct a good mesh quickly and efficiently.

```
Q1RACGXmbwOgjGSGP771
Q1                      Major protocol version: 1
  RA                    Platform: Android
    CGXmbwOg            32-bit Network ID
            jGSGP771    Device name “SGP771”
```

The Network ID is randomised each time Ditto starts up. It enables peers to identify each other with high probability across all transports. If Peer A connects to Peer B over WiFi they know each other’s Network IDs, so Peer B can avoid creating a duplicate connection in the reverse direction.

## Making and Breaking Connections

<img src={require("./diagram2_new_peer.png").default} className="max-h-72 m-auto" />

When a user opens your app the first thing they will see is how quickly it syncs the latest information. Ditto understands this. When sync begins it uses all the transports aggressively to locate and connect to multiple potential peers concurrently. At the same time the existing peers will notice the newcomer’s arrival. If they have capacity they will also establish connections to the new device. Together, these processes ensure that a new peer is integrated into the mesh as quickly as possible.

After this initial burst Ditto must become more efficient. A mobile phone has a finite battery. Each extra LAN connection consumes more CPU time and more radio energy. Bluetooth is particularly constrained: devices can manage only a handful of concurrent connections and each connection can take several seconds to initiate. Therefore in larger meshes Ditto must limit the number of interconnections, and choose wisely.

<img src={require("./diagram3_two_islands.png").default} className="max-h-72 m-auto" />

At the same time Ditto must not have too _few_ connections: otherwise islanding can occur, where different groups of devices in the same room are connected in individual clusters. If there is no connection between those groups they will not sync data with each other.

Ditto avoids islanding using two techniques, neither of which require central coordination. First, a reasonably dense mesh is preferred so that islanding is improbable. Second, a random churn means that devices will slowly change which peers they are connected to. This ensures that even if an island did form, it will likely only last a few seconds.

<img src={require("./diagram4_bluetooth_case1.png").default} className="max-h-72 m-auto" />

Next, certain optimisations are possible. Imagine there are two candidate peers for a Bluetooth connection but you only have capacity for one. If you are already connected to one of those peers via WiFi, then we should spend our Bluetooth connection on the other peer, to improve the diversity of the mesh.

<img src={require("./diagram5_bluetooth_case2.png").default} className="max-h-72 m-auto" />

Now, imagine the same scenario except we have capacity for two Bluetooth connections. This time we should connect to _both_ of them. The Bluetooth connection where we have WiFi will sit idle for now, but if that WiFi connection goes away in the future then we can immediately failover to the pre-established Bluetooth connection. The user won't even notice that anything happened.

Sounds complicated? Don’t worry about it. Everything described here is built into Ditto and your app will do this completely automatically. All you need to do is enable your transports and Ditto will make the best possible use of them.

## Using Bandwidth Intelligently

In smaller meshes Ditto will often create multiple connections to the same peer using different transports. This might look wasteful but it provides important performance benefits.

1. The transports race against each other to establish a connection. As soon as we get the first one, data sync can begin. This means lower latency for initial sync.
2. The fastest connection is preferred to transfer data, so large updates sync as quickly as possible.
3. Unneeded slower connections like Bluetooth are left idle, which means the limited radio bandwidth is reserved for those peers that really need it.
4. If the fastest connection is lost, the next-best option is ready to go, reducing or eliminating the gap when no sync is possible.

The seamless switching between transports relies on a Ditto component called the Multiplexer, which is described in detail in a <a href="https://www.ditto.live/blog/posts/the-new-network-multiplexer">blog post</a>.

As of Ditto v1.0 the Multiplexer uses one transport at a time with failover. In future versions this feature will enable more complex scenarios such as load-balancing across multiple routes and lossy transports.

## Servers and the Cloud

In addition to peer-to-peer transports like Bluetooth, a cloud or on-prem server can be configured by specifying its URL. At Ditto we call a server like this a _Big Peer_, while regular SDKs are _Small Peers_.

Big Peers are especially important for users who want to use Ditto in a web browser, since web browsers have very limited peer-to-peer capabilities. The JavaScript SDK can be configured with the Big Peer that should be used for sync.

An SDK can sync directly with a Big Peer, or locally with Small Peers, or with both at the same time, acting as a bridge for devices that don’t have an internet connection.

## Configuring the Mesh

Every Ditto SDK has a configuration structure called `TransportConfig`, which lives in the main `Ditto` object. If you don’t change the default configuration Ditto will enable all available peer-to-peer transports.

If you create a new `TransportConfig` it has three main sections:

* **`peerToPeer`** - Contains properties for each type of transport. Set the `enabled`/`isEnabled` flag to `true` for each one that you want to use.
* **`connect`** - Servers to connect to: a list of WebSocket URLs.
* **`listen`** - Specialised configuration for making a Small Peer listen on a predictable port or act as a WebSocket server.

Most apps will only need to configure the `peerToPeer` and WebSocket settings.

The `listen` parameters provide support for unusual scenarios such as web browser clients on fully offline networks. Please use these only as directed by Ditto. If misconfigured, the listener features could circumvent Ditto’s usual encryption and access control.