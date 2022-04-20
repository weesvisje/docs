---
title: 'Introduction'
slug: '/'
sidebar_position: 1
---

import Lottie from "../src/components/Lottie"

Ditto is a cross-platform peer-to-peer database that allows apps to sync _with_ and _even without_ internet connectivity. 
Install Ditto into your application, then use the APIs to read and write data into its storage system, and it will then automatically sync any changes to other devices. Unlike other synchronization solutions, Ditto is designed for "peer-to-peer" synchronization where it can directly communicate with other devices even without an internet connection. In addition, Ditto automatically manages the complexity of using multiple network transports, like Bluetooth, P2P Wi-Fi, and Local Area Network, to find and connect to other devices and then synchronize any changes.

In short, Ditto enables:

* Blazing fast peer-to-peer and client-server sync
* Concurrent edits and conflict resolution
* Offline Caching with an embedded database 
* Cross platform support on Web Browsers, iOS, Android, IoT, and server side apps.
* Replicating structured data and even small or large binary files

<Lottie path="/animations/intro/data.json" />

## Details

The Ditto platform is a fully distributed database that runs in the cloud and on local devices. Each Ditto instance is a called a __peer__. There are two types of peers in the Ditto distributed database system: __Big Peer__ and __Small Peer__. When you install Ditto in a client device like a web, desktop, mobile, or IoT application, you are installing a __Small Peer__. Running on the cloud is a __Big Peer__.

__Big Peers__ and __Small Peers__ can sync with eachother with a common __appID__. To get an __appID__, [create an app on our portal.](https://portal.ditto.live)

### Big Peer

* Big Peers will try to sync everything from the Small Peers. If a small peer adds, removes, or updates data, the big peer will be notified of these changes. We call this an __altruistic replication strategy__.
* The Big Peer is capable of storing a tremendous amount of data and is capable of of sharding and partitioning. While it still looks like any peer, underneath the hood, it is capable of scaling to meet the demands of large amount of data. [Read more about its internal architecture here.](/how-it-works/big-peer)
* To get data in or out of the Big Peer, you can use a Small Peer or the [HTTP API](/concepts/http), or using our Server Side Webhooks.

### Small Peer

* Generally, a Small Peer is embedded in a web, mobile, desktop, or IoT application. We distribute the Small Peer as an SDK with several language bindings.
* Small peers will __only sync data down from nearby Small Peers or Big Peers__ when it has a [live query](/concepts/syncing-data). We call this a __selfish replication strategy__. Small peers can stop syncing by disposing or stopping a live query.
* Small peers are not __not capable of sharding or partitioning__. It will use whatever storage size the device allows but not any more. When you buy a mobile phone with 256 GB of storage, you're stuck until you buy a new one. 
* __Small peers are capable of using device peer to peer communication tactics__ like Bluetooth Low Energy, Wi-Fi Direct, AWDL, Wi-Fi Aware, Local Area Network, and more to transmit data.
