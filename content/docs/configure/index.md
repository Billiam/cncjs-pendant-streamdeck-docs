---
title: 'Configuration'
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 30
summary: Configuration reference for the `config.json` file
---

Buttons, layout, and other behavior are configured with the `config.json` file.

The cost of high customizability is unfortunately high complexity. The configuration documentation here
is for reference, but it is _strongly_ recommended that you just start with the
[default config](https://github.com/Billiam/cncjs-pendant-streamdeck/blob/main/src/public/config.example.json) and
modify it as you go, rather than starting from scratch.

You can use the [Config Validator]({{< ref "validator" >}}) to verify your configuration changes.

The top level configuration object has the following keys:

| Key                             | Type                  | Description                               |
| ------------------------------- | --------------------- | ----------------------------------------- |
| [`cncjs`](#cncjs)               | {{< type "Object" >}} | Connection information                    |
| [`ui`](#ui)                     | {{< type "Object" >}} | Global grid size and default colors       |
| [`streamdeckUi`](#streamdeckui) | {{< type "Object" >}} | Stream Deck-only overrides to `ui`        |
| [`buttons`](#buttons)           | {{< type "Object" >}} | Button display and actions                |
| [`scenes`](#scenes)             | {{< type "Object" >}} | Button layout on individual pages         |
| [`machine`](#machine)           | {{< type "Object" >}} | Machine axes and per-axis speed modifiers |

## `cncjs`

Used to configure connection to the cncjs server, and controller serial port

{{< example >}}

```json
{
  "cncjs": {
    "accessTokenExpiration": "30d",
    "baudRate": 115200,
    "controllerType": "Grbl",
    "port": "/dev/ttyACM0",
    "socketAddress": "localhost",
    "socketPort": 8000
  }
}
```

| Key                     | Type                                          | Description                                                                                                                   |
| ----------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `accessTokenExpiration` | {{< type "String" >}}, {{< type "Integer" >}} | Web token expiration duration, in seconds or as a duration string. Default: `30d`. {{< badge "success" "Stream Deck only" >}} |
| `baudRate`              | {{< type "Integer" >}}                        | Serial connection baud rate                                                                                                   |
| `port`                  | {{< type "String" >}}                         | Serial connection port                                                                                                        |
| `controllerType`        | {{< type "Enum" >}}                           | Controller type. Allowed: [`Grbl`]                                                                                            |
| `socketAddress`         | {{< type "String" >}}                         | URL for socket connection to cncjs. Usually `localhost`                                                                       |
| `socketPort`            | {{< type "Integer" >}}                        | Socket connection port for cncjs. Usually `80` or `8000`                                                                      |
| `secure`                | {{< type "Boolean" >}}                        | If enabled, socket connections will be made over wss, and API requests over https. Default `false`                            |

## `machine`

Machine axes and per-axis speed modifiers

```json
{
  "machine": {
    "axes": ["x", "y", "z"],
    "axisSpeeds": {
      "x": 1,
      "y": 1,
      "z": 0.25
    }
  }
}
```

| Key                                | Type                                        | Description                                                     |
| ---------------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| `axes`                             | {{< type "String[]" >}}                     | Array of axes in use. Allowed values: [`a`,`b`,`c`,`x`,`y`,`z`] |
| [`axisSpeeds`](#machineaxisspeeds) | [{{< type "Object" >}}](#machineaxisspeeds) | Per-axis speed overrides, used for smooth jogging               |

### `machine/axisSpeeds`

Override smooth jog speeds on a per-axis basis. Allows moving specific axes slower or faster than the current smooth jog
travel speed.

| Key | Type                  | Description                                          |
| --- | --------------------- | ---------------------------------------------------- |
| `a` | {{< type "Number" >}} | Travel speed multiplier for the A axis. Default: `1` |
| `b` | {{< type "Number" >}} | Travel speed multiplier for the B axis. Default: `1` |
| `c` | {{< type "Number" >}} | Travel speed multiplier for the C axis. Default: `1` |
| `x` | {{< type "Number" >}} | Travel speed multiplier for the X axis. Default: `1` |
| `y` | {{< type "Number" >}} | Travel speed multiplier for the Y axis. Default: `1` |
| `z` | {{< type "Number" >}} | Travel speed multiplier for the Z axis. Default: `1` |

## `ui`

Configuration for global interface settings.

```json
{
  "ui": {
    "bgColor": 0,
    "brightness": 60,
    "columns": 5,
    "font": "monospace",
    "fontSize": 16,
    "lineHeight": 1.2,
    "gcodeColors": {
      "G0": "#52ff2e",
      "G1": "#9a96ff",
      "G2G3": "#9a96ff"
    },
    "lineHeight": 1.1,
    "palette": [
      "#181818",
      "#bdc3c7",
      "#b71138",
      "#efa021",
      "#06D6A0",
      "#2a88c5",
      "#EF476F",
      "#02535e",
      "#1F2D3A"
    ],
    "pageColor": 0,
    "progressColor": 3,
    "rows": 3,
    "textColor": "#fff",
    "textSize": 1.2,
    "timeout": 180
  }
}
```

| Key                             | Type                                          | Description                                                                                                                                              |
| ------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bgColor`                       | {{< type "Integer" >}}, {{< type "String" >}} | Default background color for buttons. May be a color string or [palette](#uipalette) index                                                               |
| `brightness`                    | {{< type "Integer" >}}                        | Default brightness. [`10` – `100`] {{< badge "success" "Stream Deck only" >}}                                                                            |
| `columns`                       | {{< type "Integer" >}}                        | Number of columns to display                                                                                                                             |
| `rows`                          | {{< type "Integer" >}}                        | Number of rows to display                                                                                                                                |
| `font`                          | {{< type "String" >}}                         | Font to use for text display. Default: `monospace`                                                                                                       |
| `fontSize`                      | {{< type "Number" >}}                         | Font size to use for text display {{< badge "success" "Stream Deck only" >}}                                                                             |
| `lineHeight`                    | {{< type "String" >}}                         | Line height for text display as a percentage of font size. Default: `1.1`                                                                                |
| [`gcodeColors`](#uigcodecolors) | [{{< type "Object" >}}](#uigcodecolors)       | Line and curve colors for gcode rendering.                                                                                                               |
| `gcodeLimit`                    | {{< type "Integer" >}}                        | Set a hard limit on the number of lines of gcode that will be processed. Affects rendering and boundary data. {{< badge "success" "Stream Deck only" >}} |
| `pageColor`                     | {{< type "Integer" >}}, {{< type "String" >}} | Color to use for page background {{< badge "primary" "web only" >}}                                                                                      |
| [`palette`](#uipalette)         | [{{< type "String[]" >}}](#uipalette)         | Array of colors that buttons and other color settings may refer to by index                                                                              |
| `progressColor`                 | {{< type "Integer" >}}, {{< type "String" >}} | Color to use for button hold indicator. May be a color string or [palette](#uipalette) index                                                             |
| `textColor`                     | {{< type "Integer" >}}, {{< type "String" >}} | Color to use for button text. May be a color string or [palette](#uipalette) index                                                                       |
| `textSize`                      | {{< type "Number" >}}                         | Font size modifier. Default: `1`. {{< badge "primary" "web only" >}}                                                                             |
| `throttle`                      | {{< type "Integer" >}}                        | Redraw each button at most once every `throttle` milliseconds. Default: `0`. {{< badge "success" "Stream Deck only" >}}                                  |
| `timeout`                       | {{< type "Integer" >}}                        | Duration, in seconds, before blanking display. {{< badge "success" "Stream Deck only" >}}                                                                |

### `ui/gcodeColors`

Gcode preview can use different colors for rapid travel, straight and curved cuts. Colors may use `rgb(0, 50, 200)`,
hex `#001122` etc. Palette colors are not supported here.

| Key    | Type                  | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| `G0`   | {{< type "String" >}} | Color to use for rapid travel moves.     |
| `G1`   | {{< type "String" >}} | Color to use for straight line cut moves |
| `G2G3` | {{< type "String" >}} | Color to use for curve cut moves         |

The following variables are available to button conditions (like `if` and `disabled`), and templated text.

### `ui/palette`

Palette colors are an array of color strings (of any length).
You can refer to these colors in most places that expect a color by referencing their array index.

This helps keep your color choices consistent, and allows changing many colors at once if needed.

{{< example >}}

```json
{
  "palette": [
    "#ccc",
    "rgb(0, 100, 255)",
    "salmon"
  ]
}
```

## `scenes`

The scenes configuration controls the layout of buttons (from the [`buttons`](#buttons) object), and is used to
create individual pages. A scene represents a single page of visible buttons. It must have a unique name, so that it
can be referred to by button actions for navigation.

{{< example >}}

```json
{
  "scenes": {
    "myScene": {
      "buttons": [
        ["row1_button", null, null, "row1_button"],
        [],
        ["row3_button"]
      ]
    }
  }
}
```

| Key                                               | Type                                              | Description   |
| ------------------------------------------------- | ------------------------------------------------- | ------------- |
| [`<unique scene name>`](#scenesunique-scene-name) | [{{< type "Object" >}}](#scenesunique-scene-name) | A named scene |

### `scenes/<unique scene name>`

Individual scenes contain a single key: `buttons`.

| Key       | Type                              | Description             |
| --------- | --------------------------------- | ----------------------- |
| `buttons` | {{< type "(String, Null)[][]" >}} | Nested array of buttons |

The `buttons` value is a nested array of button IDs, with each inner array representing a row of buttons.

`null` values represent an empty space, and can be used in place of button IDs to space later buttons in the row.

Scenes should not contain _more_ than the configured row or column count, and this behavior is considered undefined.
However, scenes can have fewer items than the row or column.

The following would display eight buttons in a 3x3 grid, with the center square empty.

{{< example >}}

```json
{
  "buttons": [
    ["b1", "b2", "b3"],
    ["b4", null, "b5"],
    ["b6", "b7", "b8"]
  ]
}
```

Instead of a button ID, _another_ nested array (containing button IDs) can be used in a row. In this case, only the
**last visible button** in the array will be displayed. This is useful for making toggle buttons (technically two
different buttons), or other conditional buttons that occupy the same space.

{{< example >}}

```json
{
  "buttons": [
    [
      "row1_button",
      [
        "conditional_button1",
        "conditional_button2"
      ]
    ],
    ["row2_button"],
    ["row3_button"]
  ]
}
```

Several scenes have special meaning:

- The `home` scene must exist, as it is used when the webpage or process first loads.
- The `numpad` scene must exist _if_ any buttons use the `enterWcs` or `enterPosition` button actions.
- The `gcodeList` scene _should not_ exist in your scenes list, but is always available for navigation events anyway.

### Gcode File list

The file list scene layout is not configurable, since it is dynamically generated. However, the buttons used in this
scene can have their appearance customized.

It is recommended that configuration of these buttons be limited background color and image only.

| Key                      | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `fileListFile`           | GCode file button                                                     |
| `fileListFolder`         | Subfolder button                                                      |
| `fileListPreviousFolder` | "Up a directory" button                                               |
| `fileListDownArrow`      | Down arrow for scrolling when the file list overflows the grid layout |
| `fileListUpArrow`        | Up arrow for scrolling when the file list overflows the grid layout   |
| `sortScene`              | Button that links to a scene where file sort options can be selected  |

## `streamdeckUi`

This section has the exact same structure as the [`ui`](#ui) configuration. Properties in `streamdeckUi`
will override those of the `ui` section, when using a Stream Deck, and are ignored in the web version.

This allows the use of smaller fonts, brighter colors, or more aggressive throttling/rendering limits.

All properties are optional.

## `buttons`

The `buttons` configuration defines buttons, their appearance details, and what (if anything) happens when buttons are
pressed, released or held. [`Scenes`](#scenes) will refer to these buttons by their unique ID to display them their
layout.

{{< example >}}

```json
{
  "buttons": {
    "my_button": {
      "bgColor": "#ffccaa",
      "icon": "custom/my_icon.png",
      "text": "Oh no!",
      "textAlignment": "top right",
      "actions": [
        {
          "action": "navigate",
          "arguments": ["home"],
          "event": "hold"
        }
      ]
    }
  }
}
```

| Key                                                | Type                                                | Description    |
| -------------------------------------------------- | --------------------------------------------------- | -------------- |
| [`<unique button id>`](#buttonsunique-button-name) | [{{< type "Object" >}}](#buttonsunique-button-name) | A named button |

### `buttons/<unique button name>`

| Key                         | Type                                          | Description                                                                                                                                             |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`actions`](#buttonactions) | [{{< type "Object[]" >}}](#buttonactions)     | Actions to take when button is pressed, released or held                                                                                                |
| `bgColor`                   | {{< type "Integer" >}}, {{< type "String" >}} | Background color. May be a color string or [palette](#uipalette) index                                                                                  |
| `columns`                   | {{< type "Integer" >}}                        | Number of columns the button will occupy. Default: `1`                                                                                                  |
| `rows`                      | {{< type "Integer" >}}                        | Number of rows the button will occupy. Default: `1`                                                                                                     |
| `type`                      | {{< type "Enum" >}}                           | Changes the button's behavior and appearance. Allowed: [`gcodePreview`]                                                                                 |
| `icon`                      | {{< type "String" >}}                         | Image path to display, relative to `public` directory. Image will be shown over background, and behind text.                                            |
| `if`                        | {{< type "String" >}}                         | Condition used for hiding and showing the button. See: [conditions]({{< ref "variables#conditions" >}})                                                 |
| `disabled`                  | {{< type "String" >}}                         | Condition used for disabling and enabling the button. See: [conditions]({{< ref "variables#conditions" >}})                                             |
| `text`                      | {{< type "String" >}}                         | Text or text template that to be displayed on the button. See: [templates]({{< ref "variables#templates" >}})                                           |
| `textAlignment`             | {{< type "Enum" >}}                           | Text position within the button. Allowed: [`top left`, `top center`, `top right`, `left`,`center`,`right`,`bottom left`,`bottom center`,`bottom right`] |
| `textSize`                  | {{< type "Number" >}}                         | Font size modifier. Default: `1`                                                                                                                        |

### `button/actions`

A button's `actions` value defines what happens when a button is activated. Buttons can take multiple actions when
pressed, or when released, or when held down for a few moments, or a combination of those.

When a `hold` action is defined, any following `up` action will be skipped. This allows buttons to perform an action
when pressed briefly, and perform a different action if pressed for a longer period, exclusively.

| Key         | Type                    | Description                                                                                               |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `action`    | {{< type "String" >}}   | The name of an action which will be triggered based on the `event`. See: [actions]({{< ref "actions" >}}) |
| `event`     | {{< type "Enum" >}}     | When the action will take place. Allowed: [`up`,`down`,`hold`]. Default: `down`                           |
| `arguments` | {{< type "String[]" >}} | Options passed to the event. See: [actions]({{< ref "actions" >}}) for specific arguments for each event  |
