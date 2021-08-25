---
title: 'C++'
sidebar_position: 3
---

# C++ Installation Instructions

> C++ is currently only supported for iOS and MacOS. Windows and Linux support is coming soon.

1. To start integrating Ditto into your app you need to download a copy of the libditto.a static library and the Ditto.h header. The following command will download and then unpack an archive containing the library and header. The URL in the following command will download a copy of the static library built to work on iOS:

```
curl -O https://software.ditto.live/cpp-ios/Ditto/1.0.6/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
```

If you want to download the C++ SDK for usage on Linux x86_64 then use the following command, which uses a different URL:

```
curl -O https://software.ditto.live/cpp-linux-x86_64/Ditto/1.0.6/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
```

2. Configure your app to link to the Ditto static library. Usually this will mean adding an -lditto to a compilation step for your app.

3. Somewhere in your app, register your license token as below:

```cpp
Ditto ditto = Ditto();
ditto.set_license_token("<ditto_license_token>");
```

