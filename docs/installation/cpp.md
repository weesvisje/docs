---
title: 'C++'
sidebar_position: 7
pagination_prev: intro
pagination_next: concepts/data-model
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# C++ Installation Instructions

> C++ is currently only supported for iOS and Linux. We will publish binaries for Windows and macOS soon. Please let us know if these binaries are important for your timeline by emailing us at [contact@ditto.live](mailto:contact@ditto.live).

1. To start integrating Ditto into your app you need to download a copy of the libditto.a static library and the Ditto.h header. The following command will download and then unpack an archive containing the library and header. The URL in the following command will download a copy of the static library built to work on iOS:

```
curl -O https://software.ditto.live/cpp-ios/Ditto/1.0.9/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
```

If you want to download the C++ SDK for usage on Linux x86_64 then use the following command, which uses a different URL:

```
curl -O https://software.ditto.live/cpp-linux-x86_64/Ditto/1.0.9/dist/Ditto.tar.gz && tar xvfz Ditto.tar.gz
```

2. Configure your app to link to the Ditto static library. Usually, this will mean adding an -lditto to a compilation step for your app.

<Tabs
  groupId="programming-language"
  defaultValue="javascript"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]
}>
<TabItem value="linux">

* Assume we have unzipped the Ditto.tar.gz in a relative directory `./sdk/` 
* main code entry point is in `./src/main.cpp`
* output will be in `./dist/main`

```shell
g++ -std=c++17 ./src/main.cpp -I ./sdk -lditto -ldl -lrt -pthread -L ./sdk -o dist/main;
```

To add Bluetooth Low Energy capabilities please [follow the instructions here](./linux).

</TabItem>
<TabItem value="macos">

* Assume we have unzipped the Ditto.tar.gz in a relative directory `./sdk/` 
* main code entry point is in `./src/main.cpp`
* output will be in `./dist/main`
* Notice we've added a `-framework Security,CoreFoundation,CoreBluetooth,ObjC`, this will enable the C++ SDK to leverage macOS peer to peer networks.

```shell
g++ -std=c++17 ./src/main.cpp -I ./sdk -lditto -ldl -framework Security,CoreFoundation,CoreBluetooth,ObjC -pthread -L ./sdk -o dist/main;
```


</TabItem>
<TabItem value="windows">

> Coming soon.

</TabItem>
</Tabs>

3. Now, in your C++ code, you can import ditto with: `#include <Ditto.h>`

```cpp
int main() {
    auto identity = ditto::Identity();
    std::unique_ptr<ditto::Ditto> ditto(new ditto::Ditto(identity));
    ditto->try_start_sync()
    return 0;
}
```

