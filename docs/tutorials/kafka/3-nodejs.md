---
title: '3 - Responding to events'
---

## Pipe Ditto events into an existing database

In this section we will listen to Kafka events and pipe them into a script on the commandline. 

:::info
To stream events from our app starting at the beginning of time, replace `--group $TOPIC` with `--offset 0 --partition 0`. This could stream a significant number of events to your consumer for applications with a large amount of data.
:::

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

## Exercise

Now, update this script to send an HTTP request to an external server on every event. Use this script as a start and fill in the TODO.

```js
let es = require('event-stream')
let Stream = require('stream')

const processDittoEvents = new Stream.Writable({ objectMode: true })
processDittoEvents._write = (data, encoding, next) => {
  // TODO: process events
}

process.stdin               
    .pipe(es.split())                  
    .pipe(es.map(function (data, cb) { 
        try {
            let row = JSON.parse(data.toString())
            return cb(null, row)
        } catch (err ) {
            return cb(null)
        }
    }))
    .pipe(processDittoEvents)
```
