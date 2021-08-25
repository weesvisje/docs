---
title: 'Certificate Based Security'
sidebar_position: 2
---

> With the cloud platform, most use cases will not need to learn about this section. Instead, this is an advanced discussion of Ditto's underlying certificate, identity, and encryption implementation. However, if you are deploying an enterprise on-premise deployment of Ditto, you may be required to reference the following material.

All communications are consistently protected by modern and robust encryption for all of Ditto's communication methods. Cryptographically-signed business rules ensure users can only sync data that they are permitted to access. The app developer is in complete control of the keys, certificates, and rules.
 
The following details information about the certificates used to encrypt the communication channels.
 
<table>
<tr>
  <th>Capability</th>
  <th>Type</th>
</tr>

<tr>
  <td>Encryption</td>
  <td>TLS 1.3</td>
</tr>

<tr>
  <td>Authentication</td>
  <td>EC keypairs with signed certificates</td>
</tr>

<tr>
  <td>Trust infrastructure</td>
  <td>X.509 with a developer-controlled certificate authority</td>
</tr>

<tr>
  <td>Access Rules</td>
  <td>
  
    Query patterns on Document _id's describing read and or write access

  </td>
</tr>

</table>

## Identities

Every installation of an app that uses Ditto has its own identity. This identity is used to identify each unique peer in the mesh network. When you start prototyping with Ditto you can use a development identity, which contains default settings and offers no real security. Development certificates should absolutely not be deployed to any production environments. Once you are ready to deploy, this can be swapped for a production identity where security is enforced.

An identity is a bundle of device and app-specific information:

* Site ID - A number unique to this device.
* App Name - A name identifying the application. This avoids different Ditto-enabled apps trying to sync with each other. Like iOS App IDs, this takes the form of a domain name. Example: app.ditto.live
* Access Rules - Define which documents this device is allowed to read or write during sync.
* Private Key - A secret for authenticating as this identity.
* Identity Certificate - A certificate verifying the particulars of this device, signed by the CA.
* CA Certificate - Used to verify certificates presented by other devices with the same app.

<table>
  <tr>
    <th></th>
    <th>Production</th>
    <th>Development</th>
  </tr>

  <tr>
    <td>Site ID</td>
    <td>Allocated by central authority</td>
    <td>Defaults to a random number; can be customized</td>
  </tr>

  <tr>
    <td>App Name</td>
    <td>Set by central authority</td>
    <td>Defaults to "app.ditto.live"; can be customized</td>
  </tr>

  <tr>
    <td>Access Rules</td>
    <td>Set by central authority</td>
    <td>All devices may read/write all documents</td>
  </tr>

  <tr>
    <td>Private Key</td>
    <td>Either generated on device, or distributed by central authority</td>
    <td>Hard-coded and shared by all devices</td>
  </tr>

  <tr>
    <td>Identity Certificate</td>
    <td>
      Unique and signed by central authority; contains this device's public key
    </td>
    <td>Hard-coded and shared by all devices</td>
  </tr>

  <tr>
    <td>CA Certificate</td>
    <td>Shared by all users of the same app</td>
    <td>Hard-coded and shared by all devices</td>
  </tr>

  <table></table>
</table>
