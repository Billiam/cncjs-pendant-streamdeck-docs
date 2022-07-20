---
title: Actions
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 4
summary: Reference for actions that can be used by buttons
---

## Navigation actions

There are several different actions used for navigating between scenes. The difference between these is what happens
when navigating back with `backScene`.

### `actions/navigate`

Change to the selected scene. `backScene` will return to the previous scene where the navigation was triggered.

| Argument | Description             |
|----------|-------------------------|
| scene id | The scene to change to  |

**example**

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

### `actions/setScene`

Change to the selected scene, clearing all back button history. This can be used to return "home" without allowing a `backScene` action afterward

| Argument | Description             |
|----------|-------------------------|
| scene id | The scene to change to  |

### `actions/swapScene`

Replace the current scene with the selected scene. `backScene` will return to the scene _before_ the scene where the action was triggered. This can be used to apparently change several button states at once invisibly.

| Argument | Description             |
|----------|-------------------------|
| scene id | The scene to change to  |

### `actions/backScene`

Returns to the previous scene.

## Jogging actions

### `actions/jog`

Jog in the given direction, based on `cnc.jogDistance`

| Argument  | Description                                           |
|-----------|-------------------------------------------------------|
| direction | The direction of motion. One of `-` or `+`            |
| axis      | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `actions/startSmoothJog`

Start smooth jogging in the given direction

Based on `cnc.jogSpeed` and `machine.axisSpeeds`. Multiple jog directions may be active at the same time.

| Argument  | Description                                           |
|-----------|-------------------------------------------------------|
| direction | The direction of motion. One of `-` or `+`            |
| axis      | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

**example**

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

### `actions/stopSmoothJog`

Stop smooth jogging in the given direction.

| Argument  | Description                                           |
|-----------|-------------------------------------------------------|
| direction | The direction of motion. One of `-` or `+`            |
| axis      | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `actions/jogDistance`

Change the current jog distance, which affects future [`jog`](#actions/jog) distances.

| Argument  | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| direction | Whether to increase or decrease the current jog distance. One of `-` or `+` |

### `actions/jogSpeed`

Change the current smooth jog speed, which affects future [`smoothjog`](#actions/startSmoothJog) speeds.

| Argument  | Description                                                                     |
|-----------|---------------------------------------------------------------------------------|
| direction | Whether to increase or decrease the current smooth jog speed. One of `-` or `+` |

## Interface actions

### `actions/brightness`

Change the current screen brightness (_Stream Deck only_)

### `actions/fullscreen`

Toggle fullscreen (_web only_)

## Override actions

### `actions/feedrate`

Change the feedrate override

| Argument  | Description                                                     |
|-----------|-----------------------------------------------------------------|
| direction | Whether to increase or decrease the feedrate. One of `-` or `+` |

### `actions/toggleFeedrateInterval`

Toggle how much the feedrate is changed by the [feedrate action](#actionsfeedrate), either 1% or 10%.

### `actions/resetFeedrate`

Reset the feedrate override to 100%

### `actions/spindle`

Change the spindle speed override based on the [spindle interval](#actionstoggleSpindleInterval)

| Argument  | Description                                                          |
|-----------|----------------------------------------------------------------------|
| direction | Whether to increase or decrease the spindle speed. One of `-` or `+` |

### `actions/toggleSpindleInterval`

Toggle how much the spindle speed is changed by the [spindle action](#actionsspindle), either 1% or 10%.

### `actions/resetSpindle`

Reset the spindle speed override to 100%

### `actions/setRapids`

Change the rapid speed override

| Argument | Description                                     |
|----------|-------------------------------------------------|
| speed    | The new rapid speed. One of [`25`, `50`, `100`] |


## User flag actions

User flags are arbitrary, temporary variables that can be displayed as [dynamic text](#templates) in buttons, or used as
[conditions](#conditions) for changing a button's visibility or enabled/disabled status. They can be set, removed, or
toggled.

These variables are not persisted, and will be reset when the page is reloaded, or when the stream deck process is restarted.

### `actions/setUserFlag`

Associate an arbitrary name with a string value

| Argument | Description                             |
|----------|-----------------------------------------|
| key      | A name to associate with a string value |
| value    | The value to save in the above key      |

### `actions/deleteUserFlag`

Remove an existing user flag

| Argument | Description                  |
|----------|------------------------------|
| key      | The user flag name to remove |

### `actions/deleteUserFlag`

Toggle a user flag.

The user flag does not need to exist before toggling. It will be set to `true` on the first toggle

| Argument | Description                  |
|----------|------------------------------|
| key      | The user flag name to remove |

## Numeric input actions

### `actions/input`

Adds one or more characters to the end of the current numeric input

| Argument | Description                                     |
|----------|-------------------------------------------------|
| value    | The string to append to the current input value |

### `actions/inputCommand`

Input commands modify the current input value.

| Argument | Description                                                                     |
|----------|---------------------------------------------------------------------------------|
| command  | The operation to take on the current value. One of: [`backspace`, `toggleSign`] |

**Commands:**

* `toggleSign`: Flip the current input value from positive to negative, or negative to positive
* `backspace`: Remove the last character from the end of the current input value

### `actions/completeInput`

Save the current value and return to the previous scene

## Positioning actions

### `actions/goto`

Move to a specific absolute machine position one one or more axes.

When an argument is given as a percentage (ex: `"25%"`), the position will be calculated based on machine dimensions.

| Argument   | Description                |
|------------|----------------------------|
| X position | X axis position to move to |
| Y position | Y axis position to move to |
| Z position | Z axis position to move to |
| A position | A axis position to move to |
| B position | B axis position to move to |
| C position | C axis position to move to |

**example**

In the below example, the machine will be moved to 10% of the maximum Y range, 30 Z, and 50% of the maximum C axis range.

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

### `actions/homing`

Home all axes

### `actions/enterPosition`

Opens the special `numpad` scene for the selected axis. When a number has been entered and confirmed with the
[`completeInput`](#actionscompleteInput) action, the machine will be moved to selected position on the axis.

| Argument | Description                                           |
|----------|-------------------------------------------------------|
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |

### `actions/enterWcs`

Opens the special `numpad` scene for the selected axis. When a number has been entered and confirmed with the
[`completeInput`](#actionscompleteInput) action, the selected axis's work coordinate offset will be changed to the
selected value

| Argument | Description                                           |
|----------|-------------------------------------------------------|
| axis     | The axis to move, one of `x`, `y`, `z`, `a`, `b`, `c` |


## Gcode actions

### `actions/refreshWatchFolder`

Refresh the cncjs watch folder and open the [file list](#filelist)

### `actions/clearGcode`

Clears cncjs's loaded gcode, if a gcode file has been loaded

### `actions/gcode`

Run arbitrary gcode

| Argument | Description  |
|----------|--------------|
| gcode    | Gcode to run |

### `actions/macro`

Run a cncjs macro. Macros run from this pendant do not currently have access to some cncjs variables,
like `[ymin]` and `[xmax]`. Macros which require these should not be used.

| Argument   | Description                                                         |
|------------|---------------------------------------------------------------------|
| macro id   | The UUID of the macro to run. Can be found in cncjs's `.cncrc` file |
| macro name | The name of the macro to run.                                       |

**example**

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

## CNC state actions

These actions relate to the current feed and run state

### `actions/connect`

If disconnected, `connect` will attempt to open the serial port using the [cncjs](#cncjs)` serial configuration.

### `actions/run`

Start running the loaded gcode

### `actions/stop`

Stop running the current gcode job

### `actions/pause`

Pause the currently running gcode job

### `actions/hold`

Feed hold. Decelerate axes and pause the current job

### `actions/unhold`

Cycle start. Resume cutting after a feed hold

### `actions/reset`

Soft reset the controller, maintaining machine position.

### `actions/unlock`

Issue an Alarm Unlock command

### `actions/stopFeed`

Stop cncjs's feeder queue

### `actions/startFeed`

Start cncjs's feeder queue if stopped
