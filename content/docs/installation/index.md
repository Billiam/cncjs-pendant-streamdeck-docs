---
title: Installation
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 1
summary: Web and Stream Deck installation instructions
---

## Web

1. Download the [latest release](https://github.com/Billiam/cncjs-pendant-streamdeck/releases) and extract it, to ex: `/home/my-name/cncjs-pendant-streamdeck`
2. Rename `config.example.json` to `config.json`
3. Update the `config.json` file with your connection information in the [`cncjs`]({{< ref "configure#cncjs" >}}) section.
4. Edit your `~/.cncrc` file, adding a mount point for this pendant
    ```json
    "mountPoints": [
      {
        "route": "grid",
        "target": "/home/pi/cncjs-pendant-streamdeck"
      }
    ]
    ```
5. Restart CNCjs

## Streamdeck

Follow [Web](#web) steps above to generate create a configuration directory, `config.json` file, and button images.
You can skip the `.cncrc` step if you do not need the web interface.

### Linux

_Instructions borrowed from https://github.com/julusian/node-elgato-stream-deck_

On linux, the udev subsystem blocks access to the StreamDeck without some special configuration.
Save the following to `/etc/udev/rules.d/50-elgato.rules` and reload the rules with
`sudo udevadm control --reload-rules`

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006d", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0080", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0086", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006d", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0080", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0086", MODE:="666", GROUP="plugdev"
```

Unplug and replug the device after reloading rules if necessary.

Install dependencies for the canvas and Stream Deck libraries:

```
apt-get install libusb-1.0-0-dev libudev-dev libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Install optional node dependencies:

```sh
npm install -g canvas @julusian/jpeg-turbo
```

Install the pendant:

```sh
npm install -g cncjs-pendant-streamdeck
```

Run the pendant:

```sh
cncjs-pendant-streamdeck --directory /home/my-name/cncjs-pendant-streamdeck
```

See other help options, mostly for overriding the cncjs connection information:

```sh
cncjs-pendant-streamdeck --help
```

### Windows

Windows is completely untested!

`cncjs-pendant-streamdeck` uses the image processing library [`Sharp`](https://github.com/lovell/sharp), which is not
compatible with `canvas` in Windows.

`cncjs-pendant-streamdeck` supports [`pureimage`](https://github.com/joshmarinacci/node-pureimage) instead for this
reason.

`pureimage` is both slower and does not look as nice, but it is functional.

You can install it with:

```
npm install -g pureimage @julusian/jpeg-turbo
```
