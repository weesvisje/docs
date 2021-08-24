---
title: 'Android'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Android Installation Instructions

1. Ensure your device has Android 7.1 or higher
2. Ensure that `mavenCentral()` is in the project-level __build.gradle__ file like so:

```
buildscript {
    repositories {
        mavenCentral()
    }
}
```

3. In the individual module build.gradle file add:

```groovy
dependencies {
    // ...
    implementation "live.ditto:ditto:latest.release"
}

android {
    // ...

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

4. Configure your manifest with the following permissions:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
```

5. Register your license token as below. We recommend placing this in your Application.onCreate method:


<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
  ]
}>
<TabItem value="kotlin">

```kotlin
val androidDependencies = DefaultAndroidDittoDependencies(applicationContext)
val ditto = Ditto(androidDependencies)
ditto.setLicenseToken("<ditto_license_token>")
```

</TabItem>
<TabItem value="java">

```java
DefaultAndroidDittoDependencies androidDependencies = new DefaultAndroidDittoDependencies(applicationContext);
Ditto ditto = new Ditto(androidDependencies);
ditto.setLicenseToken("<ditto_license_token>");
```

</TabItem>
</Tabs>
