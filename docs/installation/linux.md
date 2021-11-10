---
sidebar_position: 7
pagination_prev: intro
pagination_next: concepts/overview
---

# Linux (Raspberry Pi)

If you would like to run Ditto on a Linux device and leverage Bluetooth Low Energy please follow the instructions. __These instructions are required to run on Linux regardless of the programming language.__ This means that if you are running the JavaScript (Node/Electron), C#, or C++ SDKs on Linux and need to use Bluetooth Low Energy, then you should follow these additional instructions.

1. Install or update BlueZ 5.51 or higher

Your device will need to install or update BlueZ with version 5.51 or higher. We've outlined a quick snippet set of instructions below to install BlueZ 5.61 as an example.

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev python-docutils -y
wget http://www.kernel.org/pub/linux/bluetooth/bluez-5.61.tar.xz
tar -xf bluez-5.61.tar.xz
cd bluez-5.61
./configure
make
sudo make install
```

2. Add support for Linux to iOS connections.

BlueZ 5.51 and above try to automatically read the battery status/service of devices when they connect. However, by default, iOS devices will prevent BlueZ services from reading the battery service. As a result, BlueZ connection attempts will cause iOS devices to show a pairing prompt constantly. Therefore, we will need to disable the battery service in BlueZ, use the following steps.

1. Open the bluetooth service file. Depending on your system, it will be located either at `/usr/lib/systemd/system/bluetooth.service`, or `/etc/systemd/system/bluetooth.target.wants/bluetooth.service`. Use your favorite text editor like vim or nano to edit these files. In addition, you may need sudo permission to write to this file.

2. Find the line beginning with `ExecStart=` and add `-P battery` to the end. Now the line should look like this:

```
ExecStart=/usr/lib/bluetooth/bluetoothd -P battery
```

3. Save the file.
4. Run `systemctl daemon-reload` and `systemctl restart bluetooth` to apply the changes to the Bluetooth service
After that, BlueZ should be able to connect to iOS devices without prompting and Ditto Apps should be able to communicate over BLE between iOS and Linux.
