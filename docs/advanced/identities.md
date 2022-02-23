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

While highly configurable, each Ditto Identity has a typical life cycle. First, early in the Apps life cycle the Ditto Identity is constructed.

Typically the only prerequisites are a Ditto persistance root (working directory for local data storage, where configured) and a globally unique Ditto App Id. In order to sync Documents and Timeseries Events, all App instances, regardless of SDK language, *must* have the same globally unique Ditto AppId. Therefore this value will typically be incorporated in the App's bundle or provided to the App when it starts.

Some Ditto Identities require additional inputs to construct, and these will be discussed subsequently.

Next the Ditto Identity is consumed by the Ditto constructor, yielding a properly configured `Ditto` instance. The Ditto instance will contain a Ditto Authenticator and often your own type which implements the `DittoAuthEventHandler` interface and provides login credentials. Ditto will use these types to contact the configured Auth Url and supply the login credentials to an Authentication Provider. If the credentials are valid, then the Authentication Provider will return to Ditto an Authentication Token, validating its credentials and granting the Ditto instance individualized permissions. The Ditto instance can now sync with the Ditto Cloud (Big Peer).

Generally the Ditto Cloud is not the actual Auth Provider, but a "proxy" to your own "source of truth" for identities, credential validation, and permissions.

Depending on the Identity used, the Ditto instance may then request the Ditto Cloud (Big Peer) sign an x509 certificate, using the previously validated credentials and Authentication Token as proof of its identity. The Ditto Cloud will then return the signed x509 certificate. This certificate may then be presented to other Ditto peers to mutually establish trust and create encrypted communications channels.

### Parts of a Ditto Identity

* `AppId` - Uniquely Identifies a Ditto-based App. It establishes a top-level "namespace" within which all Ditto Identities, collections of documents, timeseries events, and permissions live. It is a part of all Identity types. It may be either a string or, more typically, a UUID v4 lowercased and hyphenated. Only `UUIDv4` `AppId`s registered with the Ditto Cloud can be used to sync with Ditto Cloud.
* `CustomAuthUrl` - The URL of an Auth Provider which can validate credentials and issue Auth Tokens and x509 certificates. The default values is `https://<app-id>.cloud.ditto.live/`. A `CustomAuthUrl` is only required when another, possibly self-hosted, Auth Provider is preferred. `OfflinePlayground`, SharedKey, and Manual Identities don't require any AuthURL.
* `EnableCloudSync` - Whether Ditto should attempt to sync with `wss://<app-id>.cloud.ditto.live`. Only used by `OnlineWithAuthentication` and `OnlinePlayground` Identities. If you're hosting your own Ditto Big Peer, this should be set to `false` and a custom SyncUrl provided to the Ditto `TransportConfig`.
* `WorkingDir` (DittoRoot) - A location where Ditto can cache Auth Tokens, x509 certificates, and other auth-related data. Typically the same as the working directory containing Ditto's local data store.
* `AuthEventHandler` (Callback) - A type defined by the App developer which implements the `DittoAuthEventHandler` (`DittoAuthCallback`) Trait/Interface/Protocol. Typically responsible for obtaining and storing credentials like a username, password, or other token from the App's user and then supplying them to Ditto when authentication is required.

### Subtypes of Ditto Identity

* `OnlineWithAuthentication` - Use this identity for most production Apps. The `OnlineWithAuthentication` identity supports both Cloud and peer-to-peer sync with secure authentication, encryption, and access control. Use typically requires configuring an Authentication Provider for your App within the Ditto Cloud portal, which can validate user-provided credentials. This identity also requires a developer-provided implementation of the `DittoAuthEventHandler` (`DittoAuthCallback`) interface.
* `OnlinePlayground` - A simplified version of the `OnlineWithAuthentication` Identity for prototyping and development use. All modes of sync are supported but no Authentication Provider needs to be configured. Instead, all users will receive full read and write permissions to all App collections and timeseries. Do not use this Identity in production. No `DittoAuthEventHandler` needs to be provided.
* `SharedKey` - A secure Identity used for "private" Apps where the developer trusts all users, the Ditto-based App, and devices and would prefer a fully self-contained deployment. Ditto instances are each provided with a pre-shared key that is used for mutual authentication. This Identity does NOT support Cloud sync. Typically used with some external device management solution which can provide and rotate the pre-shared key. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* `Manual` - An advanced Identity where the App developer will provide each Ditto instance with an x509 Client Certificate signed by a common, trusted Certificate Authority. Like `SharedKey` typically deployed along side existing PKI and device management solutions. This Identity cannot sync with `cloud.ditto.live` but may sync with a custom deployment of a Big Peer. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* `OfflinePlayground` - An *unsecured* identity suitable for local testing, CI/CD pipelines, and peer-to-peer sync. Cloud sync is not permitted. All peers are automatically trusted and no authentication takes place. Do *not* use this Identity in production. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).


## Configuring an OnlineWithAuthentication Ditto Identity

Below find example code for how to set up a Ditto `OnlineWithAuthentication` Identity for each SDK language. This is the most complex Identity to configure. The other Identity types follow a similar but heavily simplified pattern.

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
import { init, Ditto } from "@dittolive/ditto"
(async () => {
  await init() // you need to call this at least once before using any of the Ditto API
  const authHandler = {
    authenticationRequired: function(authenticator) {
      authenticator.loginWithToken(ThirdPartyAuth.getToken(), "third_party", (err) => {
        console.log(`Login request completed. Error? ${err}`)
      })
    },
    authenticationExpiringSoon: function(authenticator, secondsRemaining) {
      console.log(`Auth token expiring in ${secondsRemaining} seconds`)
    }
  }

  const identity = {
    type: 'onlineWithAuthentication',
    appID: 'REPLACE_ME_WITH_YOUR_APP_ID',
    authHandler
  }
  const ditto = new Ditto(identity, '/persistence/file/path')
  ditto.tryStartSync()
})()
```

</TabItem>
<TabItem value="swift">

```swift
struct AuthDelegate: DittoAuthenticationDelegate {
    func authenticationRequired(authenticator: DittoAuthenticator) {
        authenticator.loginWithToken(ThirdPartyAuth.getToken(), provider: "third_party") { err in
            print("Login request completed. Error? \(err)")
        }
    }

    func authenticationExpiringSoon(authenticator: DittoAuthenticator, secondsRemaining: Int64) {
        print("Auth token expiring in \(secondsRemaining)")
    }
}
let identity = DittoIdentity.onlineWithAuthentication(
    appID: "REPLACE_ME_WITH_YOUR_APP_ID",
    authenticationDelegate: AuthDelegate()
)
let ditto = Ditto(identity: identity)
try! ditto.tryStartSync()
```

</TabItem>
<TabItem value="objc">

```objc
@interface AuthDelegate : NSObject <DITAuthenticationDelegate>
@end

@implementation AuthDelegate
- (void)authenticationRequired:(nonnull DITAuthenticator *)authenticator {
    [authenticator loginWithToken:[ThirdPartyAuth getToken] provider:@"third_party" completion:^(NSError * _Nullable err) {
        NSLog(@"Login request completed. Error? %@", err);
    }];
}

- (void)authenticationExpiringSoon:(nonnull DITAuthenticator *)authenticator
                  secondsRemaining:(int64_t)secondsRemaining {
    NSLog(@"Auth token expiring in %lld seconds", secondsRemaining);
}
@end
DITIdentity *identity = [[DITIdentity alloc] initOnlineWithAuthenticationWithAppID:@"REPLACE_ME_WITH_YOUR_APP_ID"
                                                            authenticationDelegate:[[AuthDelegate alloc] init];
DITDitto *ditto = [[DITDitto alloc] initWithIdentity:identity];
NSError *error = nil;
[ditto tryStartSync:&error];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
try {
  val androidDependencies = AndroidDittoDependencies(context)
  class AuthCallback: DittoAuthenticationCallback {
      override fun authenticationRequired(authenticator: DittoAuthenticator) {
          authenticator.loginWithToken(ThirdPartyAuth.getToken(), "third_party") { err ->
              println("Login request completed. Error? $err")
          }
      }

      override fun authenticationExpiringSoon(
          authenticator: DittoAuthenticator,
          secondsRemaining: Long
      ) {
          println("Auth token expiring in $secondsRemaining seconds")
      }
  }

  val identity = DittoIdentity.OnlineWithAuthentication(
      androidDependencies,
      "REPLACE_ME_WITH_YOUR_APP_ID",
      AuthCallback()
  )
  val ditto = Ditto(androidDependencies, identity)
  ditto.tryStartSync()
} catch(e: DittoError) {
  Log.e("Ditto error", e.message!!)
}

```

</TabItem>
<TabItem value="java">

```java
DittoDependencies androidDependencies = new DefaultAndroidDittoDependencies(this.context);
class AuthCallback implements DittoAuthenticationCallback {
    @Override
    public void authenticationRequired(@NonNull DittoAuthenticator authenticator) {
        authenticator.loginWithToken(ThirdPartyAuth.getToken(), "third_party", err -> {
            System.out.println("Login request completed. Error? " + err.toString());
        });
    }

    @Override
    public void authenticationExpiringSoon(@NonNull DittoAuthenticator authenticator, long secondsRemaining) {
        System.out.println("Auth token expiring in " + secondsRemaining + " seconds");
    }
}

DittoIdentity identity = new DittoIdentity.OnlineWithAuthentication(
    customDirDependencies,
    "REPLACE_ME_WITH_YOUR_APP_ID",
    new AuthCallback()
);
Ditto ditto = new Ditto(androidDependencies);

try {
  ditto.tryStartSync();
} catch(DittoError e) {
  Log.e("Ditto Error", e.getMessage())
}
```

</TabItem>
<TabItem value="csharp">

```csharp
class AuthDelegate : IDittoAuthenticationDelegate
{
    public async void AuthenticationRequired(DittoAuthenticator authenticator)
    {
        var res = await authenticator.LoginWithToken(ThirdPartyAuth.GetToken(), "third_party");
        System.Console.WriteLine($"Login request completed. Error? {res}");
    }

    public async void AuthenticationExpiringSoon(DittoAuthenticator authenticator, long secondsRemaining)
    {
        System.Console.WriteLine($"Auth token expiring in {secondsRemaining} seconds");
    }
}

var identity = DittoIdentity.OnlineWithAuthentication(
    "REPLACE_ME_WITH_YOUR_APP_ID",
    new AuthDelegate());

try
{
    var ditto = new Ditto(identity);
    ditto.TryStartSync();
}
catch (DittoException ex)
{
    System.Console.WriteLine($"Ditto Error {ex.Message}");
}
```

</TabItem>
<TabItem value="cpp">

```cpp
class AuthCallback: public AuthenticationCallback {
public:
  void authentication_required(std::shared_ptr<Authenticator> authenticator) {
    authenticator->login_with_token("123", "third_party", [](std::unique_ptr<DittoError> err) {
      std::cout << "Login request completed. Error?" << err->what() << std::endl;
    });
  }

  void authentication_expiring_soon(std::shared_ptr<Authenticator> authenticator,
                                    std::int64_t seconds_remaining) {
    std::cout << "Auth token expiring in " << seconds_remaining << " seconds" << std::endl;
  }
};

Identity identity = Identity::OnlineWithAuthentication(
  "REPLACE_ME_WITH_YOUR_APP_ID",
  std::make_shared<AuthCallback>()
);
try {
  Ditto ditto = Ditto(identity, "/your-persistence-path");
  ditto.try_start_sync();
} catch (const DittoError &err) {
  std::cout << err.what() << std::endl;
}
```

</TabItem>

<TabItem value="rust">

```rust
use dittolive_ditto::prelude::*;
use std::sync::Arc;
use std::time::Duration;

struct AuthHandler {
    token: String, // Some credential your Auth Provider will recognize
    provider: String, // Must match a provider name configured in Ditto Cloud
}

impl DittoAuthenticationEventHandler for AuthHandler {
    fn authentication_required(&self, auth: dittolive_ditto::auth::DittoAuthenticator) {
        auth.login_with_token(&self.token, &self.provider) {
            ::log::info!("Login request completed. Error? {:?}", &e);
        }
    }

    fn authentication_expiring_soon(
        &self,
        _auth: dittolive_ditto::auth::DittoAuthenticator,
        seconds_remaining: std::time::Duration,
    ) {
        ::log::info!(
            "Auth token expiring in {} seconds",
            seconds_remaining.as_secs()
        );
    }
}

impl Default for AuthHandler {
    fn default() -> Self {
        AuthHandler {
            token: ThirdPartyAuth::get_token(),
            provider: String::from("third_party"),
        }
    }
}

let mut ditto = Ditto::builder()
    // creates a `ditto_data` folder in the directory containing the executing process
    .with_root(Arc::new(PersistentRoot::current_exe()?))
    .with_identity(|ditto_root| {
      // Provided as an env var, may also be provided as hardcoded string
      let app_id = AppId::from_env("DITTO_APP_ID")?;
      let auth_event_handler = AuthHandler::default();
      let enable_cloud_sync = true;
      let custom_auth_url = None;
      // return the Result<Identity, _> at the end of this closure
      OnlineWithAuthentication::new(
          ditto_root,
          app_id,
          auth_event_handler,
          enable_cloud_sync,
          custom_auth_url,
      )
    })
    .with_transport_config(|_identity| {
        let mut config = TransportConfig::enable_all_peer_to_peer()
    })
    .build()?;

ditto.try_start_sync()?;
```

</TabItem>
</Tabs>

## Configuring an OnlinePlayground Ditto Identity

When first experimenting with Ditto, you can also use a simpler `OnlinePlayground` Identity as shown below.

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
import { init, Ditto } from "@dittolive/ditto"
(async () => {
  await init() // you need to call this at least once before using any of the Ditto API
  const identity = { type: 'onlinePlayground', appID: 'REPLACE_ME_WITH_YOUR_APP_ID' }
  const ditto = new Ditto(identity, '/persistence/file/path')
  ditto.tryStartSync()
})()
```

</TabItem>
<TabItem value="swift">

```swift
let ditto = Ditto(identity: DittoIdentity.onlinePlayground(appID: "REPLACE_ME_WITH_YOUR_APP_ID"))
try! ditto.tryStartSync()
```

</TabItem>
<TabItem value="objc">

```objc

DITIdentity *identity = [[DITIdentity alloc] initOnlinePlaygroundWithAppID:@"REPLACE_ME_WITH_YOUR_APP_ID"];
DITDitto *ditto = [[DITDitto alloc] initWithIdentity:identity];
NSError *error = nil;
[ditto tryStartSync:&error];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
try {
  val androidDependencies = AndroidDittoDependencies(context)
  val identity = DittoIdentity.OnlinePlayground(androidDependencies, appID = "REPLACE_ME_WITH_YOUR_APP_ID")
  val ditto = Ditto(androidDependencies, identity)
  ditto.tryStartSync()
} catch(e: DittoError) {
  Log.e("Ditto error", e.message!!)
}

```

</TabItem>
<TabItem value="java">

```java
DittoDependencies androidDependencies = new DefaultAndroidDittoDependencies(this.context);
DittoIdentity identity = new DittoIdentity.OnlinePlayground(androidDependencies, "REPLACE_ME_WITH_YOUR_APP_ID");
Ditto ditto = new Ditto(androidDependencies, identity);

try {
  ditto.tryStartSync();
} catch(DittoError e) {
  Log.e("Ditto Error", e.getMessage())
}
```

</TabItem>
<TabItem value="csharp">

```csharp
try
{
    var identity = DittoIdentity.OnlinePlayground("REPLACE_ME_WITH_YOUR_APP_ID");
    var ditto = new Ditto(identity);
    ditto.TryStartSync();
}
catch (DittoException ex)
{
    System.Console.WriteLine($"Ditto Error {ex.Message}");
}
```

</TabItem>
<TabItem value="cpp">

```cpp
auto identity = Identity::OnlinePlayground("REPLACE_ME_WITH_YOUR_APP_ID");
try {
  Ditto ditto = Ditto(identity, "/your-persistence-path");
  ditto.try_start_sync();
} catch (const DittoError &err) {
  std::cout << err.what() << std::endl;
}
```

</TabItem>
<TabItem value="rust">

```rust
use dittolive_ditto::prelude::*;
use std::sync::Arc;
use std::time::Duration;

let mut ditto = Ditto::builder()
    // creates a `ditto_data` folder in the directory containing the executing process
    .with_root(Arc::new(PersistentRoot::current_exe()?))
    .with_identity(|ditto_root| {
      // Provided as an env var, may also be provided as hardcoded string
      let app_id = AppId::from_env("DITTO_APP_ID")?;
      let enable_cloud_sync = true;
      let custom_auth_url = None;
      // return the Result<Identity, _> at the end of this closure
      OnlinePlayground::new(ditto_root, app_id, enable_cloud_sync, custom_auth_url)
    })
    .with_transport_config(|_identity| {
        let mut config = TransportConfig::enable_all_peer_to_peer()
    })
    .build()?;

ditto.try_start_sync()?;
```

</TabItem>
</Tabs>