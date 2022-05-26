---
title: 'Documents'
sidebar_position: 2
---

The Ditto HTTP API follows a RESTful pattern and is organized into several resources. API Resources typically map to the key elements of the [Ditto Data Model](/concepts/overview). Applications may contain one or more `Collection`s of `Documents` or `TimeSeries` of `Event`s. JSON is used as the default representation for individual resources, and will be indicated by the `Content-Type` HTTP Header. Resources which are best represented by a sequence or stream of items are represented by [JSONlines](https://jsonlines.org), that is new line delimited JSON. This will be indicated by the MIME type `application/json-l`. UTF-8 encoding is used and required unless otherwise indicated. Binary data should be Base64 encoded. Where alternative representations are desired, the API Client may use the `Accept` HTTP Header to indicate this in the Request.

<!-- Currently, Collections and TimeSeries can't be edited directly as top level API resources; only operations on the underlying documents are supported. Collections and TimeSeries are created implicitly by inserting into them. Later, we may add the ability to create, configure, and delete entire collections and timeseries directly.-->

## `POST /api/v1/store`

All RPC requests are POST requests to `https://<app-uuid>.cloud.ditto.live/api/v1/store`.  


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
              "describe": {
                "title": "Describe",
                "description": "Turns the query into a Describe query",
                "default": false,
                "type": "boolean"
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
                "description": "The list of all write commands to be run.",
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
      "UpdateCommand": {
        "type": "object",
        "required": [
          "method",
          "path"
        ],
        "properties": {
          "method": {
            "title": "Method",
            "description": "The operation to perform on the property.",
            "allOf": [
              {
                "$ref": "#/definitions/UpdateCommandMethod"
              }
            ]
          },
          "path": {
            "type": "string"
          },
          "value": {
            "title": "Value",
            "description": "The value to use in the operation.",
            "default": null,
            "allOf": [
              {
                "$ref": "#/definitions/AnyValue"
              }
            ]
          }
        }
      },
      "UpdateCommandMethod": {
        "type": "string",
        "enum": [
          "set",
          "increment",
          "replaceWithCounter"
        ]
      },
      "WriteCommand": {
        "oneOf": [
          {
            "title": "Update Command",
            "description": "If a value matching this query exists, update it with each given command.",
            "type": "object",
            "required": [
              "args",
              "collection",
              "commands",
              "method",
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
                "type": "string"
              },
              "commands": {
                "title": "Commands",
                "description": "This is a series of commands to be applied to the matched documents.",
                "type": "array",
                "items": {
                  "$ref": "#/definitions/UpdateCommand"
                }
              },
              "method": {
                "type": "string",
                "enum": [
                  "update"
                ]
              },
              "query": {
                "title": "Query",
                "description": "The query to run",
                "type": "string"
              }
            }
          },
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
          },
          {
            "title": "Remove Command",
            "description": "Run a query and delete all documents that match.",
            "type": "object",
            "required": [
              "args",
              "collection",
              "method",
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
                "type": "string"
              },
              "method": {
                "type": "string",
                "enum": [
                  "remove"
                ]
              },
              "query": {
                "title": "Query",
                "description": "The query to run",
                "type": "string"
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
          "txnId": {
            "title": "Transaction ID",
            "type": [
              "integer",
              "null"
            ],
            "format": "uint64",
            "minimum": 0.0
          },
          "version": {
            "title": "Version",
            "deprecated": true,
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
          "txnId": {
            "title": "Transaction ID",
            "type": [
              "integer",
              "null"
            ],
            "format": "uint64",
            "minimum": 0.0
          },
          "version": {
            "title": "Version",
            "deprecated": true,
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
            "title": "Update Command Result",
            "type": "object",
            "required": [
              "error",
              "internalError",
              "method",
              "permissionDenied",
              "transactionId",
              "updated"
            ],
            "properties": {
              "error": {
                "title": "Error",
                "description": "The number of records that matched the query but were not updated due to an problem applying the command.",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "internalError": {
                "title": "Internal Error",
                "description": "The number of records that matched the query but were not updated due to some type of internal error",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "method": {
                "type": "string",
                "enum": [
                  "update"
                ]
              },
              "permissionDenied": {
                "title": "Permission Denied",
                "description": "The number of records that matched the query but the client doesn't have sufficient permission to update",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "transactionId": {
                "title": "Transaction ID",
                "description": "The ID of the transaction for the update.  Use this to ensure read-follows-writes consistency.",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "updated": {
                "title": "Updated",
                "description": "The number of documents successfully updated",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              }
            }
          },
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
          },
          {
            "type": "object",
            "required": [
              "deleted",
              "internalError",
              "method",
              "permissionDenied",
              "transactionId"
            ],
            "properties": {
              "deleted": {
                "title": "Deleted",
                "description": "The number of records that matched the query and were successfully deleted.",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "internalError": {
                "title": "Internal Error",
                "description": "The number of records that matched the query but were not deleted due to some type of internal error",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "method": {
                "type": "string",
                "enum": [
                  "remove"
                ]
              },
              "permissionDenied": {
                "title": "Permission Denied",
                "description": "The number of records that matched the query but the client doesn't have sufficient permission to delete.",
                "type": "integer",
                "format": "uint64",
                "minimum": 0.0
              },
              "transactionId": {
                "title": "Transaction ID",
                "description": "The ID of the transaction for the remove.  Use this to ensure read-follows-writes consistency.",
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



All methods will accept or return JSON or CBOR depending on the accept and content-type headers you use.  There are a few parameters that are required for all methods. 

* `method`: `write`, `find` and `findById`.  
* `parameters`: (object). Contain an object of parameters to that method.  The contents of the parameter field will depend on which method is being used.  

### Example

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
}'  -H 'X-DITTO-CLIENT-ID: AAAAAAAAAAAAAAAAAAAAew==' -H 'Content-Type: application/json' -H 'Accept: application/json' http://${APP_DOMAIN}/api/v1/store
```

The resulting response will be:

```
{"results":[{"method":"upsert","transactionId":62}]}
```

For more examples, see the corresponding sections in the Concepts section for [querying](/concepts/querying), [update](/concepts/update), and [remove](/concepts/remove).

:::info

**Can I do a query inside of an upsert?**

No. The HTTP API will look to see if a document with that _id
exists, and then merge the two. 

To implement `update` behavior, you must issue two HTTP requests.  First, send a `find`, and then after a response, send an `upsert` request.
::::

### Distinct Values

`POST https://<app-uuid>.cloud.ditto.live/api/v1/documents/<collection>/distinct_values`

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
