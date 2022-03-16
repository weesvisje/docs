---
title: 'Identities'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document explains in detail what Ditto Identities are, the different types of Identities available, the capabilities of each Identity, and how to configure your Ditto App to use a specific Identity.

Authentication and Access Control within Ditto Apps are controlled by Ditto Identities.

The Ditto Identity is one of the main inputs to the Ditto Constructor and controls how your local Ditto instance will communicate with the Ditto Cloud and other Ditto Peers.

A Ditto Identity is typically validated by the Ditto Cloud and then used to establish trust and secure communications with peer instances.

Further, your Ditto Identity determines the read and write permissions to data and is associated to a set of access control permissions.

Each Ditto Identity is associated to a single Ditto App via a globally unique AppId and may not be used across multiple Ditto Apps.

Each App User that should be uniquely identified should have a distinct Ditto Identity.


### Ditto Identity Lifecycle

While highly configurable, each Ditto Identity has a typical life cycle. First, early in the App's life cycle the Ditto Identity is constructed.

Typically the only prerequisites are a Ditto persistence root (working directory for local data storage, where configured) and a globally unique Ditto App Id. In order to sync Documents and Timeseries Events, all App instances, regardless of SDK language, *must* have the same globally unique Ditto AppId. Therefore this value will typically be incorporated in the App's bundle or provided to the App when it starts.

Some Ditto Identities require additional inputs to construct, and these will be discussed subsequently.

Next the Ditto Identity is consumed by the Ditto constructor, yielding a properly configured `Ditto` instance. The Ditto instance will contain a Ditto Authenticator and often your own type which implements the `DittoAuthEventHandler` interface and provides login credentials. Ditto will use these types to contact the configured Auth Url and supply the login credentials to an Authentication Provider. If the credentials are valid, then the Authentication Provider will return to Ditto an Authentication Token, validating its credentials and granting the Ditto instance individualized permissions. The Ditto instance can now sync with the Ditto Cloud (Big Peer).

Generally the Ditto Cloud is not the actual Auth Provider, but a "proxy" to your own "source of truth" for identities, credential validation, and permissions.

Depending on the Identity used, the Ditto instance may then request the Ditto Cloud (Big Peer) sign an x509 certificate, using the previously validated credentials and Authentication Token as proof of its identity. The Ditto Cloud will then return the signed x509 certificate. This certificate may then be presented to other Ditto peers to mutually establish trust and create encrypted communications channels.

### Parts of a Ditto Identity

* `AppId` - Uniquely Identifies a Ditto-based App. It establishes a top-level "namespace" within which all Ditto Identities, collections of documents, timeseries events, and permissions live. It is a part of all Identity types. It may be either a string or, more typically, a UUID v4 lowercased and hyphenated. Only `UUIDv4` `AppId`s registered with the Ditto Cloud can be used to sync with Ditto Cloud.
* `CustomAuthUrl` - The URL of an Auth Provider which can validate credentials and issue Auth Tokens and x509 certificates. The default values is `https://<app-id>.cloud.ditto.live/`. A `CustomAuthUrl` is only required when another, possibly self-hosted, Auth Provider is preferred. `OfflinePlayground`, `SharedKey`, and `Manual` Identities don't require any AuthURL.
* `EnableCloudSync` - Whether Ditto should attempt to sync with `wss://<app-id>.cloud.ditto.live`. Only used by `OnlineWithAuthentication` and `OnlinePlayground` Identities. If you're hosting your own Ditto Big Peer, this should be set to `false` and a custom SyncUrl provided to the Ditto `TransportConfig`
* `WorkingDir` (DittoRoot) - A location where Ditto can cache Auth Tokens, x509 certificates, and other auth-related data. Typically the same as the working directory containing Ditto's local data store.
* `AuthEventHandler` (Callback) - A type defined by the App developer which implements the `DittoAuthEventHandler` (`DittoAuthCallback`) Trait/Interface/Protocol. Typically responsible for obtaining and storing credentials like a username, password, or other token from the App's user and then supplying them to Ditto when authentication is required.

### Subtypes of Ditto Identity

* [OnlinePlayground](/concepts/online-playground) - An insecure identity for prototyping and development use. All modes of sync are supported but no Authentication Provider needs to be configured. Instead, all users will receive full read and write permissions to all App collections and timeseries. Do not use this Identity in production. No `DittoAuthEventHandler` needs to be provided.
* [OnlineWithAuthentication](/security/online-with-authentication/overview) - Use this identity for most production Apps. The `OnlineWithAuthentication` identity supports both Cloud and peer-to-peer sync with secure authentication, encryption, and access control. Use typically requires configuring an Authentication Provider for your App within the Ditto Cloud portal, which can validate user-provided credentials. This identity also requires a developer-provided implementation of the `DittoAuthEventHandler` (`DittoAuthCallback`) interface. For a more thorough walkthrough for setting up authentication with your application, see the [tutorial](/tutorials/authentication/intro).  
* [SharedKey](/security/certificate-security) - A secure Identity used for "private" Apps where the developer trusts all users, the Ditto-based App, and devices and would prefer a fully self-contained deployment. Ditto instances are each provided with a pre-shared key that is used for mutual authentication. This Identity does NOT support Cloud sync. Typically used with some external device management solution which can provide and rotate the pre-shared key. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* `Manual` - An advanced Identity where the App developer will provide each Ditto instance with an x509 Client Certificate signed by a common, trusted Certificate Authority. Like `SharedKey` typically deployed along side existing PKI and device management solutions. This Identity cannot sync with `cloud.ditto.live` but may sync with a custom deployment of a Big Peer. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).
* `OfflinePlayground` - An *unsecured* identity suitable for local testing, CI/CD pipelines, and peer-to-peer sync. Cloud sync is not permitted. All peers are automatically trusted and no authentication takes place. Do *not* use this Identity in production. Given that this identity doesn't use the Ditto cloud, Ditto instances using this identity must be activated with an offline only license token that can be requested from the app settings page on the [portal](https://portal.ditto.live).

