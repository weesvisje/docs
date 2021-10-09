---
title: 'Ditto Identities'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document explains in detail what Ditto Identities are, the different types of Identities available, the capabilities of each Identity, and how to configure your Ditto App to use a specific Identity.

Identity, Authentication, and Access Control within Ditto Apps is controlled by Ditto Identities. 
The Ditto Identity is one of the main inputs to the Ditto Constructor and controls how your local Ditto instance will communicate with the Ditto Cloud and other Ditto Peers. 
A Ditto Identity is typically validated by the Ditto Cloud and then used to establish trust and secure communications with peer instances. 
Further, your Ditto Identity determines the read and write permissions to data and is associated to a set of access control permissions. 
Each Ditto Identity is associated to a single Ditto App via a globally unique AppId and may not be used across multiple Ditto Apps. 
Each App User that should be uniquely identified should have a distinct Ditto Identity.


### Ditto Identity Lifecycle

While highly configurable, each Ditto Identity has a typical life cycle. 
First, early in the Apps life cycle the Ditto Identity is constructed. 
Typically the only prerequesites are a Ditto Persistance Root (working directory for local data storage, where configured) and a globally unique Ditto App Id. 
In order to sync Documents and Timeseries Events, all App instances, regardless of SDK language, *must* have the same globally unique Ditto AppId.
Therefore this value will typically be incorporated in the App's bundle or provided to the App when it starts. 
Some Ditto Identities require additional inputs to construct, and these will be discussed subsequently. 
Next the Ditto Identity is consumed by the Ditto Constructor, yielding a properly configured Ditto instance. 
The Ditto instance will contain a Ditto Authenticator and often your own type which implements the DittoAuthEventHandler interface and provides login credentials. 
Ditto will use these types to contact the configured Auth Url and supply the login credentials an Authentication Provider. 
If the credentials are valid, then the Authentication Provider will return to Ditto an Authentication Token, validating its credentials and granting the Ditto instance idividualized permissions.
The Ditto instance can now sync with the Ditto Cloud (Big Peer).
Generally the Ditto Cloud is not the actual Auth Provider, but a "proxy" to your own "source of truth" for identities, credential validation, and permissions.
Depending on the Identity used, the Ditto instance may then request the Ditto Cloud (Big Peer) sign an x509 certificate, using the previously validated credentials and Authentication Token as proof of its identity.
The Ditto Cloud will then return the signed x509 certificate.
This certificate may then be presented to other Ditto peers to mutually establish trust and create encrypted communications channels.

### Parts of a Ditto Identity

* `AppId` - Uniquely Identifies a Ditto-based App. It establishes a top-level "namespace" within which all Ditto Identities, collections of documents, timeseries events, and permissions live. It is a part of all Identity types. It may be either a string or, more typically, a UUID v4 lowercased and hyphenated. Only `UUIDv4` AppIds registered with the Ditto Cloud can be used to sync with Ditto Cloud.
* `CustomAuthUrl` - The URL of an Auth Provider which can validate credentials and issue Auth Tokens and x509 certificates. The default values is `https://<app-id>.cloud.ditto.live/`. A CustomAuthUrl is only required when another, possibly self-hosted, Auth Provider is preferred. Development, SharedKey, and Manual Identities don't require any AuthURL.
* EnableCloudSync - Whether Ditto should attempt to sync with `wss://<app-id>.cloud.ditto.live`. Only used by Online and OnlinePlayground Identities. If you're hosting your own Ditto Big Peer, this should be set to `false` and a custom SyncUrl provided to the Ditto `TransportConfig`.
* `WorkingDir` (DittoRoot) - A location where Ditto can cache Auth Tokens, x509 certificates, and other auth-related data. Typically adjacent to the working directory containing Ditto's local data cache.
* `AuthEventHandler` (Calback) - A type defined by the App developer which implements the DittoAuthEventHandler (DittoAuthCallback) Trait/Interface/Protocol. Typically responsible for obtaining and storing credentials like a username, password, or other token from the App's user and then supplying them to Ditto when authentication is required.

### Subtypes of Ditto Identity

* `Online` - Use this identity for most production Apps. The Online identity supports both Cloud and peer-to-peer sync with secure authentication, encryption, and access control. Use typically requires configuring an Authentication Provider for your App within the Ditto Cloud portal, which can validate user-provided credentials. This identity also requires a developer-provided implementation of the DittoAuthEventHandler (DittoAuthCallback) interface.
* `OnlinePlayground` - A simplified version of the `Online` Identity for prototyping and development use. All modes of sync are supported but no Authentication Provider needs to be configured. Instead, all users will receive full read and write permissions to all App collections and timeseries. Do not use this Identity in production. No `DittoAuthEventHandler` needs to be provided.
* `SharedKey` - A secure Identity used for "private" Apps where the developer trusts all users, the Ditto-based App, and devices and would prefer a fully self-contained deployment. Ditto instances are each provided with a pre-shared key that is used for mutual authentication. This Identity does NOT support Cloud sync. Typically used with some external device management solution which can provide and rotate the pre-shared key.
* `Manual` - An advanced Identity where the App developer will provide each Ditto instance with an x509 Client Certificate signed by a common, trusted Certificate Authority. Like `SharedKey` typically deployed along side existing PKI and device management solutions. This Identity can not sync with `cloud.ditto.live` but may since with a custom deployment of a Big Peer.
* `Development` - An *unsecured* identity suitable for local testing, CI/CD pipelines, and peer-to-peer sync. Cloud sync is not permitted. All peers are automatically trusted and no authentication takes place. Do *not* use this Identity in production.


## Configuring a Ditto Identity

Below find example code for how to set up a Ditto `Online` Identity for each SDK language. 
This is the most complex Identity to configure.
The other Identity types follow a similar but heavily simplified pattern.

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
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
import { TransportConfig } from "@dittolive/ditto"

const config = new TransportConfig()
// 1. Enable All Peer to Peer Connections
config.setAllPeerToPeerEnabled(true);

// 2. Listen for incoming connections on port 4000
config.listen.tcp.isEnabled = true
config.listen.tcp.interfaceIp = "0.0.0.0"
config.listen.tcp.port = 4000

// 3. Connect explicitly to remote devices
ditto.setTransportConfig(config);
ditto.tryStartSync();
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
val transportConfig = DittoTransportConfig();
// 1. Enable All Peer to Peer Connections
transportConfig.enableAllPeerToPeer();
// 2. Listen for incoming connections on port 4000
transportConfig.listen.tcp.enabled = true;
transportConfig.listen.http.enabled = false;
transportConfig.listen.tcp.interfaceIp = "0.0.0.0";
transportConfig.listen.tcp.port = 4000;
// 3. Connect explicitly to remote devices
transportConfig.connect.tcpServers.add("135.1.5.5:12345");
transportConfig.connect.tcpServers.add("185.1.5.5:12345");

ditto.tryStartSync()
```

</TabItem>
<TabItem value="java">

```java
DittoTransportConfig config = new DittoTransportConfig();

// 1. Enable Peer to Peer Connections
config.enableAllPeerToPeer();

// 2. Listen for incoming connections on port 4000
DittoListen listen = new DittoListen();
DittoTcpListenConfig tcpListenConfig = new DittoTcpListenConfig();
tcpListenConfig.setEnabled(true);
tcpListenConfig.setInterfaceIp("0.0.0.0");
tcpListenConfig.setPort(4000);
listen.setTcp(tcpListenConfig);
config.setListen(listen);
// 3. Connect explicitly to remote devices
DittoConnect connect = new DittoConnect();
connect.setTcpServers(Sets.newHashSet("135.1.5.5:12345", "185.1.5.5:12345"));
config.setConnect(connect);

try {
    ditto.tryStartSync();    
} catch(DittoError error) {
    Log.d("DittoError", error.getLocalizedMessage());
}
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

<TabItem value="rust">

```rust
use dittolive_ditto::prelude::*;
use std::sync::Arc;
use std::time::Duration;

struct MyAuthHandler {
    provider: String, // Must match a provider name configured in Ditto Cloud
    token: String // Some credential your Auth Provider will recognize
}

// One option for a simple implementation
impl DittoAuthEventHandler for MyAuthHandler {
   fn authentication_require(&self, auth: DittotAuthenticator) {
     // makes the login request
      auth.login_with_token(&self.token, &self.provider).unwrap()
   }

   fn authentication_expiring_soon(&self, _auth: DittoAuthenticator, remaining: Duration) {
      // Nothing required here
      ()
   }
}

impl MyAuthHandler {
  fn new() -> Self {
    // Read the provider's name and the token from somewhere (file, env var, cli arg)
    // or prompt the end user to provide them
    // For server-based apps Env Vars or queries to a secret's vault are recommended
    // depending on security requirements
    todo!()
  }
}

let mut ditto = Ditto::builder()
    // creates a `ditto_data` folder in the directory containing the executing process
    .with_root(Arc::new(PersistentRoot::current_exe()?))
    .with_identity(|ditto_root| {
      // Provided as an env var, may also be provided as hardcoded string
      let app_id = AppId::from_env("DITTO_APP_ID")?;
      let auth_event_handler = MyAuthHandler::new();
      let enable_cloud_sync = true;
      let custom_auth_url = None;
      // return the Result<Identity, _> at the end of this closure
      Online::new(ditto_root, app_id, auth_event_handler, enable_cloud_sync, custom_auth_url)
    })
    .with_transport_config(|_identity| {
        let mut config = TransportConfig::enable_all_peer_to_peer()
    })
    .build()?;
// You may use Ditto locally at this point, but
// The Builder will NOT automatically set your license or try to start sync
// Both must be done explicitly

ditto.set_license_from_env("DITTO_LICENSE")?; // May also be provided as a string
ditto.try_start_sync()?; // Automatically triggers initial Authentication
```
</TabItem>
</Tabs>