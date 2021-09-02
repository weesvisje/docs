---
title: 'C#'
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

> Currently, the C# SDK runs on macOS, Windows, and Linux. Xamarin iOS and Android Support are coming soon. Please email us at [contact@ditto.live](mailto:contact@ditto.live) if these other platforms are essential for you. 

The C# SDK is available as part of [NuGet](https://nuget.org). The common ways to install the SDK is with either the NuGet Package Manager, the .NET CLI, or by adding a reference to the CSProj XML file.

<Tabs
  groupId="dotnet-installation"
  defaultValue="javascript"
  values={[
    {label: "Package Manager", value: 'package-manager'},
    {label: '.NET CLI', value: 'cli'},
    {label: 'Package Reference', value: 'package-reference'},
  ]
}>
<TabItem value="package-manager">

```
Install-Package Ditto
```

</TabItem>
<TabItem value="cli">

```
dotnet add package Ditto
```

</TabItem>
<TabItem value="package-reference">

```xml
<PackageReference Include="Ditto" Version="1.*" />
```

</TabItem>
</Tabs>

[For more installation options visit the NuGet Page](https://www.nuget.org/packages/Ditto/)

Now in your code you can call:

```csharp
using DittoSDK;
using System.Collections.Generic;

var ditto = new Ditto(identity: DittoIdentity.Development(appName: "live.ditto.tasks"));

ditto.SetLicenseToken("my token");
ditto.TryStartSync();

var insertedId = ditto.Store.Collection("cars").Insert(new Dictionary<string, object> {
    { "make", "honda" },
    { "color", "red" },
});
```

## Setting Up Connections 

Before you call `TryStartSync()` you may want to configure additional connections for the current Ditto instance. Before calling `TryStartSync()`, you'll need to call `ditto.SetTransportConfig` with a `DittoTransportConfig` value.

### Explicitly connecting another remote Ditto instance

If you know the host and port of another remote Ditto instance and would like to connect to it, construct a `DittoTransportConfig` object and add the host and port to the `DittoTransportConfig.Connect.TcpServers` property as a `string`. The string format should be `host:port`, separated by a colon.

In the example below, we know of two other Ditto instances located on:

* Host IP `135.1.5.5` at port `12345`
* Host IP `185.1.5.5` at port `4567`


```csharp
DittoTransportConfig transportConfig = new DittoTransportConfig();
// Connect explicitly to a remote device on 
transportConfig.Connect.TcpServers.Add("135.1.5.5:12345");
// you can add as many TcpServers as you would like.
transportConfig.Connect.TcpServers.Add("185.1.5.5:4567");
// set the transport config 
ditto.SetTransportConfig(transportConfig);
// now you can start ditto's sync 
ditto.TryStartSync();
```

Feel free to add as many known remote `host:port` strings.

### Listening for Connections on a Specific Port

You can enable the C# Ditto instance to listen for incoming connections from other remotes Ditto instances on a specific port. 

In this example, we would like our Ditto instance to listen to _incoming_ connections on port `4000` on `localhost`.
 
```csharp
DittoTransportConfig transportConfig = new DittoTransportConfig();
transportConfig.Listen.Tcp = new DittoTcpListenConfig();
// By default Listen.Tcp.Enabled is false, be sure to set it to true.
transportConfig.Listen.Tcp.Enabled = true;
// if you want to listen on localhost, most likely you will use 0.0.0.0
// do not use "localhost" as a string
transportConfig.Listen.Tcp.InterfaceIp = "0.0.0.0"; 
// specify your port.
transportConfig.Listen.Tcp.Port = 4000; 
ditto.SetTransportConfig(transportConfig);

// now you can call `ditto.TryStartSync()` 
ditto.TryStartSync();
```

Incoming connections from other Ditto instances will be able to connect only if the port is accessible. Depending on your deployment _be sure to check that external connections can reach the port that you have specified in your `DittoTransportConfig`. You may need to set up port forwarding if external ports map differently to your host.

## Explicitly enabling Peer to Peer Connections 

If you do not attempt to configure a `DittoTransportConfig` but call `ditto.TryStartSync()`, your Ditto instance will automatically attempt to connect to other ditto instances on the Local Area Network. However, if you supply a `DittoTransportConfig`, this will not automatically be enabled. You'll need to remember to enable local area network peer to peer connnections with `EnableAllPeerToPeer()`.

```csharp
DittoTransportConfig transportConfig = new DittoTransportConfig();
// Enable Local Area Network Connections
transportConfig.EnableAllPeerToPeer();
ditto.SetTransportConfig(transportConfig);
ditto.TryStartSync();
```

### Combining Multiple Transports

You can specify several modes of transport configuration within `DittoTransportConfig`. The following snippet shows you a ditto instance that can:

1. Connect to local area network devices
2. Listen for incoming remote connections
3. Connect to remote devices with a known host and port. 

```csharp
DittoTransportConfig transportConfig = new DittoTransportConfig();

// 1. Enable Local Area Network Connections
transportConfig.EnableAllPeerToPeer();

// 2. Listen for incoming connections on port 4000
transportConfig.Listen.Tcp.Enabled = true;
transportConfig.Listen.Tcp.InterfaceIp = "0.0.0.0";
transportConfig.Listen.Tcp.Port = 4000;

// 3. Connect explicitly to a remote device on 
transportConfig.Connect.TcpServers.Add("135.1.5.5:12345");
transportConfig.Connect.TcpServers.Add("185.1.5.5:12345");

ditto.SetTransportConfig(transportConfig);

ditto.TryStartSync();
```