---
title: 'Manual Network Transport Configuration'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before you call `tryStartSync()` you may want to configure additional connections configurations for the current Ditto instance. _Before_ you call `tryStartSync()`, construct a `DittoTransportConfig` value and set `ditto.SetTransportConfig`.

### Explicitly connecting another remote Ditto instance

If you know the host and port of another remote Ditto instance and would like to connect to it, construct a `DittoTransportConfig` object and add the host and port to the `DittoTransportConfig.Connect.TcpServers` property as a `string`. The string format should be `host:port`, separated by a colon.

In the example below, we know of two other Ditto instances located on:

* Host IP `135.1.5.5` at port `12345`
* Host IP `185.1.5.5` at port `4567`


<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
  ]
}>
<TabItem value="javascript">

```js
```

</TabItem>
<TabItem value="swift">

```swift
var config = DittoTransportConfig()
// Connect explicitly to a remote devices
config.connect.tcpServers.add("135.1.5.5:12345")
config.connect.tcpServers.add("185.1.5.5:12345")

ditto.setTransportConfig(config: config)

do {
  try ditto.tryStartSync()
} catch (let err) {
  print(err.localizedDescription)
}
```

</TabItem>
<TabItem value="objc">

```objc
DITMutableTransportConfig *transportConfig = [[DITMutableTransportConfig alloc] init];
[transportConfig.connect.tcpServers addObject:@"135.1.5.5:12345"];
[transportConfig.connect.tcpServers addObject:@"185.1.5.5:12345"];
[ditto setTransportConfig:transportConfig];
NSError *err = nil;
[ditto tryStartSync:&err];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
```

</TabItem>
<TabItem value="java">

```java
```

</TabItem>
<TabItem value="csharp">

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

</TabItem>
<TabItem value="cpp">

```cpp
auto config = ditto::TransportConfig();
// Connect explicitly to remote devices
config.connect.tcp_servers.insert("135.1.5.5:12345");
config.connect.tcp_servers.insert("185.1.5.5:12345");

// set the transport config 
ditto->set_transport_config(config);
// now you can start ditto's sync 
ditto->try_start_sync()
```

</TabItem>
</Tabs>


Feel free to add as many known remote `host:port` strings.

### Listening for Connections on a Specific Port

You can enable the C# Ditto instance to listen for incoming connections from other remotes Ditto instances on a specific port. 

In this example, we would like our Ditto instance to listen to _incoming_ connections on port `4000` on `localhost`. 

:::info
To be safe, please do not use `localhost` when setting the IP interface. Use `"0.0.0.0"` instead.
:::
 
<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
  ]
}>
<TabItem value="javascript">

> Listening on a port is only available on Node or Electron environments. This functionality will not work when running inside of a web browser.

```js
const transportConfig = new TransportConfig()
transportConfig.li
```

</TabItem>
<TabItem value="swift">

```swift
var config = DittoTransportConfig()

// Listen for incoming connections on port 4000
config.listen.tcp.isEnabled = true
config.listen.tcp.interfaceIp = "0.0.0.0"
config.listen.tcp.port = 4000

ditto.setTransportConfig(config: config)

do {
  try ditto.tryStartSync()
} catch (let err) {
  print(err.localizedDescription)
}
```

</TabItem>
<TabItem value="objc">

```objc
DITMutableTransportConfig *transportConfig = [[DITMutableTransportConfig alloc] init];
[transportConfig.listen.tcp setEnabled:true];
[transportConfig.listen.tcp setInterfaceIp:@"0.0.0.0"];
[transportConfig.listen.tcp setPort:4000];
[ditto setTransportConfig:transportConfig];
NSError *err = nil;
[ditto tryStartSync:&err];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
```

</TabItem>
<TabItem value="java">

```java
```

</TabItem>
<TabItem value="csharp">

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

</TabItem>
<TabItem value="cpp">

```cpp
auto config = ditto::TransportConfig();

conf.listen.tcp.enabled = true;
conf.listen.http.enabled = false;
conf.listen.tcp.interface_ip = "0.0.0.0";
conf.listen.tcp.port = 4000;

ditto->set_transport_config(conf);
ditto->try_start_sync()
```

</TabItem>
</Tabs>

Incoming connections from other Ditto instances will be able to connect only if the port is accessible. Depending on your deployment _be sure to check that external connections can reach the port that you have specified in your `DittoTransportConfig`. You may need to set up port forwarding if external ports map differently to your host.

## Explicitly enabling Peer to Peer Connections 

If you do not attempt to configure a `DittoTransportConfig` but call `ditto.TryStartSync()`, your Ditto instance will automatically attempt to connect to other ditto instances on the Local Area Network. However, if you supply a `DittoTransportConfig`, this will not automatically be enabled. You'll need to remember to enable local area network peer to peer connnections with `EnableAllPeerToPeer()`.

## Combining Multiple Transports

You can specify several modes of transport configuration within `DittoTransportConfig`. The following snippet shows you a ditto instance that can:

1. Connect to local area network devices
2. Listen for incoming remote connections
3. Connect to remote devices with a known host and port. 

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
  ]
}>
<TabItem value="javascript">

```js
```

</TabItem>
<TabItem value="swift">

```swift
var config = DittoTransportConfig()
// 1. Enable All Peer to Peer Connections
config.enableAllPeerToPeer()

// 2. Listen for incoming connections on port 4000
config.listen.tcp.isEnabled = true
config.listen.tcp.interfaceIp = "0.0.0.0"
config.listen.tcp.port = 4000

// 3. Connect explicitly to remote devices
config.connect.tcpServers.add("135.1.5.5:12345")
config.connect.tcpServers.add("185.1.5.5:12345")

ditto.setTransportConfig(config: config)

do {
  try ditto.tryStartSync()
} catch (let err) {
  print(err.localizedDescription)
}
```

</TabItem>
<TabItem value="objc">

```objc
DITMutableTransportConfig *transportConfig = [[DITMutableTransportConfig alloc] init];
// 1. Enable Local Area Network Connections
[transportConfig enableAllPeerToPeer];
// 2. Listen for incoming connections on port 4000
[transportConfig.listen.tcp setEnabled:true];
[transportConfig.listen.tcp setInterfaceIp:@"0.0.0.0"];
[transportConfig.listen.tcp setPort:4000];
// 3. Connect explicitly to remote devices
[transportConfig.connect.tcpServers addObject:@"135.1.5.5:12345"];
[transportConfig.connect.tcpServers addObject:@"185.1.5.5:12345"];

[ditto setTransportConfig:transportConfig];
NSError *err = nil;
[ditto tryStartSync:&err];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
```

</TabItem>
<TabItem value="java">

```java
```

</TabItem>
<TabItem value="csharp">

```csharp
DittoTransportConfig transportConfig = new DittoTransportConfig();

// 1. Enable Local Area Network Connections
transportConfig.EnableAllPeerToPeer();

// 2. Listen for incoming connections on port 4000
transportConfig.Listen.Tcp.Enabled = true;
transportConfig.Listen.Tcp.InterfaceIp = "0.0.0.0";
transportConfig.Listen.Tcp.Port = 4000;

// 3. Connect explicitly to remote devices
transportConfig.Connect.TcpServers.Add("135.1.5.5:12345");
transportConfig.Connect.TcpServers.Add("185.1.5.5:12345");

ditto.SetTransportConfig(transportConfig);

ditto.TryStartSync();
```

</TabItem>
<TabItem value="cpp">

```cpp
auto config = ditto::TransportConfig();
// 1. Enable All Peer to Peer Connections
config.enable_all_peer_to_peer();

// 2. Listen for incoming connections on port 4000
config.listen.tcp.enabled = true;
config.listen.http.enabled = false;
config.listen.tcp.interface_ip = "0.0.0.0";
config.listen.tcp.port = 4000;

// 3. Connect explicitly to remote devices
config.connect.tcp_servers.insert("135.1.5.5:12345");
config.connect.tcp_servers.insert("185.1.5.5:12345");

ditto->set_transport_config(config);
ditto->try_start_sync()
```

</TabItem>
</Tabs>