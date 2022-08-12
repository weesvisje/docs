---
title: 'OAuth'
sidebar_position: 2
---

We have a [tutorial for integrating with Auth0 using this same API](/http/common/guides/authentication/intro/). The mechanism for OAuth will be almost identical.

For a quick summary of how this works:

- The client will do their initial authentication through OAuth and receive a JWT.
- The JWT will be provided to the Big Peer as part of the authentication handler callbacks provided to the identity when using an SDK or the login endpoint when using the HTTP API.
- The Big Peer will then pass this JWT on to the provided webhook receiver.
- The webhook receiver will validate and decode this JWT. The most important bits of information the receiver is looking for is the user ID and a permission set.
- If the JWT is valid then this data will be returned as JSON as response to the webhook request. [An example of the expected format can be found in the tutorial](/http/common/guides/authentication/server/).
- The Big Peer will take this response and use it to mint a JWT for use with the HTTP API and return it to the client

