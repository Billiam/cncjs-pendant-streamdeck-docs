---
title: 'Configuration'
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 2
summary: Configuration reference for the `config.json` file
---

Buttons, layout, and other behavior are configured with the `config.json` file.

The cost of high customizability is unfortunately high complexity. The configuration documentation here
is for reference, but it is _strongly_ recommended that you just start with the 
[default config](https://github.com/Billiam/cncjs-pendant-streamdeck/blob/main/src/public/config.example.json) and
modify it as you go, rather than starting from scratch.

The top level configuration object has the following keys:

| Key                   | Type     | Description                               |
|-----------------------|----------|-------------------------------------------|
| [`cncjs`](#cncjs)     | `Object` | Connection information                    |
| [`ui`](#ui)           | `Object` | Global grid size and default colors       |
| [`buttons`](#buttons) | `Object` | Button display and actions                |
| [`scenes`](#scenes)   | `Object` | Button layout on individual pages         |
| [`machine`](#machine) | `Object` | Machine axes and per-axis speed modifiers |

## `cncjs`

Used to configure connection to the cncjs server, and controller serial port

**example**

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

| Key                     | Type                 | Description                                                                                        |
|-------------------------|----------------------|----------------------------------------------------------------------------------------------------|
| `accessTokenExpiration` | (`String`,`Integer`) | Expiration time web token, in seconds or as a duration string (_Stream Deck only_). Default: `30d` |
| `baudRate`              | `Integer`            | Serial connection baud rate                                                                        |
| `port`                  | `String`             | Serial connection port                                                                             |
| `controllerType`        | `Enum`               | Controller type. Allowed: [`Grbl`]                                                                 |
| `socketAddress`         | `String`             | URL for socket connection to cncjs. Usually `localhost`                                            |
| `socketPort`            | `Integer`            | Socket connection port for cncjs. Usually `80` or `8000`                                           |

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
| Key                                | Type                           | Description                                                     |
|------------------------------------|--------------------------------|-----------------------------------------------------------------|
| `axes`                             | `String[]`                     | Array of axes in use. Allowed values: [`a`,`b`,`c`,`x`,`y`,`z`] |
| [`axisSpeeds`](#machineaxisSpeeds) | [`Object`](#machineaxisSpeeds) | Per-axis speed overrides, used for smooth jogging               |

### `machine/axisSpeeds`

Override smooth jog speeds on a per-axis basis. Allows moving specific axes slower or faster than the current smooth jog travel speed.

| Key | Type     | Description                                          |
|-----|----------|------------------------------------------------------|
| `a` | `Number` | Travel speed multiplier for the A axis. Default: `1` |
| `b` | `Number` | Travel speed multiplier for the B axis. Default: `1` |
| `c` | `Number` | Travel speed multiplier for the C axis. Default: `1` |
| `x` | `Number` | Travel speed multiplier for the X axis. Default: `1` |
| `y` | `Number` | Travel speed multiplier for the Y axis. Default: `1` |
| `z` | `Number` | Travel speed multiplier for the Z axis. Default: `1` |

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
    "progressColor": 3,
    "rows": 3,
    "textColor": "#fff",
    "textShadow": true,
    "timeout": 180
  }
}
```

| Key                             | Type                       | Description                                                                                  |
|---------------------------------|----------------------------|----------------------------------------------------------------------------------------------|
| `bgColor`                       | (`Integer`,`String`)       | Default background color for buttons. May be a color string or [palette](#uipalette) index   |
| `brightness`                    | `Integer`                  | Default Stream Deck brightness. [`10` - `100`]                                               |
| `columns`                       | `Integer`                  | Number of columns to display                                                                 |
| `rows`                          |                            | Number of rows to display                                                                    |
| `font`                          | `String`                   | Font to use for text display. Default: `monospace`                                           |
| `fontSize`                      | `String`                   | Font size to use for text display                                                            |
| `lineHeight`                    | `String`                   | Line height for text display as a percentage of font size. Default: `1.1`                    |
| [`gcodeColors`](#uigcodeColors) | [`Object`](#uigcodeColors) | Line and curve colors for gcode rendering.                                                   |
| `palette`                       | `String[]`                 | Array of colors that buttons and other color settings may refer to by index                  |
| `progressColor`                 | (`Integer`,`String`)       | Color to use for button hold indicator. May be a color string or [palette](#uipalette) index |
| `textColor`                     | (`Integer`,`String`)       | Color to use for button text. May be a color string or [palette](#uipalette) index           |
| `timeout`                       | `Integer`                  | Duration, in seconds, before blanking display. _Stream Deck only_.                           |

### `ui/gcodeColors`

Gcode preview can use different colors for rapid travel, straight and curved cuts. Colors may use `rgb(0, 50, 200)`, hex `#001122` etc.
Palette colors are not supported here.

| Key    | Type     | Description                              |
|--------|----------|------------------------------------------|
| `G0`   | `String` | Color to use for rapid travel moves.     |
| `G1`   | `String` | Color to use for straight line cut moves |
| `G2G3` | `String` | Color to use for curve cut moves         |

The following variables are available to button conditions (like `if` and `disabled`), and templated text.

### `ui/palette`

Palette colors are an array of color strings (of any length).
You can refer to these colors in most places that expect a color by referencing their array index.

This helps keep your color choices consistent, and allows changing many colors at once if needed.

**example**

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

**example**

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

| Key                                             | Type                               | Description    |
|-------------------------------------------------|------------------------------------|----------------|
| [`<unique scene name>`](#scenesuniquescenename) | [`Object`](#scenesuniquescenename) | A named scene  |

### `scenes/<unique scene name>`

Individual scenes contain a single key: `buttons`.

| Key       | Type                | Description             |
|-----------|---------------------|-------------------------|
| `buttons` | `(String,Null)[][]` | Nested array of buttons |

The `buttons` value is a nested array of button IDs, with each inner array representing a row of buttons.

`null` values represent an empty space, and can be used in place of button IDs to space later buttons in the row.

Scenes should not contain _more_ than the configured row or column count, and this behavior is considered undefined.
However, scenes can have fewer items than the row or column.

The following would display eight buttons in a 3x3 grid, with the center square empty.

**example**

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

**example**

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

* The `home` scene must exist, as it is used when the webpage or process first loads.
* The `numpad` scene must exist _if_ any buttons use the `enterWcs` or `enterPosition` button actions.
* The `gcodeList` scene _should not_ exist in your scenes list, but is always available for navigation events anyway.

## `buttons`


The `buttons` configuration defines buttons, their appearance details, and what (if anything) happens when buttons are
pressed, released or held. [`Scenes`](#scenes) will refer to these buttons by their unique ID to display them their layout.

**example**

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

| Key                                             | Type                                 | Description    |
|-------------------------------------------------|--------------------------------------|----------------|
| [`<unique button id>`](buttonsuniquebuttonname) | [`Object`](#buttonsuniquebuttonname) | A named button |

### `buttons/<unique button name>`

| Key                          | Type                         | Description                                                                                                                                             |
|------------------------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`actions`](#buttonactions)  | [`Object[]`](#buttonactions) | Actions to take when button is pressed, released or held                                                                                                |
| `bgColor`                    | (`Integer`,`String`)         | Background color. May be a color string or [palette](#uipalette) index                                                                                  |
| `columns`                    | `Integer`                    | Number of columns the button will occupy. Default: `1`                                                                                                  |
| `rows`                       | `Integer`                    | Number of rows the button will occupy. Default: `1`                                                                                                     |
| `type`                       | `Enum`                       | Changes the button's behavior and appearance. Allowed: [`gcodePreview`]                                                                                 |
| `icon`                       | `String`                     | Image path to display, relative to `public` directory. Image will be shown over background, and behind text.                                            |
| `if`                         | `String`                     | Condition used for hiding and showing the button. See: [conditions](#conditions)                                                                        |
| `disabled`                   | `String`                     | Condition used for disablind and enabling the button. See: [conditions](#conditions)                                                                    |
| `text`                       | `String`                     | Text or text template that to be displayed on the button. See: [templates](#templates)                                                                  |
| `textAlignment`              | `Enum`                       | Text position within the button. Allowed: [`top left`, `top center`, `top right`, `left`,`center`,`right`,`bottom left`,`bottom center`,`bottom right`] |


### `button/actions`

A button's `actions` value defines what happens when a button is activated. Buttons can take multiple actions when pressed,
or when released, or when held down for a few moments, or a combination of those.

When a `hold` action is defined, any following `up` action will be skipped. This allows buttons to perform an action when
pressed briefly, and perform a different action if pressed for a longer period, exclusively.

| Key         | Type       | Description                                                                                  |
|-------------|------------|----------------------------------------------------------------------------------------------|
| `action`    | `String`   | The name of an action which will be triggered based on the `event`. See: [actions](#actions) |
| `event`     | `Enum`     | When the action will take place. Allowed: [`up`,`down`,`hold`]. Default: `down`              |
| `arguments` | `String[]` | Options passed to the event. See: [actions](#actions) for specific arguments for each event  |
