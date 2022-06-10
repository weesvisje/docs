---
title: 'Transactions'
sidebar_position: 5
---

Ditto uses transactions to group related operations together. Typically, each HTTP API Request represents a distinct transaction which may insert, update, or remove one or more documents. Because Ditto is also a distributed system, `Transaction ID`s are used to represent the order in which transactions should be applied. Thus queries also specify Transaction IDs, which represent the "version" of the data you wish to query. For example, if you insert some Events into a TimeSeries in Transaction 17 and then want to query that same TimeSeries. The newly inserted events may still be replicating through the Ditto mesh. Should these new events be returned in the query response? In other words, do the results of a query depend on whether or not the insertion is first applied? Transaction IDs help solve this problem.

In each API Request a `Transaction ID` may optionally be provided in an HTTP HEADER called `X-DITTO-TXN-ID` with an integer value, which represents this request should be applied to the "version" of the data _at least_ as recent as this value. Using the example above, if we inserted some events in Transaction 17, and we wanted to ensure they were included in our subsequent query, we would include the header `X-DITTO-TXN-ID: 17` in our request. If we don't supply this header, the default behavior is to use the most recent version common to all Ditto nodes. Note also that if the Ditto node servicing the Request can't supply the version of the data requested, an error will be returned.

<!-- Current implementation requires an Actor ID however in the future only the Site ID will be needed. -->

In the example above, we mentioned that the insertion occurred in Transaction 17, but how does the client know this? When POSTing data to Ditto, the client should include an HTTP HEADER `X-DITTO-CLIENT-ID: base64Encode(<u128 Actor ID>)`, that is a `Actor ID` which can be parsed as an u128 and which has been base64 encoded. The Actor ID represents which peer in the Ditto mesh is writing to Ditto. You can [generate an Actor ID](#generating-an-actor-id) by concatenating the Big Endian bytes for a Site ID and the current Epoch. You should typically use the same Site ID scheme as your other SDK-based Ditto Apps and only change your Site ID when you want to indicate a new client is inserting or deleting data. If successful, the response to POST or DELETE requests will include a Transaction ID, which can be used on subsequent GET requests. This type of insertion is non-blocking and so is very performant.

Ditto uses "delete-wins" semantics, so in some situations the client may want to force Ditto to first read its current data and ensure another peer hasn't issued a concurrent DELETE request before attempting an insertion with a POST request. To do this, the client provides the HTTP HEADER `X-DITTO-ENSURE-INSERT: true`.

