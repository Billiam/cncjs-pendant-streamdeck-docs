---
title: Variables
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 4
summary: Reference for condition and template variables
---

## Conditions

You may want to conditionally hide buttons, or visibly disable them, based on the current application state: Whether a job
is currently running, whether the pendant is running in a web browser or a Stream Deck, whether gcode has been loaded,
and so on.

The `disabled` and `if` properties of a [button's]({{< ref "configure#buttonsunique-button-name" >}}) configuration are strings which are
evaluated with a limited set of javascript.

Math, ternary, numeric comparison and logical operators are allowed, but methods may not be executed.

Most of the application state is available for these conditions, see [variables](#variables)

Conditions which are evaluated to a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value will be
shown for `if` properties, or disabled for `disabled` properties.
Conditions which evaluate to a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value will be
hidden for `if` properties, or enabled for `disabled` properties.

**example**

```json
{
  "buttons": {
    "web_only_alarm_button": {
      "if": "ui.web",
      "disabled": "!cnc.alarm"
    },
    "increase_feed_rate": {
      "disabled": "cnc.overrides.feed === 200"
    }
  }
}
```

## Templates

A [button's]({{< ref "configure#buttonsunique-button-name" >}}) `text` configuration value can be used to display a plain text string, but it can also act as a simple text
_template_, containing and displaying application state information, which will be updated and re-rendered whenever any
of the referenced state changes.

A text template is a string containing `{{ code }}`. Code within these braces will be evaluated with the same rules as
[conditions](#conditions).

**example**

```json
{
  "buttons": {
    "hello_world": {
      "text": "hello world!"
    },
    "Current X Position": {
      "text": "X Position: {{cnc.mpos.x}}"
    }
  }
}
```

## Variables

Variables represent pieces of application state that can be used for [conditions](#conditions) and
[text templates](#templates). Some of these values are internal only, and unlikely to be useful for button
display. These have not been documented below.

These variables are available under 3 different objects: [`ui`](#ui), [`cnc`](#cnc) and [`gcode`](#gcode).

### `ui`

State related to the current pendant user interface

| Value                 | Type      | Description                                                                                             |
|-----------------------|-----------|---------------------------------------------------------------------------------------------------------|
| `ui.brightness`       | `Integer` | The current brightness value. [`10` - `100`] {{< badge "success" "Stream Deck only" >}}                 |
| `ui.feedrateInterval` | `Integer` | The amount that feedrate will be increased or decreased by when modified                                |
| `ui.spindleInterval`  | `Integer` | The amount that spindle speed will be increased or decreased by when modified                           |
| `ui.userFlags`        | `Object`  | Object containing [user flag data]({{< ref "actions#user-flag-actions" >}}). Ex: `ui.userFlags.MyValue` |
| `ui.input.value`      | `String`  | Numeric string representing the current value for the numpad input scene                                |
| `ui.input.previous`   | `String`  | The previous value of the input being set by the numpad input scene                                     |
| `ui.input.type`       | `String`  | A label for the type of input being set by the numpad input scene                                       |
| `ui.web`              | `Boolean` | Whether the pendant is being used in a web browser or on a Stream Deck device                           |
| `ui.sceneName`        | `String`  | The name of the currently active scene                                                                  |

### cnc

State related to the machine or cncjs's

| Value                   | Type      | Description                                                                                                                 |
|-------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------|
| `cnc.connected`         | `Boolean` | Whether cncjs is connected to the machine by serial port                                                                    |
| `cnc.connecting`        | `Boolean` | Whether cncjs is currently in the process of connecting                                                                     |
| `cnc.runState`          | `String`  | The current controller state. One of [`Idle`, `Alarm`, `Hold`, `Jog`, `Run`]                                                |
| `cnc.workflowState`     | `String`  | The cncjs workflow state. One of [`idle`, `paused`, `running`]                                                              |
| `cnc.feederState`       | `String`  | The cncjs feeder state. One of [`idle`, `paused`]                                                                           |
| `cnc.locked`            | `Boolean` | Whether the controller is in an Alarm Lock state                                                                            |
| `cnc.elapsedTime`       | `Integer` | The elapsed job time, in seconds                                                                                            |
| `cnc.elapsedTimeText`   | `String`  | The elapsed job time, in `hh:mm:ss` format, or empty string if not available                                                |
| `cnc.remainingTime`     | `Integer` | The remaining job time, in seconds                                                                                          |
| `cnc.remainingTimeText` | `String`  | The remaining job time, in `hh:mm:ss` format, or empty string if not available                                              |
| `cnc.alarm`             | `Boolean` | Whether or not Grbl is in an alarm state                                                                                    |
| `cnc.alarmText`         | `String`  | Preformatted alarm text/reason/locked status for button display                                                             |
| `cnc.alarmReason`       | `String`  | The reason for an alarm, if known                                                                                           |
| `cnc.pauseReason`       | `String`  | Pause reason, if known. Example: `M6`                                                                                       |
| `cnc.pauseMessage`      | `String`  | Pause reason text, if known                                                                                                 |
| `cnc.pauseText`         | `String`  | Preformatted pause reason and text for button display                                                                       |
| `cnc.errorMessage`      | `String`  | The error reason, if the pause state is associated with an error                                                            |
| `cnc.feedPauseReason`   | `String`  | The cncjs feed pause reason, if known                                                                                       |
| `cnc.feedPauseMessage`  | `String`  | The cncjs feed pause text, if known                                                                                         |
| `cnc.jogDistance`       | `Number`  | The distance value to use for jog commands. Does not include units                                                          |
| `cnc.jogSpeed`          | `Number`  | The speed to use for smooth jogging. Does not include units                                                                 |
| `cnc.settings`          | `Object`  | The current raw Grbl setting values                                                                                         |
| `cnc.wpos`              | `Object`  | The current work position                                                                                                   |
| `cnc.wpos.x`            | `String`  | The current X work position                                                                                                 |
| `cnc.wpos.y`            | `String`  | The current Y work position                                                                                                 |
| `cnc.wpos.z`            | `String`  | The current Z work position                                                                                                 |
| `cnc.wpos.a`            | `String`  | The current A work position                                                                                                 |
| `cnc.wpos.b`            | `String`  | The current B work position                                                                                                 |
| `cnc.wpos.c`            | `String`  | The current C work position                                                                                                 |
| `cnc.displayWpos`       | `String`  | Preformatted multiline string of all [enabled axes](#machine) and their work positions with string padding for alignment    |
| `cnc.mpos`              | `Object`  | The current machine position                                                                                                |
| `cnc.mpos.x`            | `String`  | The current X machine position                                                                                              |
| `cnc.mpos.y`            | `String`  | The current Y machine position                                                                                              |
| `cnc.mpos.z`            | `String`  | The current Z machine position                                                                                              |
| `cnc.mpos.a`            | `String`  | The current A machine position                                                                                              |
| `cnc.mpos.b`            | `String`  | The current B machine position                                                                                              |
| `cnc.mpos.c`            | `String`  | The current C machine position                                                                                              |
| `cnc.displayMpos`       | `String`  | Preformatted multiline string of all [enabled axes](#machine) and their machine positions with string padding for alignment |
| `cnc.modal`             | `Object`  | Grbl modal state information                                                                                                |
| `cnc.modal.distance`    | `String`  | Current motion mode. Either `G90` or `G91`                                                                                  |
| `cnc.modal.units`       | `String`  | Current distance units. Either `G20` or `G21`                                                                               |
| `cnc.modal.wcs`         | `String`  | The current work offset: One of [`G54`, `G55`, `G56`, `G57`, `G58`, `G59`]                                                  |
| `cnc.isRelativeMove`    | `Boolean` | Whether the current modal distance is `G91` (relative)                                                                      |
| `cnc.distanceUnit`      | `String`  | The current distance unit, one of `mm` or `in`                                                                              |
| `cnc.ready`             | `Boolean` | Whether the machine is connected and either in the `idle` or `jog` (meaning smooth jogging) states                          |
| `cnc.overrides`         | `Object`  | Current Grbl speed overrides                                                                                                |
| `cnc.overrides.feed`    | `Integer` | The current feed rate override [`10` - `200`]                                                                               |
| `cnc.overrides.spindle` | `Integer` | The current spindle speed override [`10` - `200`]                                                                           |
| `cnc.overrides.rapid`   | `Integer` | The current rapid speed override. One of: [`25`, `50`, `100`]                                                               |
| `cnc.hold`              | `Boolean` | Whether the controller state is currently `Hold`                                                                            |
| `cnc.paused`            | `Boolean` | Whether both the cncjs workflow and feed state are both in a paused state                                                   |
| `cnc.feedPaused`        | `Boolean` | Whether the cncjs feed state is `paused`                                                                                    |
| `cnc.idle`              | `Boolean` | Whether the cncjs workflow and feed state are both in a idle state                                                          |
| `cnc.running`           | `Boolean` | Whether the cncjs workflow state is `Running` and the feed state is `idle`                                                  |
| `cnc.axisLimits`        | `Object`  | The current Grbl axis limits. Keys depend on [machine axes configuration]({{< ref "configure#machine" >}})                  |

### `gcode`

State related to the currently loaded gcode.

| Value                      | Type     | Description                                              |
|----------------------------|----------|----------------------------------------------------------|
| `gcode.name`               | `String` | The path to the currently loaded gcode file, if any      |
| `gcode.gcode`              | `String` | The raw gcode content, if loaded                         |
| `gcode.displayRange`       | `Object` | Preformatted range information from the loaded gcode     |
| `gcode.displayRange.min`   | `Object` | The minimum axis range for the loaded gcode              |
| `gcode.displayRange.min.x` | `String` | The minimum X axis value for the loaded gcode            |
| `gcode.displayRange.min.y` | `String` | The minimum Y axis value for the loaded gcode            |
| `gcode.displayRange.min.z` | `String` | The minimum Z axis value for the loaded gcode            |
| `gcode.displayRange.max`   | `Object` | The maximum axis range for the loaded gcode              |
| `gcode.displayRange.max.x` | `String` | The maximum X axis value for the loaded gcode            |
| `gcode.displayRange.max.y` | `String` | The maximum Y axis value for the loaded gcode            |
| `gcode.displayRange.max.z` | `String` | The maximum Z axis value for the loaded gcode            |
| `gcode.displayRange`       | `Object` | Preformatted dimension information from the loaded gcode |
| `gcode.displayRange.x`     | `String` | Total gcode width along the X axis                       |
| `gcode.displayRange.y`     | `String` | Total gcode depth along the Y axis                       |
| `gcode.displyaRange.z`     | `String` | Total gcode height along the Z axis                      |
