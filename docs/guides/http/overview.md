---
title: 'Overview'
sidebar_position: 1
---

The Ditto HTTP API follows a RESTful pattern and is organized into several resources. API Resources typically map to the key elements of the [Ditto Data Model](/concepts/overview). Applications may contain one or more `Collection`s of `Documents` or `TimeSeries` of `Event`s. JSON is used as the default representation for individual resources, and will be indicated by the `Content-Type` HTTP Header. Resources which are best represented by a sequence or stream of items are represented by [JSONlines](https://jsonlines.org), that is new line delimited JSON. This will be indicated by the MIME type `application/json-l`. UTF-8 encoding is used and required unless otherwise indicated. Binary data should be Base64 encoded. Where alternative representations are desired, the API Client may use the `Accept` HTTP Header to indicate this in the Request.

<!-- Currently, Collections and TimeSeries can't be edited directly as top level API resources; only operations on the underlying documents are supported. Collections and TimeSeries are created implicitly by inserting into them. Later, we may add the ability to create, configure, and delete entire collections and timeseries directly.-->
<!-- This document is intended to serve as a public facing guide to the entire HTTP API at the time we deliver Particle phase 1. Items for future work or discussion will be called out in comments like this. -->

## Endpoint

The Ditto HTTP API provides a programmatic interface for interactions with Ditto-powered Apps which expose an HTTP Server Interface. A primary use case for the HTTP API is external systems which integrate with `cloud.ditto.live`.

The canonical root URL for the HTTP API is `https://<app-uuid>.cloud.ditto.live/api/v1/`. The standard port 443 is used.

```bash
curl https://f81d4fae-7dec-11d0-a765-00a0c91e6bf6.cloud.ditto.live/api/v1
```

For simple examples for using the HTTP API for document storage, see the corresponding sections in the Concepts section for [querying](/concepts/querying), [update](/concepts/update), and [remove](/concepts/remove). 

Ditto Big Peer also provides HTTP APIs for querying timeseries data. See the [timeseries section](/guides/http/timeseries) for more information.

In addition to these examples, we also have JSON schema documents that help describe the request bodies and responses. They can be helpful if you have any questions on what any field means or what the server might return.

## Errors

Ditto HTTP API errors are indicated with an HTTP Status Code and with a JSON response body containing an object with a single "error" key. This Error object contains the following fields:

- error.code - The HTTP Status Code for
- error.message - A short description of the error
- error.data - An optional object which contains further elaboration about the error

## Authorization

Access to the Ditto HTTP API is mediated by an `Authorization: Bearer` HTTP Header containing a valid, signed, JWT Token (RFC 7519). This token can be obtained from the following endpoint: `https://<app-uuid>.cloud.ditto.live/_ditto/auth/login`. See [Online With Authentication](/security/online-with-authentication) to secure your HTTP endpoint.

The JWT encodes the identity of the client, the target application, and the permissions the client is entitled to access.

## Generating an X-DITTO-CLIENT-ID

An `X-DITTO-CLIENT-ID` is required whenever issuing POST requests to the HTTP API. You should generate one for each client, as this ID represents a client in the Ditto mesh. Generating a new ID for each request, rather than one for the HTTP client, could cause performance issues. When possible generate this ID and cache it for the duration of the client.

```python
>>> import base64
>>> site_id = 5
>>> epoch = 0
>>> site_id_bytes = site_id.to_bytes(8,'big')
>>> epoch_bytes = epoch.to_bytes(8, 'big')
>>> actor_id_bytes = site_id_bytes + epoch_bytes
>>> actor_id_bytes
b'\x00\x00\x00\x00\x00\x00\x00\x05\x00\x00\x00\x00\x00\x00\x00\x00'
>>> base64.b64encode(actor_id_bytes)
b'AAAAAAAAAAUAAAAAAAAAAA=='
```