---
title: "Supported Network Transports"
sidebar_position: 4
---

import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'

export function Check() {
  return <CheckIcon style={{width: 20, height: 20, margin: 'auto', display: 'block'}} />
}

export function Clock() {
  return <ClockIcon style={{width: 20, height: 20, margin: 'auto', display: 'block'}} />
}

The following are the network transports supported by Ditto. By default Ditto will attempt to use all available transports if permissions are given.

* <CheckIcon style={{width: 18, height: 18}} /> Means already supported in our current releases.
* <ClockIcon style={{width: 18, height: 18}} /> Means that the feature is under development and will be released soon.

<table class="table table-bordered reference-document-table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Transport</th>
      <th scope="col">iOS</th>
      <th scope="col">Android</th>
      <th scope="col">macOS</th>
      <th scope="col">Windows</th>
      <th scope="col">Linux</th>
      <th scope="col">Web Browser</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Bluetooth Low Energy (BLE)</th>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Clock /></td>
      <td><Check /></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Apple Wireless Direct Link (AWDL)</th>
      <td><Check /></td>
      <td></td>
      <td><Check /></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Wi-Fi Aware</th>
      <td></td>
      <td><Clock /></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Wi-Fi Direct</th>
      <td></td>
      <td><Clock /></td>
      <td></td>
      <td><Clock /></td>
      <td><Clock /></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Local Area Network (LAN)</th>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">WebSockets</th>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
      <td><Check /></td>
    </tr>
    <tr>
      <th scope="row">Universal Serial Bus (USB)</th>
      <td><Clock /></td>
      <td><Clock /></td>
      <td><Clock /></td>
      <td><Clock /></td>
      <td><Clock /></td>
      <td><Clock /></td>
    </tr>
  </tbody>
</table>


## About the network transports

The following details specific information about each transport. Please read to fully understand how each platform behaves to align your expectations. We provide some _estimates_ of distances and bandwidth however the environment and hardware can greatly affect these numbers.

### Bluetooth Low Energy

Ditto will use Bluetooth Low Energy (BLE) to form **low-powered** and **high distance** connections between devices. Depending on your device's chip, you may see some variation of distance and bandwidth. All devices that support Bluetooth Low Energy are fully capable of communicating with each other.

* Devices can _discover_ each other at about 30m-60m away from each other but the connections can be sustained for further distances.
* If your device is using a Bluetooth 4.0 chip, expect distances of 80 meters from point to point.
* If your device i using a Bluetooth 5.x chip, expect impressive distances up to 130 meters from point to point.


Most devices will have a Bluetooth 5.x chip if it was made during or after 2017. Bluetooth Low Energy is great for structured documents but performs poorly for large file sizes.

> If you intend to run Ditto on a Raspberry Pi or Linux device, [please follow the instructions to enable Bluetooth Low Energy support](../installation/linux)

### Apple Wireless Direct Link (AWDL)

Apple Wireless Direct Link (AWDL) is most known for powering [AirDrop](https://support.apple.com/en-us/HT204144) and is only supported on iOS and macOS devices. Apple Wireless Direct Link does not require an internet connection and is capable of communicating as long as the device Wi-Fi settings are turned on.

* Distances are shorter than Bluetooth Low Energy with an average maximum of 35 meters from point-to-point.
* However, the bandwidth is tremendously more powerful: capable of syncing 1 gigabyte of data in times as low as 8 seconds.

### Wi-Fi Direct

Wi-Fi Direct is supported on almost all Android (4.0 or higher, API Level 14 or higher) but only on some Windows 10 devices. P2P Wi-Fi Direct can achieve speeds as a fast as Apple Wireless Direct Link but unfortunately makes connections by requiring a permission alert to every new peer.

* Distances can be achieved as far as 80 meters
* Can send 1 gigabyte of data in times as low as 8 seconds.

### Wi-Fi Aware

Wi-Fi aware is a new open standard introduced to Android devices that closely resembles Apple Wireless Direct Link in terms of distance and bandwidth. It is supported at the operating system level since Android 8, however not all Android manufacturers have enabled it at the hardware level.

* Distances from point to point are approximately 40 meters
* It can sync 1 gigabyte files in as little as 8 seconds.

In general most Google Pixel, Samsung, and LG phones built after 2018 can support Wi-Fi Aware. Other devices are being updated to include support. To check if your device can support Wi-Fi aware, [download this app](https://play.google.com/store/apps/details?id=live.ditto.wifiawarechecker).

### Local Area Network

If devices are connected over the same Wi-Fi access point or via some other means like an ethernet cable, they can take advantage of communicating over the LAN or Local Area Network.

Many enterprise or educational networks may have Client Isolation Mode turned **ON**. If the network has this setting **ON** then devices are unable to discover each other and form a connection. Almost all "home" settings have this setting turned **OFF**.

There are some limitations affecting LAN sync on **iOS devices**.

* iOS devices and desktop platforms like Windows will only sync if you have [requested the multicast entitlement from Apple and applied it to your iOS app](https://developer.apple.com/forums/thread/663858). Work is on the roadmap which will allow iOS devices to sync with all platforms, even without this entitlement.
* iOS can always sync with other mobile devices like iOS and Android.

### WebSockets

All devices support WebSocket connections. It is by far the most easily available network transports which require no permissions to work. In general, WebSockets:

* Require an internet connection for devices to communicate
* Cannot automatically discover each other like the other peer to peer transports.

Devices need to specify an IP/PORT for a connection to be established. While most use cases require an internet connection. WebSockets can also work over the Local Area Network.

### Universal Serial Bus (USB)

If Ditto devices are active and share permissions for USB communication, Ditto will be able to form a wired connection between the two devices.