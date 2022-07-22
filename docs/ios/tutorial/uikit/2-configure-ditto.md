---
title: '2 - Configure Ditto'
---

Now, the fun part - using Ditto! We will use CocoaPods to install the SDK.

## 2-1 Setup CocoaPods

If you need to install CocoaPods, please <a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank"> follow the installation instructions </a> at <a href="https://cocoapods.org/" target="_blank"> CocoaPods.org </a>.

## 2-2 Integrate Ditto

Close the `Tasks.xcodeproj` project for now because CocoaPods will create a `Tasks.xcworkspace` which automatically integrates the libraries into your project. Then in your terminal navigate to the directory which contains your `Tasks.xcodeproj` file and run:

```
pod init
```

This will create a `Podfile` which you will open and add Ditto to it:

```xml title=Podfile
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Tasks' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Tasks
  pod 'DittoSwift', '=2.0.0-alpha1'

end
```

Save the `Podfile` and close it then run:

```
pod install --repo-update
```

This will install Ditto as a dependency and create a `Tasks.xcworkspace` file with the SDK integrated. Once it is finished open up `Tasks.xcworkspace`.
You now have Ditto installed in the application! To verify and ensure we can use the SDK add the following line to your `TasksTableViewController` underneath `import UIKit`:


```
import DittoSwift
```

## 2-3 Permissions

Since iOS 13 and Xcode 11 an app must ask the user's permission to use
Bluetooth. Ditto will activate Bluetooth by default, which means the user will
receive a permission prompt automatically. In addition, since iOS 14 an app must
ask the user's permission to use the Local Area Network to discover devices.

You must include several keys in the `Info.plist` file your app
* Privacy - Local Network Usage Description
* Privacy - Bluetooth Peripheral Usage Description
* Privacy - Bluetooth Always Usage Description
* A Bonjour service `_http-alt._tcp`.

These can be configured through Xcode's _Info_ project settings.

***
![](./ios-permissions.png)
***

Alternatively, add the keys directly to `Info.plist`. Right click on the `Info.plist` and hover to `Open as` and then click `Source Code`

```xml title=Info.plist
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
