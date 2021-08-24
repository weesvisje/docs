---
title: 'iOS'
sidebar_position: 2
---

# iOS Installation Instructions

1. [Ensure you have CocoaPods 1.1.0 or later](https://guides.cocoapods.org/using/getting-started.html)
2. Ensure you have `use_frameworks!` in your Podfile
3. Add `DittoSwift` to your __Podfile__ like so:

```ruby
pod 'DittoSwift'
```

If you are installing for an Objective-C project use the following CocoaPod instead.

```ruby
pod 'DittoObjC'
```

## Permissions

Since iOS 13 and Xcode 11 an app must ask the user's permission to use Bluetooth. Ditto will activate Bluetooth by default, which means the user will receive a permission prompt automatically.

You must include several keys in the __Info.plist__ file your app.

* Privacy - Local Network Usage Description
* Privacy - Bluetooth Peripheral Usage Description
* Privacy - Bluetooth Always Usage Description
* A Bonjour service _http-alt._tcp.

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Uses Bluetooth to connect and sync with nearby devices</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Uses Bluetooth to connect and sync with nearby devices</string>
<key>NSLocalNetworkUsageDescription</key>
<string>Uses WiFi to connect and sync with nearby devices</string>
<key>NSBonjourServices</key>
<array>
  <string>_http-alt._tcp.</string>
</array>
```