---
title: '1 - Enabling Kafka'
---

# Enabling Kafka

:::info
The Kafka settings are only enabled if your Organization is on a dedicated cluster. [Contact us](mailto:support@ditto.live) if you are interested in this feature.  You can also use Ditto's [Live Query Webhook](../livequery-webhook), which is free for all users.
:::

Kafka is one way to implement CDC ([Change Data Capture](https://en.wikipedia.org/wiki/Change_data_capture)). The document change stream is a coarse user-consumable Kafka queue that allows you to react to changes made as documents are inserted, updated, or deleted from Ditto's Big Peer. You should use this in conjunction with the HTTP API. Ditto supports connecting to Kafka and retrieving updates and events for your data through a Kafka topic. 

## Installing Kafka

If you aren't familiar with Kafka, first follow the instructions on [Kafka Quickstart](https://kafka.apache.org/quickstart) to try out basic Kafka locally. In this tutorial, we used scripts in the `bin` directory of `kafka_2.13-3.1.0`.

## Handling credentials 

To connect to your Kafka instance, you need to have an SSL connection. In your organization page, click "Live Query Settings" and you will see the credentials for your cluster. Download the Cluster Certificate and User Certificate. Keep these files safe!

**Organization Apps > Your App Name > Live Query Settings > Kafka Connection Data**

![kafka credentials](kafka-browser.png)

Here is how these authentication tokens match to the Kafka configuration:

| | Ditto Name | Description |
| --- | --- | --- |
| `ssl.truststore.location` |  Cluster Certificate |  The CA cert in PKCS12 format.|
| `ssl.truststore.password` |  Cluster certificate password | The password used to decrypt the CA Cert value. |
| `ssl.keystore.location` |  User Certificate | User cert in PKCS12 format.|
| `ssl.keystore.password` |  User certificate password | The password used to decrypt the user cert. |


## Simple test

You can use the following bash script to test out your cluster. Replace each variable with the corresponding information displayed in your app's live query settings.

If it's working, you won't see any errors and the script will not shut down. Leave this script running in a terminal, and open a new terminal for the next section.


```sh
CLUSTER_CERT_LOCATION=/path/to/cluster.p12
CLUSTER_CERT_PW=<YOUR_CLUSTER_CERT_PASSWORD>

USER_CERT_LOCATION=/path/to/user.p12
USER_CERT_PW=<YOUR_USER_CERT_PASSWORD>

CLOUD_ENDPOINT=<YOUR_ENDPOINT>
TOPIC=<YOUR_TOPIC>

KAFKA=/path/to/kafka_2.13-3.1.0

$KAFKA/bin/kafka-console-consumer.sh \
 --bootstrap-server $CLOUD_ENDPOINT \
 --consumer-property security.protocol=SSL \
 --consumer-property ssl.truststore.password=$CLUSTER_CERT_PW \
 --consumer-property ssl.truststore.location=$CLUSTER_CERT_LOCATION \
 --consumer-property ssl.keystore.password=$USER_CERT_PW \
 --consumer-property ssl.keystore.location=$USER_CERT_LOCATION \
 --group $TOPIC \
 --topic $TOPIC 
```

:::info
The Kafka `Group` and `Topic` should both be set to the same string displayed in the Ditto portal.
:::
