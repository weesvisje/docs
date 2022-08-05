---
title: 'Timeseries'
sidebar_position: 3
---

## Events


`https://{app_id}>.cloud.ditto.live/api/v1/timeseries/<timeseries_id>/events`

### `POST` 

Batch Upload Events to a specific time series. Unless required, we won't use the `X-DITTO-ENSURE-INSERT` header unless we have reason to believe another client could by issuing a concurrent delete request. Note that `_time` is provided as a RFC3339 formatted string in this JSON API. See `Event` JSON Schema below for details of the required fields.

  In the event the TimeSeries `my-time-series` does not exist, the time series will be created provided the client's JWT contains a write permission with a regex matching `my-time-series`.

  Note that the DateTime provided in `_time` is treated "as is" and is not validated beyond parsing and basic verification.

  _NOTE: Each entry must be on a single line, new line characters delimit individual values in json-lines._

  Example Request

  ```
  POST /api/v1/timeseries/my-time-series/events HTTP/1.1
  Content-Type: application/json-l
  Authorization: Bearer ${DITTO_JWT}
  X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==

  { "_time": "2021-04-20T12:34:56.123456789Z", "temp": { "value": 30, "units": "celsius" }, "humidity": { "relative": 30, "absolute": 15, "units": "g/m3" } }
  ```

  Response

  Since the posted data is not returned, we use a Status 200 to indicate the new events have been accepted and are being replicated throughout Ditto. The `X-DITTO-TXN-ID` header is provided to indicate the Transaction ID associated with the insert.

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"txn_id": 10}
  ```

#### TTL

An event can be given a 'TTL' or 'time to live,' after which the event will expire and be deleted from the database. The event expiration can be specified in 3 ways, in order of preference:

* `_expiration` field in the event body.
* `X-EVENT-TTL-SECONDS` in the HTTP header.
* A document in the `__timeseries` collection with `_id` equal to the timeseries name and a `default_ttl_seconds` field with a numeric value.

An `_expiration` field will be added automatically event to the event if it takes the expiration from the HTTP header or `__timeseries` collection.

### ```GET```

Query a range of events in a TimeSeries using a half-open interval `[start, end)`. Returns a stream of events in chronological order.
  Note also the X-DITTO-TXN-ID value is echoed back in the Response Header

  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.
  - limit (number, optional) - The maximum number of events to return. Defaults to 1000.
  - filter (string, optional) - A dittoQL string
  - fill_template (object, optional) - A fill operator template (see [Filling missing fields](#filling-missing-fields) section below)
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
  X-DITTO-TXN-ID: 7
  ```

  Or you can provide the query in the body of the request as a JSON object. If you want to sort your results using order-by then you must provide the query in the request body. JSON Query Object parameters are as above with the addition of a new parameter `order_by` which is an array of pairs `[path, direction]` where the pair has to be encoded as an array in JSON (which has no tuple variant.) `Path` is ditto_ql expression. Direction must be an integer where a negative integer indicates sort Descending, and a positive value means sort Ascending.

  #### Filling missing fields

  By providing a fill template it's possible to fill absent fields (including nested ones) in the query results with a default value or a value from the previous result. `"$PREVIOUS"` is a special value that resolves to the value of the previous result, in the absence of one it becomes `null`.

  ##### Example

  Raw Results:
  * `{"c": 1}`
  * `{"b": 0, "n": {"a": 0, "c": 1}}`
  * `{"a": 0}`
  * `{"a": 0, "n": null}`

  Template:
  * `{"a":  -1, "n": {"c": "$PREVIOUS"}}`

  Results:

  * `{"a":  -1, "c": 1, "n": {"c": null}` << `a` filled from the template, `n.c` would get the previous value, but since there isn't any it gets null
  * `{"a":  -1, "b": 0, "n": {"a": 0, "c": 1}}` << `a` filled from the template, `n.c` gets the same value as the previous result (above)
  * `{"a": 0, "n": {"c": 1}}` << `a` already exists and is unchanged, `n.c` gets the same value as the previous result (above)
  * `{"a": 0, "n": null}` << `a` and `n` already exist and are left unchanged

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
  X-DITTO-TXN-ID: 7

  {"item": {"_time": "2021-04-20T12:34:56.123456789Z", "value": {"temp": {"value": 30, "units": "celsius"}, "humidity": {"relative": 30, "absolute": 15, "units": "g/m3"}}}}

  ```

  If there is an error once the stream has begun, it is communicated with a final json lines value, for example:

  ```
  {"error": "Timeout"}

  ```

### ```DELETE```

Delete a Range of Events from a TimeSeries. Accepts most of the same arguments as GET to restrict DELETE to matching events.

  Parameters

  - start (rfc3339 string, optional) - The earliest time that will be included. Defaults to 1970-01-01T00:00:0Z (epoch start).
  - end (rfc3339 string, optional) - The earliest time AFTER the queried interval. Defaults to current time.

  ```
  DELETE /api/v1/timeseries/my-time-series/events?start=2020-01-01T00%3A00%3A00.0Z&end=2021-01-01T00%3A00%3A00.0Z HTTP/1.1
  Content-Type: application/json
  X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAABQ==
  ```

  Response

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"txn_id": 15}
  ```

## Distinct Values

`https://{app_id}.cloud.ditto.live//api/v2/timeseries/<timeseries_id>/distinct_values`

### ```POST```

Query for the distinct values in a timeseries, within a range of events in a TimeSeries using a half-open interval `[start, end)` (optional). Returns a single document containing the paths and their distinct values.  Paths are specified as json arrays of strings. This query expects a body of json in the following format:

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
  X-DITTO-TXN-ID: 7
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
  Note also the X-DITTO-TXN-ID value is included the Response Header

  If there is an error once the stream has begun, it is communicated with a final json lines value, for example:

  ```
  {"error": "Timeout"}

  ```

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
