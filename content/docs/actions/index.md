---
title: Actions
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 40
summary: Reference for actions that can be used by buttons
---

If a button has any arguments available, they are document below.

Button arguments are always an array of strings, like:

```json
{
  "arguments": ["argument 1", "argument 2", "argument 3"]
}
```

## Navigation actions

There are several different actions used for navigating between scenes. The difference between these is what happens
when navigating back with [`backScene`]({{< ref "#backscene" >}}).

### `navigate`

Change to the selected scene. [`backScene`]({{< ref "#backscene" >}}) will return to the previous scene where the
navigation was triggered.

| Argument | Description            |
| -------- | ---------------------- |
| scene id | The scene to change to |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "navigate",
      "event": "up",
      "arguments": ["home"]
    }
  ]
}
```

### `setScene`

Change to the selected scene, clearing all back button history. This can be used to return "home" without allowing a
[`backScene`](#backscene) action afterward

| Argument | Description            |
| -------- | ---------------------- |
| scene id | The scene to change to |

### `swapScene`

Replace the current scene with the selected scene. `backScene` will return to the scene _before_ the scene where the
action was triggered. This can be used to apparently change several button states at once invisibly.

| Argument | Description            |
| -------- | ---------------------- |
| scene id | The scene to change to |

### `backScene`

Returns to the previous scene.

## Jogging actions

### `jog`

Jog in the given direction, based on [`jogDistance`](#jogdistance)

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| sign     | The direction of motion. One of `-` or `+`            |
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `startSmoothJog`

Start smooth jogging in the given direction

Based on [`jogSpeed`](#jogspeed) and the [`machine.axisSpeeds`]({{< ref "configure#machine" >}}) config. Multiple jog
directions may be active at the same time.

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| sign     | The direction of motion. One of `-` or `+`            |
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "startSmoothJog",
      "arguments": ["+", "x"]
    },
    {
      "action": "stopSmoothJog",
      "arguments": ["+", "x"],
      "event": "up"
    }
  ]
}
```

### `stopSmoothJog`

Stop smooth jogging in the given direction.

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| sign     | The direction of motion. One of `-` or `+`            |
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `jogDistance`

Change the current jog distance, which affects future [`jog`](#jog) distances.

| Argument | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| sign     | Whether to increase or decrease the current jog distance. One of `-` or `+` |

### `jogSpeed`

Change the current smooth jog speed, which affects future [`smoothjog`](#startsmoothjog) speeds.

| Argument | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| sign     | Whether to increase or decrease the current smooth jog speed. One of `-` or `+` |

## Interface actions

### `brightness`

Change the current screen brightness. {{< badge "success" "Stream Deck only" >}}

### `fullscreen`

Toggle fullscreen {{< badge "primary" "web only" >}}

## Override actions

### `increaseFeedrate`

Increase the feedrate override based on [feedrate interval](#togglefeedrateinterval)

### `decreaseFeedrate`

Decrease the feedrate override based on [feedrate interval](#togglefeedrateinterval)

### `toggleFeedrateInterval`

Toggle how much the feedrate is changed by the [feedrate action](#increasefeedrate), either 1% or 10%.

### `resetFeedrate`

Reset the feedrate override to 100%

### `increaseSpindle`

Increase the spindle speed override based on the [spindle interval](#togglespindleinterval)

### `decreaseSpindle`

Increase the spindle speed override based on the [spindle interval](#togglespindleinterval)

### `toggleSpindleInterval`

Toggle how much the spindle speed is changed by the [spindle action](#increasespindle), either 1% or 10%.

### `resetSpindle`

Reset the spindle speed override to 100%

### `setRapids`

Change the rapid speed override

| Argument | Description                                     |
| -------- | ----------------------------------------------- |
| speed    | The new rapid speed. One of [`25`, `50`, `100`] |

### `enterSpindleSpeed`

Opens the special `numpad` scene for the selected axis. When a number has been entered and confirmed with the
[`completeInput`](#completeinput) action, the spindle rotation will be set to the selected value and configured
direction using M3 or M4 gcode.

| Argument  | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| direction | The direction of motion for the selected spindle speed, one of `CW`, `CCW` |

## User flag actions

User flags are arbitrary, temporary variables that can be displayed as [dynamic text]({{< ref "variables#templates" >}})
in buttons, or used as [conditions]({{< ref "variables#conditions" >}}) for changing a button's visibility or
enabled/disabled status. They can be set, removed, or toggled.

These variables are not persisted, and will be reset when the page is reloaded, or when the Stream Deck process is
restarted.

### `setUserFlag`

Associate an arbitrary name with a string value

| Argument | Description                             |
| -------- | --------------------------------------- |
| key      | A name to associate with a string value |
| value    | The value to save in the above key      |

### `clearUserFlag`

Remove an existing user flag

| Argument | Description                  |
| -------- | ---------------------------- |
| key      | The user flag name to remove |

### `toggleUserFlag`

Toggle a user flag.

The user flag does not need to exist before toggling. It will be set to `true` on the first toggle

| Argument | Description                  |
| -------- | ---------------------------- |
| key      | The user flag name to remove |

## Numeric input actions

### `input`

Adds one or more characters to the end of the current numeric input

| Argument | Description                                     |
| -------- | ----------------------------------------------- |
| value    | The string to append to the current input value |

### `inputCommand`

Input commands modify the current input value.

| Argument | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| command  | The operation to take on the current value. One of: [`backspace`, `toggleSign`] |

**Commands:**

- `toggleSign`: Flip the current input value from positive to negative, or negative to positive
- `backspace`: Remove the last character from the end of the current input value

### `completeInput`

Save the current value and return to the previous scene

## Positioning actions

### `absoluteMachinePosition`

Move to a specific position, relative to the machine zero position.

Accepts a single string which will be used as arguments to a `G53 G0` move.

| Argument | Description  |
| -------- | ------------ |
| position | New position |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "absoluteMachinePosition",
      "arguments": ["X-100 Y-20"]
    }
  ]
}
```

### `absoluteWorkPosition`

Move to a specific position, relative to the current work zero position.

Accepts a single string which will be used as arguments to a `G0` move.

| Argument | Description  |
| -------- | ------------ |
| position | New position |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "absoluteWorkPosition",
      "arguments": ["X10 Y20 A5"]
    }
  ]
}
```

### `goto`

Move to a specific absolute machine position on one or more axes.

When an argument is given as a percentage (ex: `"25%"`), the position will be calculated based on machine dimensions.

Previously, `goto` also supported non-percentage movement. However, this has been deprecated in favor of
[absoluteMachinePosition]({{< ref "#absolutemachineposition" >}}) and
[absoluteWorkPosition]({{< ref "#absoluteworkposition" >}}), and the previous functionality will be removed in a later
version.

| Argument   | Description                |
| ---------- | -------------------------- |
| X position | X axis position to move to |
| Y position | Y axis position to move to |
| Z position | Z axis position to move to |
| A position | A axis position to move to |
| B position | B axis position to move to |
| C position | C axis position to move to |

{{< example >}}

In the below example, the machine will be moved to 10% of the maximum Y range, 30 Z, and 50% of the maximum C axis
range.

```json
{
  "actions": [
    {
      "action": "goto",
      "arguments": [null, "10%", 30, null, null, "50%"]
    }
  ]
}
```

### `homing`

Home all axes

### `enterPosition`

Opens the special `numpad` scene for the selected axis. When a number has been entered and confirmed with the
[`completeInput`](#completeinput) action, the machine will be moved to selected position on the axis.

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `enterWcs`

Opens the special `numpad` scene for the selected axis. When a number has been entered and confirmed with the
[`completeInput`](#completeinput) action, the selected axis's work coordinate offset will be changed to the
selected value

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

## Gcode actions

### `refreshWatchFolder`

Refresh the cncjs watch folder and open the [file list]({{< ref "configure#gcode-file-list" >}})

### `sortDetails`

Change the sort order of the [file list]({{< ref "configure#gcode-file-list" >}})

| Argument   | Description                                                                              |
| ---------- | ---------------------------------------------------------------------------------------- |
| sort order | The new sorting order. One of `alpha_asc`, `alpha_desc`, `created_desc`, `modified_desc` |

### `clearGcode`

Clears cncjs's loaded gcode, if a gcode file has been loaded

### `gcode`

Run arbitrary gcode

| Argument | Description  |
| -------- | ------------ |
| gcode    | Gcode to run |

### `macro`

Run a cncjs macro. Macros run from this pendant do not currently have access to some cncjs variables,
like `[ymin]` and `[xmax]`. Macros which require these should not be used.

Macros can either be identified by their UUID using the first argument, or (less efficiently) by their exact name, using
the second argument.

If the first argument (the UUID) is not provided, the second one (the name) must be instead, and vice-versa.

| Argument   | Description                   |
| ---------- | ----------------------------- |
| macro id   | The UUID of the macro to run. |
| macro name | The name of the macro to run. |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "macro",
      "arguments": [null, "My Macro"]
    }
  ]
}
```

### `outline`

Parses the currently loaded gcode and jogs around its perimeter.

**Limitations**: gcode parsing and perimeter building is not 100% accurate. Some types of arcs (like those on 3 planes),
may not be processed, resulting in straight line paths between their outermost points. All other arcs will be split into
small straight line movements which can be misleading for small curves.

### `loadDetailFile`

Used on the file details scene to load the gcode file being inspected. Not usable outside of this scenario.

## Utility actions

### `command`

Run a cncjs custom command. Commands are defined in the cncjs interface in Settings > Commands.

Commands can either be identified by their UUID using the first argument, or (less efficiently) by their exact title,
using the second argument. The UUID can be found in your `.cncrc` config file.

If the first argument (the UUID) is not provided, the second one (the title) must be instead, and vice-versa.

| Argument      | Description                     |
| ------------- | ------------------------------- |
| command id    | The UUID of the command to run  |
| command title | The title of the command to run |

{{< example >}}

```json
{
  "actions": [
    {
      "action": "command",
      "arguments": [null, "My Restart Command"]
    }
  ]
}
```

## CNC state actions

These actions relate to the current feed and run state

### `connect`

If disconnected, `connect` will attempt to open the serial port using the [cncjs]({{< ref "configure#cncjs" >}})`
serial configuration.

### `run`

Start running the loaded gcode

### `stop`

Stop running the current gcode job

### `pause`

Pause the currently running gcode job

### `hold`

Feed hold. Decelerate axes and pause the current job

### `unhold`

Cycle start. Resume cutting after a feed hold

### `reset`

Soft reset the controller, maintaining machine position.

### `unlock`

Issue an Alarm Unlock command

### `stopFeed`

Stop cncjs's feeder queue

### `startFeed`

Start cncjs's feeder queue if stopped
