---
title: 'Api Key'
sidebar_position: 6
---

Ditto’s “Online with Authentication” workflow provides all the tools needed to implement API token authentication. Our implementation guide as follows:

Decide on a format for the API tokens. We suggest creating tokens that are made of two parts, a prefix and a secret. The first X number of characters will make the prefix and the last Y will be the secret. Users of the API token don't need to know about these two portions. They will only see it as one string. Splitting it into two parts helps us keep it secure while quick to look up.
When stored at rest, the prefix will be used as an index to look up the record and the secret will be hashed with an algorithm like scrypt or PBKDF2. Similar approaches to protecting user passwords should also be applied to the secret portion of the key.
The database record for each API key should also include the permissions assigned to the key and a userID. For example, the API token 123456789 the record could look like:
```json
{
   "prefix": "123",
   "userID": "ETL API Key",
   "secret" : hash(456789),
   "permissions": { … }
}
```


- These records should be stored at rest in some type of datastore that belongs to the authentication webhook receiver. This could be anything. Postgres, SQLite, or even a secured immutable configuration file. It shouldn’t be stored in the Ditto application the webhook is managing authentication for.
- [Now it is time to write an authentication webhook receiver. Documentation about how to do this can be found here.](/security/online-with-authentication)
- When a client attempts to authenticate using this API key it will be provided to the webhook in the token property of the webhook request.
- The webhook receiver will take this token and use the first X characters to look up the API key’s record.
- Once the record is retrieved then the last Y characters of the provided API key can be hashed and compared to the stored hash.
- If they match the client should be authenticated with the stored permissions and userID.

