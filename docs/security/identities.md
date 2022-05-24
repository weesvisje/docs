---
title: 'Identities'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Every installation of an app that uses Ditto has its own identity. This identity
is used to identify each unique peer in the mesh network. When you start
prototyping with Ditto you can use a development identity, which contains
default settings and offers no real security. Development certificates should
absolutely not be deployed to any production environments. Once you are ready to
deploy, this can be swapped for a production identity where security is
enforced.

The Ditto Identity is one of the main inputs to the Ditto Constructor and
controls how your local Ditto instance will communicate with other Ditto Peers.
Each Ditto Identity is associated to a single Ditto client via a globally unique
AppId and may not be used across multiple Ditto apps. A Ditto Identity is used to accept or reject read and writes with peer instances. Each Ditto Identity can be associated to a set of [access control permissions](/security/designing-permissions) 
which you specify.


### Ditto Identity Lifecycle

While highly configurable, each Ditto Identity has a typical life cycle. First, the Ditto Identity is constructed. Typically the only prerequisites are a Ditto persistence root (working directory for local data storage, where configured) and a globally unique Ditto AppId. In order to sync, all app instances, regardless of SDK language, *must* have the same globally unique Ditto AppId. Therefore this value will typically be incorporated in the App's bundle or provided to the App when it starts. The Ditto Big Peer can create AppIds for you, but it is not the authentication provider. Ditto Cloud is a proxy to your own "source of truth" for identities, credential validation, and permissions.

Next the Ditto Identity is consumed by the Ditto constructor, yielding a configured `Ditto` instance. The Ditto instance will contain a Ditto Authenticator and your own implementation of the `DittoAuthEventHandler` interface, which can provide login credentials. Ditto will then contact the configured Auth Url and supply the login credentials to an Authentication Provider. If the credentials are valid, then the Authentication Provider will return to Ditto an Authentication Token, validating its credentials and granting the Ditto instance individualized permissions. The Ditto instance can now sync with other peers.

### Parts of a Ditto Identity

* `AppId` - Uniquely Identifies a Ditto-based App. It establishes a top-level "namespace" within which all Ditto Identities, collections of documents, timeseries events, and permissions live. It is a part of all Identity types. It may be either a string or, more typically, a UUID v4 lowercased and hyphenated. The Ditto Big Peer provisions `UUIDv4` strings that be used to sync with it's servers in the Cloud.
* `CustomAuthUrl` - The URL of an Auth Provider which can validate credentials and issue Auth Tokens and x509 certificates. The default values is `https://<app-id>.cloud.ditto.live/`. A `CustomAuthUrl` is only required when another, possibly self-hosted, Auth Provider is preferred. `OfflinePlayground`, `SharedKey`, and `Manual` Identities don't require any AuthURL.
* `EnableCloudSync` - Whether Ditto should attempt to sync with `wss://<app-id>.cloud.ditto.live`. Only used by `OnlineWithAuthentication` and `OnlinePlayground` Identities. If you're hosting your own Ditto Big Peer, this should be set to `false` and a custom SyncUrl provided to the Ditto `TransportConfig`
* `WorkingDir` (DittoRoot) - A location where Ditto can cache Auth Tokens, x509 certificates, and other auth-related data. Typically the same as the working directory containing Ditto's local data store.
* `AuthEventHandler` (Callback) - A type defined by the App developer which implements the `DittoAuthEventHandler` (`DittoAuthCallback`) Trait/Interface/Protocol. Typically responsible for obtaining and storing credentials like a username, password, or other token from the App's user and then supplying them to Ditto when authentication is required.

For more detailed information on what is contained within Ditto Identity certificates, see [Certificate Security](/how-it-works/certificate-security).

### Subtypes of Ditto Identity

* [OnlinePlayground](/concepts/online-playground) - An insecure identity for prototyping and development use. All modes of sync are supported but no Authentication Provider needs to be configured. Instead, all users will receive full read and write permissions to all App collections and timeseries. Do not use this Identity in production. No `DittoAuthEventHandler` needs to be provided.
* [OnlineWithAuthentication](/security/online-with-authentication/overview) - Use this identity for most production Apps. The `OnlineWithAuthentication` identity supports both Cloud and peer-to-peer sync with secure authentication, encryption, and access control.  The Ditto instance requests the Ditto Big Peer sign an x509 certificate, using the previously validated credentials and Authentication Token as proof of its identity. Use typically requires configuring an Authentication Provider for your App within the Ditto Big Peer portal, which can validate user-provided credentials. This identity also requires a developer-provided implementation of the `DittoAuthEventHandler` (`DittoAuthCallback`) interface. For a more thorough walkthrough for setting up authentication with your application, see the [tutorial](/guides/authentication/intro).  
* [SharedKey](/security/shared-key) - A secure Identity used for "private" Apps where the developer trusts all users, the Ditto-based App, and devices and would prefer a fully self-contained deployment. Ditto instances are each provided with a pre-shared key that is used for mutual authentication. This Identity does NOT support sync over the Big Peer. Typically used with some external device management solution which can provide and rotate the pre-shared key. Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* [Manual](/how-it-works/certificate-security) - An advanced Identity where the app developer will provide each Ditto instance with an x509 Client Certificate signed by a common, trusted Certificate Authority. Like `SharedKey` typically deployed along side existing PKI and device management solutions. This Identity cannot sync with the publicly-accessible Big Peer at `cloud.ditto.live` but may sync with a custom deployment. Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* [OfflinePlayground](/security/offline-playground) - An *unsecured* identity suitable for local testing, CI/CD pipelines, and peer-to-peer sync. Cloud sync is not permitted. All peers are automatically trusted and no authentication takes place. Do *not* use this Identity in production. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).

