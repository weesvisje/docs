---
title: '3 - Node.js Example'
---

In this section we will listen to Kafka events and pipe them into a script on the commandline. 

## Pipe Ditto events into an existing database

To stream events from your app starting at the beginning of time, replace
`--group $TOPIC` with `--offset 0 --partition 0`. This could stream a
significant number of events to your consumer for applications with a large
amount of data.

```bash
$KAFKA/bin/kafka-console-consumer.sh \
 --bootstrap-server $CLOUD_ENDPOINT \
 --consumer-property security.protocol=SSL \
 --consumer-property ssl.truststore.password=$CLUSTER_PW \
 --consumer-property ssl.truststore.location=$CLUSTER_LOCATION \
 --consumer-property ssl.keystore.password=$USER_PW \
 --consumer-property ssl.keystore.location=$USER_LOCATION \
 --topic $TOPIC --group $TOPIC 
```

## Node.js example

We will now write a script that responds to Ditto events. This script assumes there is an HTTP server with a REST endpoint for mutating an external database.

Create a file `echo.js`. You can use `event-stream` to split each item from the process.stdin and parse it as `JSON`. 

```js
let es = require('event-stream')
let inspect = require('util').inspect

process.stdin               
    .pipe(es.split())                  
    .pipe(es.map(function (data, cb) { 
        try {
            let row = JSON.parse(data.toString())
            return cb(null, inspect(row))
        } catch (err ) {
            return cb(null)
        }
    }))
    .pipe(process.stdout)
```

In a new terminal, pipe events from the Kafka script to the response:

```
./all.sh | node echo.js
```

If all is working, you should see events streaming into terminal as data is changed.
