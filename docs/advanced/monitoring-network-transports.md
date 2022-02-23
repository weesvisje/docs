---
title: "Monitoring Transport Conditions"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If syncing over Bluetooth LE is a critical part of your application you may want to warn the user if they are missing the permission or if the hardware is disabled. Ditto will help you by reporting conditions via a delegate or callback object.

First, while configuring Ditto, assign a delegate or a callback to receive notifications.

<Tabs
  groupId="programming-language"
  defaultValue="swift"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
ditto.tryStartSync()
```

</TabItem>
<TabItem value="swift">

```swift
// Setting up inside a ViewController
let ditto = Ditto(identity: DittoIdentity.onlinePlayground(appID: "REPLACE_ME_WITH_YOUR_APP_ID"))
ditto.delegate = self
try! ditto.tryStartSync()
```

</TabItem>
<TabItem value="objc">

```objc
// Setting up inside a ViewController
DITIdentity *identity = [[DITIdentity alloc] initOnlinePlaygroundWithAppID:@"REPLACE_WITH_APP_ID"];
DITDitto *ditto = [[DITDitto alloc] initWithIdentity:identity];
ditto.delegate = self;
[ditto tryStartSync:nil];
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// Setting up inside an Activity
val androidDependencies = DefaultAndroidDittoDependencies(applicationContext)
val ditto = Ditto(androidDependencies, DittoIdentity.OnlinePlayground(androidDependencies, "REPLACE_WITH_APP_ID"))
ditto.callback = this
ditto.tryStartSync()
```

</TabItem>
<TabItem value="java">

```java
// Setting up inside an Activity
DefaultAndroidDittoDependencies androidDependencies = new DefaultAndroidDittoDependencies(getApplicationContext());
Ditto ditto = new Ditto(androidDependencies, new DittoIdentity.OnlinePlayground(androidDependenciesOne, "REPLACE_WITH_APP_ID"));
ditto.callback = this;
ditto.tryStartSync();
```

</TabItem>
<TabItem value="csharp">

```csharp
// Setting up inside Main
DittoIdentity identity = DittoIdentity.OnlinePlayground("REPLACE_WITH_APP_ID");
Ditto onlineDitto = new Ditto(identity);
ditto.tryStartSync();
```

</TabItem>
<TabItem value="cpp">

```cpp
// API coming soon.
```

</TabItem>
<TabItem value="rust">

```rust
// API coming soon
```

</TabItem>
</Tabs>

Now you can observe real time changes to the transport conditions:

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
  ]
}>
<TabItem value="javascript">

```js
const transportConditionsObserver = ditto.observeTransportConditions((condition, source) => {
    console.log(condition, source)
})
```

</TabItem>
<TabItem value="swift">

```swift
extension ViewController: DittoDelegate {
    func transportConditionDidChange(transportID: Int64, condition: TransportCondition) {
        if condition == .BleDisabled {
            print("BLE disabled")
        } else if condition == .NoBleCentralPermission {
            print("Permission missing for BLE")
        } else if condition == .NoBlePeripheralPermission {
            print("Permission missing for BLE")
        }
    }
}
```

</TabItem>
<TabItem value="objc">

```objc
@interface ViewController () <DITDittoDelegate>

@end

@implementation ViewController

- (void)transportConditionChanged:(enum DITTransportCondition)condition forSubsystem:(enum DITConditionSource)source {
    if (condition == DITTransportConditionBleDisabled) {
        NSLog(@"BLE disabled");
    } else if (condition == DITTransportConditionNoBleCentralPermission) {
        NSLog(@"Permission missing for BLE");
    } else if (condition == DITTransportConditionNoBlePeripheralPermission) {
        NSLog(@"Permission missing for BLE");
    }
}

@end
```

</TabItem>
<TabItem value="kotlin">

```kotlin
class MainActivity : AppCompatActivity(), DittoCallback {
    // ...
    override fun transportConditionDidChange(transportId: Long, condition: TransportCondition) {
        var toastText: String? = null
        if (condition == TransportCondition.TRANSPORT_CONDITION_BLE_DISABLED) {
            toastText = "BLE disabled"
        } else if (condition == TransportCondition.TRANSPORT_CONDITION_NO_BLE_CENTRAL_PERMISSION) {
            toastText = "Permission missing for BLE"
        } else if (condition == TransportCondition.TRANSPORT_CONDITION_NO_BLE_PERIPHERAL_PERMISSION) {
            toastText = "Permission missing for BLE"
        }
        toastText?.let {
            Handler(mainLooper).post {
                Toast.makeText(this, it, Toast.LENGTH_LONG).show()
            }
        }
    }
}
```

</TabItem>
<TabItem value="java">

```java
public class MainActivity extends AppCompatActivity implements DittoCallback {
    @Override
    public void transportConditionDidChange(@NotNull DittoTransportCondition condition, @NotNull DittoConditionSource transportId) {
        String toastText = null;
        if (condition == DittoTransportCondition.BleDisabled) {
            toastText = "BLE disabled";
        } else if (condition == DittoTransportCondition.NoBleCentralPermission) {
            toastText = "Permission missing for BLE";
        } else if (condition == DittoTransportCondition.NoBlePeripheralPermission) {
            toastText = "Permission missing for BLE";
        }

        if (toastText != null) {
            String finalToastText = toastText;
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(MainActivity.this, finalToastText, Toast.LENGTH_LONG).show();
                }
            });
        }
    }
}
```

</TabItem>
<TabItem value="csharp">

```csharp
// API Not yet available
```

</TabItem>
<TabItem value="cpp">

```cpp
// API Not yet available
```

</TabItem>
<TabItem value="rust">

```rust
// API coming soon
```

</TabItem>
</Tabs>