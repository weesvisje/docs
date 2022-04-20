---
title: 'HTTP API'
---

<!-- This document is intended to serve as a public facing guide to the entire HTTP API at the time we deliver Particle phase 1. Items for future work or discussion will be called out in comments like this. -->

The Ditto HTTP API provides a programmatic interface for interactions with Ditto-powered Apps which expose an HTTP Server Interface. A primary use case for the HTTP API is external systems which integrate with `cloud.ditto.live`.

## Overview

The canonical root URL for the HTTP API is `https://<app-uuid>.cloud.ditto.live/api/v1/`. The standard port 443 is used.

```bash
curl https://f81d4fae-7dec-11d0-a765-00a0c91e6bf6.cloud.ditto.live/api/v1
```

For simple examples for using the HTTP API for document storage, see the corresponding sections in the Concepts section for [querying](/concepts/querying), [update](/concepts/update), and [remove](/concepts/remove). 

Ditto Big Peer also provides HTTP APIs for querying timeseries data. See the [timeseries section](#timeseries) for more information.

In addition to these examples, we also have JSON schema documents that help describe the request bodies and responses. They can be helpful if you have any questions on what any field means or what the server might return.

<details>
<summary>RPC Request Schema</summary>

  ```json
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "RPC Request",
    "description": "This is defines the contents of any request to /api/v1/store.  This object should be serialized as JSON or CBOR and be in the body of the POST",
    "oneOf": [
      {
        "title": "Find Parameters",
        "type": "object",
        "required": [
          "method",
          "parameters"
        ],
        "properties": {
          "method": {
            "type": "string",
            "enum": [
              "find"
            ]
          },
          "parameters": {
            "type": "object",
            "required": [
              "args",
              "collection",
              "query"
            ],
            "properties": {
              "args": {
                "title": "Query Arguments",
                "description": "If any variables are used in the query then the values should be passed in here.",
                "type": [
                  "object",
                  "null"
                ]
              },
              "collection": {
                "title": "Collection",
                "description": "The name of the collection to query",
                "type": "string"
              },
              "limit": {
                "title": "Limit",
                "description": "The maximum number of values to return",
                "default": 1000,
                "type": "integer",
                "format": "uint32",
                "maximum": 10000.0,
                "minimum": 0.0
              },
              "offset": {
                "title": "Offset",
                "description": "The number of records to skip at the beginning of a query",
                "type": [
                  "integer",
                  "null"
                ],
                "format": "uint32",
                "minimum": 0.0
              },
              "query": {
                "title": "Query",
                "description": "The query to run",
                "type": "string"
              }
            }
          }
        }
      },
      {
        "title": "FindById Parameters",
        "type": "object",
        "required": [
          "method",
          "parameters"
        ],
        "properties": {
          "method": {
            "type": "string",
            "enum": [
              "findById"
            ]
          },
          "parameters": {
            "type": "object",
            "required": [
              "_id",
              "collection"
            ],
            "properties": {
              "_id": {
                "$ref": "#/definitions/AnyValue"
              },
              "collection": {
                "title": "Collection",
                "description": "The name of the collection to query",
                "type": "string"
              }
            }
          }
        }
      },
      {
        "title": "Write Parameters",
        "type": "object",
        "required": [
          "method",
          "parameters"
        ],
        "properties": {
          "method": {
            "type": "string",
            "enum": [
              "write"
            ]
          },
          "parameters": {
            "type": "object",
            "required": [
              "commands"
            ],
            "properties": {
              "commands": {
                "title": "Commands",
                "description": "The list of all write commands to be run",
                "type": "array",
                "items": {
                  "$ref": "#/definitions/WriteCommand"
                }
              }
            }
          }
        }
      }
    ],
    "definitions": {
      "AnyValue": true,
      "WriteCommand": {
        "oneOf": [
          {
            "title": "Upsert Command",
            "description": "If a value matching this ID exists, update it with the contents of value.  If it doesn't exist, insert it.",
            "type": "object",
            "required": [
              "collection",
              "method",
              "value"
            ],
            "properties": {
              "collection": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "enum": [
                  "upsert"
                ]
              },
              "value": {
                "title": "Value to Upsert",
                "description": "The new document to insert.  This must document be an object with an _id parameter",
                "type": "object"
              }
            }
          }
        ]
      }
    }
  }
  ```
</details>

<details>
<summary>RPC Response Schema</summary>


  ```json
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "RpcResponse",
    "anyOf": [
      {
        "title": "FindById Response",
        "type": "object",
        "properties": {
          "document": {
            "title": "Document",
            "description": "The contents of the document, if found",
            "anyOf": [
              {
                "$ref": "#/definitions/AnyValue"
              },
              {
                "type": "null"
              }
            ]
          },
          "version": {
            "title": "Version",
            "type": [
              "integer",
              "null"
            ],
            "format": "uint64",
            "minimum": 0.0
          }
        }
      },
      {
        "title": "Find Response",
        "type": "object",
        "required": [
          "documents"
        ],
        "properties": {
          "documents": {
            "title": "Documents",
            "description": "All documents matching the query.  If none the array will be empty",
            "type": "array",
            "items": {
              "$ref": "#/definitions/AnyValue"
            }
          },
          "version": {
            "title": "Version",
            "type": [
              "integer",
              "null"
            ],
            "format": "uint64",
            "minimum": 0.0
          }
        }
      },
      {
        "title": "Write Response",
        "type": "object",
        "required": [
          "results"
        ],
        "properties": {
          "results": {
            "title": "Results",
            "description": "The individual results of each write command in the call",
            "type": "array",
            "items": {
              "$ref": "#/definitions/WriteCommandResult"
            }
          }
        }
      }
    ],
    "definitions": {
      "AnyValue": true,
      "WriteCommandResult": {
        "oneOf": [
          {
            "title": "Upsert Command Result",
            "type": "object",
            "required": [
              "method",
              "transactionId"
            ],
            "properties": {
              "method": {
                "type": "string",
                "enum": [
                  "upsert"
                ]
              },
              "transactionId": {
                "title": "Transaction ID",
                "description": "The ID of the transaction for the insert or update.  Use this to ensure read-follows-writes consistency.",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              }
            }
          }
        ]
      }
    }
  }
  ```


</details>


## Authorization

Access to the Ditto HTTP API is mediated by an `Authorization: Bearer` HTTP Header containing a valid, signed, JWT Token (RFC 7519). This token can be obtained from the appropriate `login` endpoint.

The JWT encodes the identity of the client, the target application, and the permissions the client is entitled to access.

## Transactions

Ditto uses transactions to group related operations together. Typically, each HTTP API Request represents a distinct transaction which may insert, update, or remove one or more documents. Because Ditto is also a distributed system, `Transaction ID`s are used to represent the order in which transactions should be applied. Thus queries also specify Transaction IDs, which represent the "version" of the data you wish to query. For example, if you insert some Events into a TimeSeries in Transaction 17 and then want to query that same TimeSeries. The newly inserted events may still be replicating through the Ditto mesh. Should these new events be returned in the query response? In other words, do the results of a query depend on whether or not the insertion is first applied? Transaction IDs help solve this problem.

In each API Request a `Transaction ID` may optionally be provided in an HTTP HEADER called `X-HYDRA-VERSION` with an integer value, which represents this request should be applied to the "version" of the data _at least_ as recent as this value. Using the example above, if we inserted some events in Transaction 17, and we wanted to ensure they were included in our subsequent query, we would include the header `X-HYDRA-VERSION: 17` in our request. If we don't supply this header, the default behavior is to use the most recent version common to all Ditto nodes. Note also that if the Ditto node servicing the Request can't supply the version of the data requested, an error will be returned.

<!-- Current implementation requires an Actor ID however in the future only the Site ID will be needed. -->

In the example above, we mentioned that the insertion occurred in Transaction 17, but how does the client know this? When POSTing data to Ditto, the client should include an HTTP HEADER `X-HYDRA-CLIENT-ID: base64Encode(<u128 Actor ID>)`, that is a `Actor ID` which can be parsed as an u128 and which has been base64 encoded. The Actor ID represents which peer in the Ditto mesh is writing to Ditto. You can [generate an Actor ID](#generating-an-actor-id) by concatenating the Big Endian bytes for a Site ID and the current Epoch. You should typically use the same Site ID scheme as your other SDK-based Ditto Apps and only change your Site ID when you want to indicate a new client is inserting or deleting data. If successful, the response to POST or DELETE requests will include a Transaction ID, which can be used on subsequent GET requests. This type of insertion is non-blocking and so is very performant.

Ditto uses "delete-wins" semantics, so in some situations the client may want to force Ditto to first read its current data and ensure another peer hasn't issued a concurrent DELETE request before attempting an insertion with a POST request. To do this, the client provides the HTTP HEADER `X-HYDRA-ENSURE-INSERT: true`.


## Errors

Ditto HTTP API errors are indicated with an HTTP Status Code and with a JSON response body containing an object with a single "error" key. This Error object contains the following fields:

- error.code - The HTTP Status Code for
- error.message - A short description of the error
- error.data - An optional object which contains further elaboration about the error

## Generating an X-HYDRA-CLIENT-ID

An `X-HYDRA-CLIENT-ID` is required whenever issuing POST requests to the HTTP API. You should generate one for each client, as this ID represents a client in the Ditto mesh. Generating a new ID for each request, rather than one for the HTTP client, could cause performance issues. When possible generate this ID and cache it for the duration of the client.

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

## Ditto API Resources

The Ditto HTTP API follows a RESTful pattern and is organized into several resources. API Resources typically map to the key elements of the [Ditto Data Model](https://www.ditto.live/docs/concepts/overview). Applications may contain one or more `Collection`s of `Documents` or `TimeSeries` of `Event`s. JSON is used as the default representation for individual resources, and will be indicated by the `Content-Type` HTTP Header. Resources which are best represented by a sequence or stream of items are represented by [JSONlines](https://jsonlines.org), that is new line delimited JSON. This will be indicated by the MIME type `application/json-l`. UTF-8 encoding is used and required unless otherwise indicated. Binary data should be Base64 encoded. Where alternative representations are desired, the API Client may use the `Accept` HTTP Header to indicate this in the Request.

<!-- Currently, Collections and TimeSeries can't be edited directly as top level API resources; only operations on the underlying documents are supported. Collections and TimeSeries are created implicitly by inserting into them. Later, we may add the ability to create, configure, and delete entire collections and timeseries directly.-->

### Collection and Document Resources

All RPC requests are POSTs to `/api/v1/store`.  All methods will accept or return JSON or CBOR depending on the accept and content-type headers you use.  There are a few parameters that are required for all methods.  First is the `method` field; today the valid options are `write`, `find` and `findById`.  The second required field is `parameters` which will contain an object of parameters to that method.  The contents of the parameter field will depend on which method is being used.  

#### Example

Below see an example HTTP request. Notice that commands is an array.  You are able to string together multiple write commands together in order here and each will be performed serially.  The response will contain an individual result object for each write command.  Each write will be in a separate transaction and the transaction IDs can be found in the response.

```bash
curl --verbose -X POST --data '{
   "method": "write",
   "parameters": {
      "commands": [{
         "method": "upsert",
         "collection": "cars",
         "value": {
            "_id": "car",
            "make": "Toyota",
            "year": 2004
         }
      }]
   }
}'  -H 'X-HYDRA-CLIENT-ID: AAAAAAAAAAAAAAAAAAAAew==' -H 'Content-Type: application/json' -H 'Accept: application/json' http://${APP_DOMAIN}/api/v1/store
```

The resulting response will be:

```
{"results":[{"method":"upsert","transactionId":62}]}
```

For more examples, see the corresponding sections in the Concepts section for [querying](/concepts/querying), [update](/concepts/update), and [remove](/concepts/remove).

:::info

**Can I do a query inside of an upsert as part of the HTTP API?**

Unfortunately no. The HTTP API will look to see if a document with that _id
exists, if so it will merge the two and then insert. To implement `update`
behavior, you must issue two HTTP requests. First, send a [find
request](/concepts/querying), and then based on that, you can `upsert` the
document.

::::

### TimeSeries 

#### URL Template: `/api/v1/timeseries`

_Reserved for future use_

#### URL Template: `/api/v1/timeseries/<timeseries_id>/events`

- POST - Batch Upload Events to a specific time series. Unless required, we won't use the `X-HYDRA-ENSURE-INSERT` header unless we have reason to believe another client could by issuing a concurrent delete request. Note that `_time` is provided as a RFC3339 formatted string in this JSON API. See `Event` JSON Schema below for details of the required fields.

  In the event the TimeSeries `my-time-series` does not exist, the time series will be created provided the client's JWT contains a write permission with a regex matching `my-time-series`.

  Note that the DateTime provided in `_time` is treated "as is" and is not validated beyond parsing and basic verification.

  _NOTE: Each entry must be on a single line, new line characters delimit individual values in json-lines._

  Example Request

  ```
  POST /api/v1/timeseries/my-time-series/events HTTP/1.1
  Content-Type: application/json-l
  Authorization: Bearer ${DITTO_JWT}
  X-HYDRA-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==

  { "_time": "2021-04-20T12:34:56.123456789Z", "temp": { "value": 30, "units": "celsius" }, "humidity": { "relative": 30, "absolute": 15, "units": "g/m3" } }
  ```

  Response

  Since the posted data is not returned, we use a Status 200 to indicate the new events have been accepted and are being replicated throughout Ditto. The `X-HYDRA-VERSION` header is provided to indicate the Transaction ID associated with the insert.

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"txn_id": 10}
  ```

- GET - Query a range of events in a TimeSeries using a half-open interval `[start, end)`. Returns a stream of events in chronological order.
  Note also the X-HYDRA-VERSION value is echoed back in the Response Header

  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.
  - limit (number, optional) - The maximum number of events to return. Defaults to 1000.
  - filter (string, optional) - A dittoQL string
  - timeout_millis (number, optional) - the timeout, in milliseconds
  - describe - a boolean that when absent or false does nothing, but when `true` rather than performing the query will return a single item that contains information about the query plan that would be executed for the given query

Here is an example of the `describe` parameter output:

```
curl -X GET "localhost:8000/00000000-0000-4000-8000-000000000000/api/v1/timeseries/0/events?describe=true&filter=device==1"
{"item": {"index_scan":{"eq":1,"path":["device"]}}}
```

  _Note: the `null` parameters are simply to show which parameters could be provided. These keys don't actually need to be present._

  Example Request

  ```
  GET /api/v1/timeseries/my-time-series/events?start=2021-04-20T00%3A00%3A00.0Z&end=&limit=50&filter= HTTP/1.1
  Accept: application/json-l
  Content-Type: application/json
  X-HYDRA-VERSION: 7
  ```

  Or you can provide the query in the body of the request as a JSON object. If you want to sort your results using order-by then you must provide the query in the request body. JSON Query Object parameters are as above with the addition of a new parameter `order_by` which is an array of pairs `[path, direction]` where the pair has to be encoded as an array in JSON (which has no tuple variant.) `Path` is ditto_ql expression. Direction must be an integer where a negative integer indicates sort Descending, and a positive value means sort Ascending.

Example JSON

```
{
  "start": "2021-04-20T00:00:00.0Z"
  "end": null,
  "limit": 500,
  "filter": "a >= 1",
  "timeout_millis": 500,
  "order_by": [["a.b", -1], ["c", 1]]
}
```

  Response

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json-l
  X-HYDRA-VERSION: 7

  {"item": {"_time": "2021-04-20T12:34:56.123456789Z", "value": {"temp": {"value": 30, "units": "celsius"}, "humidity": {"relative": 30, "absolute": 15, "units": "g/m3"}}}}

  ```

  If there is an error once the stream has begun, it is communicated with a final json lines value, for example:

  ```
  {"error": "Timeout"}

  ```

- DELETE - Delete a Range of Events from a TimeSeries. Accepts most of the same arguments as GET to restrict DELETE to matching events.

  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.

  ```
  DELETE /api/v1/timeseries/my-time-series/events?start=2020-01-01T00%3A00%3A00.0Z&end=2021-01-01T00%3A00%3A00.0Z HTTP/1.1
  Content-Type: application/json
  X-HYDRA-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==
  ```

  Response

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"txn_id": 15}
  ```

#### URL Template: `/api/v2/timeseries/<timeseries_id>/distinct_values`

- GET - Query for the distinct values in a timeseries, within a range of events in a TimeSeries using a half-open interval `[start, end)` (optional). Returns a single document containing the paths and their distinct values.  Paths are specified as json arrays of strings. This query expects a body of json in the following format:

  ```
  {
    "start": null,
    "end": null,
    "paths": [
      "minutes",
      "nested.device_id",
      "nested.tags[*]",
      "nested",
      "nested.tags"
    ]
  }
  ```

  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.
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
  X-HYDRA-VERSION: 7
  {
    "item": {
      "minutes": [1, 2, 3],
      "nested.device_id": ["device1", "device2"],
      "nested.tags[*]": ["tag1", "tag2"],
      "nested": [{}],
      "nested.tags": [[]],
    }
  }

  ```
  Note also the X-HYDRA-VERSION value is included the Response Header

  If there is an error once the stream has begun, it is communicated with a final json lines value, for example:

  ```
  {"error": "Timeout"}

  ```
### Events

#### URL Template: `/api/v1/events`

_Reserved for future use_

## JSON Representation of Key Resources

### Event

An Event is the fundamental element of a TimeSeries. It consists of a timestamp and a document. The JSON API interface may optionally not require the series_id or time value.

```json
{
  "$id": "https://ditto.live/event.schema.json",
  "title": "Event",
  "description": "An element in a TimeSeries indexed by a TimeStamp",
  "type": "object",
  "properties": {
    "time": {
      "type": "string",
      "format": "date-time",
      "description": "The RFC 3339 Formated timestamp when the event occurred"
    },
    "value": {
      "type": "object",
      "description": "The content of the event"
    },
    "timeseries_id": {
      "type": "string",
      "description": "The ID of the TimeSeries of which this event is a member"
    }
  },
  "required": ["time", "value"]
}
```

### Datetime

Datetimes are used to indicate when a particular event occurred. In a binary context, timestamps are stored with the [TAI64N](https://cr.yp.to/libtai/tai64.html#tai64n) format, but in a JSON context RFC 3339 formatted strings are used, including the fractional seconds. If the fractional seconds are not supplied, 0 nanoseconds are assumed. If an offset (timezone) is not supplied, UTC is assumed. The term `Datetime` is used to represent the RFC3339-formated String representation, while `Timestamp` is used to represent the binary encoding. The two types are generally inter-convertable. However, some client libraries may not fully preserve the full resolution of the `Datetime` during round trip serialization.

Queries which require an interval of time to be specified, or events where full nanosecond resolution is not required, can "truncate" the `Datetime` by rounding down to the start of the period of interest and framing the query as a comparison. For example, when one only cares about events with hourly resolution, an event which occurred at T17:36:12.12345 can be "rounded" to T17:00:00.0. The right-most non-zero digit of the Datetime or Timestamp determines the resolution of the Timeseries.

The JSON Validation Schema for a `DateTime` String is shown below:

```json
{
  "$id": "Datetime.schema.json",
  "title": "Datetime",
  "type": "string",
  "format": "date-time",
  "contentSchema": {
    "type": "object",
    "properties": {
      "full-year": { "type": "number" },
      "month": { "type": "number" },
      "day": { "type": "number" },
      "hour": { "type": "number" },
      "minute": { "type": "number" },
      "second": { "type": "number" },
      "secfrac": {
        "type": "number",
        "description": "The decimal number of fractional seconds into the indicated second when the event occurred",
        "default": 0
      },
      "offset": {
        "type": "number",
        "description": "The number of hours +/- UTC for the local timezone where the event occurred",
        "default": 0
      }
    },
    "required": ["year", "month", "day", "hour", "minute", "second"]
  }
}
```

`Timestamp` has a binary representation which is more compact (12 bytes), shown below.

```rust
struct Timestamp {
    pub epoch: i64,
    pub nanos: u32
}
```
