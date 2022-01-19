---
title: Ditto Cloud HTTP Interface
sidebar_position: 7
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Ditto HTTP API provides a programmatic interface for interactions with Ditto Cloud. The canonical root URL for the HTTP API is `https://<app-uuid>.cloud.ditto.live/api/v1/`, for example `https://f81d4fae-7dec-11d0-a765-00a0c91e6bf6.cloud.ditto.live/api/v1/`

## Authorization

Access to the Ditto HTTP API is mediated by an `Authorization: Bearer` HTTP Header containing a valid, signed, JWT Token (RFC 7519). This token can be obtained from the appropriate login endpoint.

The JWT encodes the identity of the client, the target application, and the permissions the client is entitled to access.

## Transactions

Ditto uses transactions to group related operations together. Typically, each HTTP API Request represents a distinct transaction which may insert, update, or remove one or more documents. Because Ditto is also a distributed system, `Transaction ID`s are used to represent the order in which transactions should be applied. Thus queries also specify Transaction IDs, which represent the "version" of the data you wish to query. For example, if you insert some Events into a TimeSeries in Transaction 17 and then want to query that same TimeSeries. The newly inserted events may still be replicating through the Ditto mesh. Should these new events be returned in the query response? In other words, do the results of a query depend on whether or not the insertion is first applied? Transaction IDs help solve this problem.

In each API Request a `Transaction ID` may optionally be provided in an HTTP HEADER called `X-HYDRA-VERSION` with an integer value, which represents this request should be applied to the "version" of the data _at least_ as recent as this value. Using the example above, if we inserted some events in Transaction 17, and we wanted to ensure they were included in our subsequent query, we would include the header `X-HYDRA-VERSION: 17` in our request. If we don't supply this header, the default behavior is to use the most recent version common to all Ditto nodes. Note also that if the Ditto node servicing the Request can't supply the version of the data requested, an error will be returned.

In the example above, we mentioned that the insertion occurred in Transaction 17, but how does the client know this? When POSTing data to Ditto, the client should include an HTTP HEADER `X-HYDRA-CLIENT-ID: base64Encode(<unsigned 128 bit integer>)`.  This client ID is used as an unique identifier that represents a unique install of Ditto and the state of its memory.  To quickly get started with the API it is okay to base64Encode a random 128-bit integer and use that for all the HTTP requests for one client.

Potential Pitfall:  This ID represents a client in the Ditto mesh.  Generating a new ID for each request, rather than one for the HTTP client, could cause performance issues.  When possible generate this ID and cache it for the duration of the client.

Ditto uses "delete-wins" semantics, so in some situations the client may want to force Ditto to first read its current data and ensure another peer hasn't issued a concurrent DELETE request before attempting an insertion with a POST request. To do this, the client provides the HTTP HEADER `X-HYDRA-ENSURE-INSERT: true`.

## HTTP Methods

Ditto's HTTP API uses HTTP Methods (aka "verbs") to distinguish between typical insertion, deletion, update, fetch, and query operations. The mapping is based on common convention seen in RESTful HTTP APIs.

- GET - Used to get the version of an individual resource and to query a collection of resources.
- POST - Used to create one or more Documents in a Collection or Events in a TimeSeries. Requests that would insert a duplicate copy of a resource may result in a client error. The specific behavior for individual resources is described below.
- DELETE - Used to remove a resource. As discussed above other clients may try to concurrently insert or modify this resource, but DELETE requests take precedence.

## Common Query Parameters

- find - A query used to filter the target collection or time series
- limit - Used to limit the number of resources returned in a query. Most endpoints will define a default value, such as 1000.
  start - a date time for start, if none specified then from the start of collection.
  end - a date time for end, if none specified then to the end of the collection.
- timeout_millis - the number of milliseconds that hydra will wait for a full result set from the query


## Ditto API Resources

The Ditto HTTP API follows a RESTful pattern and is organized into several resources. API Resources typically map to the key elements of the [Ditto Data Model](https://www.ditto.live/docs/concepts/data-model). Applications may contain one or more `Collection`s of `Documents` or `TimeSeries` of `Event`s. JSON is used as the default representation for individual resources, and will be indicated by the `Content-Type` HTTP Header. Resources which are best represented by a sequence or stream of items are represented by [JSONlines](https://jsonlines.org), that is new line delimited JSON. This will be indicated by the MIME type `application/json-l`. UTF-8 encoding is used and required unless otherwise indicated. Binary data should be Base64 encoded. Where alternative representations are desired, the API Client may use the `Accept` HTTP Header to indicate this in the Request.



### Collection and Document Resources

#### URL TEMPLATE: `/api/v1/collections/{collection_name}/documents`

- GET - Query the documents in a collection

  Example Request

  ```
  GET /api/v1/collections/my-collection/documents?find=color%3D%3D'red' HTTP/1.1
  Accept: application/json-l
  Authorization: Bearer ${DITTO_JWT}
  X-HYDRA-VERSION: 1
  ```

  ```
  Query:

  find: "color=='red'"
  ```

  Response

  ```
  HTTP\1.1 200 OK
  Content-Type: application/json-l

  {"foo": 1, "color": "red"}
  {"bar": 2000, "color": "red"}
  ```

  #### URL TEMPLATE: `/api/v1/collections/{collection_name}/documents/{document_id}`


- POST - Insert a new document into a collection with given ID {id}.

  Example Request

  ```
  POST /api/v1/collections/my-collection/documents/car3781 HTTP/1.1
  Authorization: Bearer ${DITTO_JWT}
  Content-Type: application/json
  X-HYDRA-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==

  { "color": "blue" }
  ```

  Response

  ```
  HTTP/1.1 202 Accepted
  X-HYDRA-VERSION: 12
  Content-Type: application/json

  {"txn_id": 12}
  ```

- GET - Fetch a single document by its Document ID

  Example Request

  ```
  GET /api/v1/collections/my-collection/documents/cars3781 HTTP/1.1
  Authorization: Bearer ${DITTO_JWT}
  Accept: application/json
  X-HYDRA-VERSION: 12
  ```

  Response

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"foo": 45, "color": "blue"}
  ```

- DELETE - Remove a document from a collection

  Example Request

  ```
  DELETE /api/v1/collections/my-collection/documents/cars3781 HTTP/1.1
  Authorization: Bearer ${DITTO_JWT}
  X-HYDRA-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==
  ```

  Response

  ```
  HTTP/1.1 202 Accepted
  Content-Type: application/json

  {"txn_id": 9}
  ```


### TimeSeries and Events Resources

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
  - timeout_millis - the timeout, in milliseconds

  _Note: the `null` parameters are simply to show which parameters could be provided. These keys don't actually need to be present._

  Example Request

  ```
  GET /api/v1/timeseries/my-time-series/events?start=2021-04-20T00%3A00%3A00.0Z&end=&limit=50&filter= HTTP/1.1
  Accept: application/json-l
  Content-Type: application/json
  X-HYDRA-VERSION: 7
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

  *Important* – The `start` parameter must be earlier (less than) the `end` parameter so that the deleted range runs forward in time. This allows large ranges to be deleted in rapidly in a single transaction.
  To ensure your next query reflects the deletion, include the `txn_id` value as an `X-HYDRA-VERSION` header in your next request.

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

#### URL Template: `/api/v1/timeseries/<timeseries_id>/distinct_value`

- GET - Query for the distinct values in a timeseries, within a range of events in a TimeSeries using a half-open interval `[start, end)`. Returns a *single document* containing the aggregated paths and their distinct values.  Paths are specified as json arrays of strings. This query *expects a json body* in the following format:

  ```
  {"start":null,"end":null,"paths":[["minutes"]],"timeout_millis":null}
  ```
  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.
  - paths (array(array(string))) - Event paths for which the distict values should be calculated.
  - timeout_millis (number, optional) - Request will stop if it exceeds this time (defaults to 10_000).


  ```
  GET /api/v1/timeseries/my-time-series/distinct_value HTTP/1.1
  Accept: application/json-l
  Content-Type: application/json
  X-HYDRA-VERSION: 7

  {"start": null, "end": null,"paths":[["parent", "child", "grandchild"]],"timeout_millis":null}
  ```

  Response

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json-l
  X-HYDRA-VERSION: 7
  {"item":{"[\"parent\", \"child\", \"grandchild\"]":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]}}

  ```
  Note also the X-HYDRA-VERSION value is included the Response Header

  If there is an error once the stream has begun, it is communicated with a final json lines value, for example:

  ```
  {"error": "Timeout"}

  ```

### Events

An Event is the fundamental element of a TimeSeries. It consists of a timestamp and a document. The JSON API interface may optionally not require the series_id or time value.  Following is the JSON schema for an event:

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

Datetimes are used to indicate when a particular event occurred. 

They are encoded as RFC 3339 formatted strings, including the fractional seconds. If the fractional seconds are not supplied, 0 nanoseconds are assumed. If an offset (timezone) is not supplied, UTC is assumed. 

Queries which require an interval of time to be specified, or events where full nanosecond resolution is not required, can "truncate" the `Datetime` by rounding down to the start of the period of interest and framing the query as a comparison. For example, we one only cares about events with hourly resolution, an event which occurred at T17:36:12.12345 can be "rounded" to T17:00:00.0. The right-most non-zero digit of the Datetime or Timestamp determines the resolution of the Timeseries.

The JSON schema for a `DateTime` String is shown below:

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