[![Build Status](https://travis-ci.org/ruff-drivers/ruff-v1-sys-usb.svg)](https://travis-ci.org/ruff-drivers/ruff-v1-sys-usb)

# Sys-usb Driver for Ruff

Sys-usb managers the `mount` and `unmout` behaviour of USB devices, which have been installed into sys-usb.

## Supported Engines

* Ruff: >=1.4.0 <1.5.0

## Installing

1. Execute following command and enter a **supported model** to install.

```sh
# Please replace `<device-id>` with a proper ID.
# And this will be what you are going to query while `$('#<device-id>')`.
rap device add <device-id>

# Then enter a supported model, for example:
# ? model: ruff-v1-sys-usb
```

## Usage

Here is the basic usage of this driver.

```js
var cameraManager = new CameraManager();
var audioManager = new AudioManger();
$('#usb').install(cameraManager, audioManager);
cameraManager.on('mount', function (camera)) {
    // camera is mounted, invoke methods of camera
});
cameraManager.on('unmount', function (camera)) {
    // camera is unmounted
});
audioManager.on('mount', function (audio)) {
    // audio is mounted, invoke methods of audio
});
audioManager.on('unmount', function (audio)) {
    // audio is unmounted
});

```

## API References

### Methods

#### `install(...usbDeviceManagers[, callback])`

Install usb device managers to be controlled by sys-usb.

- **usbDeviceManagers:** usbDeviceManagers is mutilple of usbDeviceManager which is instlled into sys-usb.
When one usb device is pluged or unpluged, all of the installed usbDeviceManagers will be received `mount` or `unmount` event.
Usb device manager must provide three mothods: `attach`, `detach` and `createDevice`. For more information, please reference the document of the usb device manager.

- **callback:** No argument other than a possible error is given to the completion callback. The callback will be invoked when the `install` is finished, this argument is optional.

## Contributing

Contributions to this project are warmly welcome. But before you open a pull request, please make sure your changes are passing code linting and tests.

You will need the latest [Ruff SDK](https://ruff.io/) to install rap dependencies and then to run tests.

### Installing Dependencies

```sh
npm install
rap install
```

### Running Tests

```sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Nanchao Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
