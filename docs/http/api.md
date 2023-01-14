---
title: 'API Reference'
sidebar_position: 2
---

## OpenAPI 

The Open API `swagger.json` spec can be found at the following URL:

* `https://{app_id}.cloud.ditto.live/api/v2/swagger.json`

## Usage

The HTTP API is accessible through the `https://{app_id}.cloud.ditto.live/api/v3/store/[method]` endpoint.

### Endpoints

* `/api/v3/store/write`
* `/api/v3/store/findbyid`
* `/api/v3/store/find`


### Write

A full example with `curl` that shows how to use the HTTP API to create explicit
types. In this example, we create a `friends` key with a Register that is an
array, and `orderCount` which is a counter.


```
curl -X POST 'https://{app_id}.cloud.ditto.live/api/v3/store/write' \
  --header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "commands": [{
        "method": "upsert",
        "collection": "people",
        "id": "123abc",
        "value": {
          "name": "John",
          "friends": ["Susan"],
          "orderCount": 5
        },
        "valueTypeOverrides": {
          "orderCount": "counter"
        }
      }]
  }'
```

To create and modify a mutable type such as Register Map or Counter in the HTTP API
for v2, you can annotate the value with the type you intend to use. In v2, Arrays are registers by default. That means you do not need to add
`register` to the `valueTypeOverrides` payload, but you can if you want to be
explicit.

In this example, We use the `counter` override by adding the following key to the payload:

```
"valueTypeOverrides": {
  "orderCount": "counter",
  "friends": "register"
}
```

:::info
**Can I issue a find query inside of a write command?**

No. First, send a `find`, and then after a response, send an `write` request.
::::

### FindByID


To find this document you can use `/api/v3/store/findbyid`:
```
curl --location --request POST 'https://{app_id}.cloud.ditto.live/api/v2/store/findbyid' \
--header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
--header 'Content-Type: application/json' \
--data-raw '{
  "collection": "people",
  "id": "123abc"
}'
```

```
{
  "collection": "people",
  "id": "123abc"
}
```

### Find

When you query for this data using `/api/v3/store/find`, you can use the key `serializedAs: latestValuesAndTypes`  to receive a response with each
type specified:

Request:
```
curl -X POST 'https://{app_id}.cloud.ditto.live/api/v2/store/find' \
  --header 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "collection": "people",
    "query": "name=='John'",
    "limit": 2,
    "serializedAs": "latestValuesAndTypes"
}'
```

Response: 

```json
{
  "value": {
    "_id": "123abc",
    "fields": {
      "name": {
          "register": { "value": "John" },
      },
      "friends": {
          "register": { "value": ["Susan"] },
      },
      "orderCount": {
          "counter": { "value": 5 }
      },
    }
  }
}
```

For more examples, see the corresponding sections in the Concepts section for [querying](./common/concepts/querying), [writing](./common/concepts/writing), and [remove](./common/concepts/remove).

## Distinct Values

`POST https://{app_id}.cloud.ditto.live/api/v1/collections/<collection_name>/distinct_values`

Query for the distinct values in a collection. Returns a single document containing the paths and their distinct values.  Paths are specified as json arrays of strings. This query expects a body of json in the following format:

  ```
  {
    "filter": "true"
    "paths": [
      "widgets",
      "nested.device_id",
      "nested.tags[*]",
      "nested",
      "nested.tags"
    ]
  }
  ```
  
  
Parameters

  - filter - The query used to select documents.
  - paths (list) - A list of DittoQl paths to get distinct values for. See Supported Paths section below.
  - timeout_millis (number, optional) - the timeout, in milliseconds

Supported paths

  - Field access. Eg. `fieldA`, `fieldA.fieldB`.
  - Array projection. Eg. `fieldA.arrayB[*]`, `fieldA.arrayB[*].fieldC`.
  - No other access methods are supported.

Response

  The response will contain an object where the keys are the requested paths (same format as the request) and their values are the unique values at the respective paths.
  Note that only primitive values are returned distinctly. Any arrays or objects present at the specified path will appear in the result as an empty array `{}` or object `{}` respectively.

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json
  X-DITTO-TXN-ID: 7
  {
    "item": {
      "widgets": [1, 2, 3],
      "nested.device_id": ["device1", "device2"],
      "nested.tags[*]": ["tag1", "tag2"],
      "nested": [{}],
      "nested.tags": [[]],
    }
  }

  ```
