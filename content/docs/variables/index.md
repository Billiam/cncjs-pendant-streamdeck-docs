---
title: Variables
date: 2019-02-11T19:30:08+10:00
draft: false
weight: 4
summary: Reference for condition and template variables
---

## Conditions

You may want to conditionally hide buttons, or visibly disable them, based on the current application state: Whether a
job is currently running, whether the pendant is running in a web browser or a Stream Deck, whether gcode has been
loaded, and so on.

The `disabled` and `if` properties of a [button's]({{< ref "configure#buttonsunique-button-name" >}}) configuration are
strings which are evaluated with a limited set of javascript.

Math, ternary, numeric comparison and logical operators are allowed, but methods may not be executed.

Most of the application state is available for these conditions, see [variables](#variables)

Conditions which are evaluated to a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value will be
shown for `if` properties, or disabled for `disabled` properties.
Conditions which evaluate to a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value will be
hidden for `if` properties, or enabled for `disabled` properties.

{{< example >}}

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

A [button's]({{< ref "configure#buttonsunique-button-name" >}}) `text` configuration value can be used to display a
plain text string, but it can also act as a simple text _template_, containing and displaying application state
information, which will be updated and re-rendered whenever any of the referenced state changes.

A text template is a string containing `{{ code }}`. Code within these braces will be evaluated with the same rules as
[conditions](#conditions).

{{< example >}}

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

| Value                 | Type                   | Description                                                                                             |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `ui.brightness`       | {{< type "Integer" >}} | The current brightness value. [`10` - `100`] {{< badge "success" "Stream Deck only" >}}                 |
| `ui.feedrateInterval` | {{< type "Integer" >}} | The amount that feedrate will be increased or decreased by when modified                                |
| `ui.spindleInterval`  | {{< type "Integer" >}} | The amount that spindle speed will be increased or decreased by when modified                           |
| `ui.userFlags`        | {{< type "Object" >}}  | Object containing [user flag data]({{< ref "actions#user-flag-actions" >}}). Ex: `ui.userFlags.MyValue` |
| `ui.input.value`      | {{< type "String" >}}  | Numeric string representing the current value for the numpad input scene                                |
| `ui.input.previous`   | {{< type "String" >}}  | The previous value of the input being set by the numpad input scene                                     |
| `ui.input.type`       | {{< type "String" >}}  | A label for the type of input being set by the numpad input scene                                       |
| `ui.web`              | {{< type "Boolean" >}} | Whether the pendant is being used in a web browser or on a Stream Deck device                           |
| `ui.sceneName`        | {{< type "String" >}}  | The name of the currently active scene                                                                  |

### cnc

State related to the machine or cncjs's

| Value                   | Type                   | Description                                                                                                                                        |
| ----------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cnc.connected`         | {{< type "Boolean" >}} | Whether cncjs is connected to the machine by serial port                                                                                           |
| `cnc.connecting`        | {{< type "Boolean" >}} | Whether cncjs is currently in the process of connecting                                                                                            |
| `cnc.runState`          | {{< type "String" >}}  | The current controller state. One of [`Idle`, `Alarm`, `Hold`, `Jog`, `Run`]                                                                       |
| `cnc.workflowState`     | {{< type "String" >}}  | The cncjs workflow state. One of [`idle`, `paused`, `running`]                                                                                     |
| `cnc.feederState`       | {{< type "String" >}}  | The cncjs feeder state. One of [`idle`, `paused`]                                                                                                  |
| `cnc.locked`            | {{< type "Boolean" >}} | Whether the controller is in an Alarm Lock state                                                                                                   |
| `cnc.elapsedTime`       | {{< type "Integer" >}} | The elapsed job time, in seconds                                                                                                                   |
| `cnc.elapsedTimeText`   | {{< type "String" >}}  | The elapsed job time, in `hh:mm:ss` format, or empty string if not available                                                                       |
| `cnc.remainingTime`     | {{< type "Integer" >}} | The remaining job time, in seconds                                                                                                                 |
| `cnc.remainingTimeText` | {{< type "String" >}}  | The remaining job time, in `hh:mm:ss` format, or empty string if not available                                                                     |
| `cnc.alarm`             | {{< type "Boolean" >}} | Whether or not Grbl is in an alarm state                                                                                                           |
| `cnc.alarmText`         | {{< type "String" >}}  | Preformatted alarm text/reason/locked status for button display                                                                                    |
| `cnc.alarmReason`       | {{< type "String" >}}  | The reason for an alarm, if known                                                                                                                  |
| `cnc.pauseReason`       | {{< type "String" >}}  | Pause reason, if known. Example: `M6`                                                                                                              |
| `cnc.pauseMessage`      | {{< type "String" >}}  | Pause reason text, if known                                                                                                                        |
| `cnc.pauseText`         | {{< type "String" >}}  | Preformatted pause reason and text for button display                                                                                              |
| `cnc.errorMessage`      | {{< type "String" >}}  | The error reason, if the pause state is associated with an error                                                                                   |
| `cnc.feedPauseReason`   | {{< type "String" >}}  | The cncjs feed pause reason, if known                                                                                                              |
| `cnc.feedPauseMessage`  | {{< type "String" >}}  | The cncjs feed pause text, if known                                                                                                                |
| `cnc.jogDistance`       | {{< type "Number" >}}  | The distance value to use for jog commands. Does not include units                                                                                 |
| `cnc.jogSpeed`          | {{< type "Number" >}}  | The speed to use for smooth jogging. Does not include units                                                                                        |
| `cnc.settings`          | {{< type "Object" >}}  | The current raw Grbl setting values                                                                                                                |
| `cnc.wpos`              | {{< type "Object" >}}  | The current work position                                                                                                                          |
| `cnc.wpos.x`            | {{< type "String" >}}  | The current X work position                                                                                                                        |
| `cnc.wpos.y`            | {{< type "String" >}}  | The current Y work position                                                                                                                        |
| `cnc.wpos.z`            | {{< type "String" >}}  | The current Z work position                                                                                                                        |
| `cnc.wpos.a`            | {{< type "String" >}}  | The current A work position                                                                                                                        |
| `cnc.wpos.b`            | {{< type "String" >}}  | The current B work position                                                                                                                        |
| `cnc.wpos.c`            | {{< type "String" >}}  | The current C work position                                                                                                                        |
| `cnc.displayWpos`       | {{< type "String" >}}  | Preformatted multiline string of all [enabled axes]({{< ref "configure#machine" >}}) and their work positions with string padding for alignment    |
| `cnc.mpos`              | {{< type "Object" >}}  | The current machine position                                                                                                                       |
| `cnc.mpos.x`            | {{< type "String" >}}  | The current X machine position                                                                                                                     |
| `cnc.mpos.y`            | {{< type "String" >}}  | The current Y machine position                                                                                                                     |
| `cnc.mpos.z`            | {{< type "String" >}}  | The current Z machine position                                                                                                                     |
| `cnc.mpos.a`            | {{< type "String" >}}  | The current A machine position                                                                                                                     |
| `cnc.mpos.b`            | {{< type "String" >}}  | The current B machine position                                                                                                                     |
| `cnc.mpos.c`            | {{< type "String" >}}  | The current C machine position                                                                                                                     |
| `cnc.feedRate`          | {{< type "Number" >}}  | The current feed rate. Does not include units                                                                                                      |
| `cnc.spindleRpm`        | {{< type "Number" >}}  | The current spindle RPM as in integer                                                                                                              |
| `cnc.displayMpos`       | {{< type "String" >}}  | Preformatted multiline string of all [enabled axes]({{< ref "configure#machine" >}}) and their machine positions with string padding for alignment |
| `cnc.modal`             | {{< type "Object" >}}  | Grbl modal state information                                                                                                                       |
| `cnc.modal.distance`    | {{< type "String" >}}  | Current motion mode. Either `G90` or `G91`                                                                                                         |
| `cnc.modal.units`       | {{< type "String" >}}  | Current distance units. Either `G20` or `G21`                                                                                                      |
| `cnc.modal.wcs`         | {{< type "String" >}}  | The current work offset: One of [`G54`, `G55`, `G56`, `G57`, `G58`, `G59`]                                                                         |
| `cnc.isRelativeMove`    | {{< type "Boolean" >}} | Whether the current modal distance is `G91` (relative)                                                                                             |
| `cnc.distanceUnit`      | {{< type "String" >}}  | The current distance unit, one of `mm` or `in`                                                                                                     |
| `cnc.ready`             | {{< type "Boolean" >}} | Whether the machine is connected and either in the `idle` or `jog` (meaning smooth jogging) states                                                 |
| `cnc.overrides`         | {{< type "Object" >}}  | Current Grbl speed overrides                                                                                                                       |
| `cnc.overrides.feed`    | {{< type "Integer" >}} | The current feed rate override [`10` - `200`]                                                                                                      |
| `cnc.overrides.spindle` | {{< type "Integer" >}} | The current spindle speed override [`10` - `200`]                                                                                                  |
| `cnc.overrides.rapid`   | {{< type "Integer" >}} | The current rapid speed override. One of: [`25`, `50`, `100`]                                                                                      |
| `cnc.hold`              | {{< type "Boolean" >}} | Whether the controller state is currently `Hold`                                                                                                   |
| `cnc.paused`            | {{< type "Boolean" >}} | Whether both the cncjs workflow and feed state are both in a paused state                                                                          |
| `cnc.feedPaused`        | {{< type "Boolean" >}} | Whether the cncjs feed state is `paused`                                                                                                           |
| `cnc.idle`              | {{< type "Boolean" >}} | Whether the cncjs workflow and feed state are both in a idle state                                                                                 |
| `cnc.running`           | {{< type "Boolean" >}} | Whether the cncjs workflow state is `Running` and the feed state is `idle`                                                                         |
| `cnc.axisLimits`        | {{< type "Object" >}}  | The current Grbl axis limits. Keys depend on [machine axes configuration]({{< ref "configure#machine" >}})                                         |

### `gcode`

State related to the currently loaded gcode.

| Value                      | Type                  | Description                                              |
| -------------------------- | --------------------- | -------------------------------------------------------- |
| `gcode.name`               | {{< type "String" >}} | The path to the currently loaded gcode file, if any      |
| `gcode.gcode`              | {{< type "String" >}} | The raw gcode content, if loaded                         |
| `gcode.displayRange`       | {{< type "Object" >}} | Preformatted range information from the loaded gcode     |
| `gcode.displayRange.min`   | {{< type "Object" >}} | The minimum axis range for the loaded gcode              |
| `gcode.displayRange.min.x` | {{< type "String" >}} | The minimum X axis value for the loaded gcode            |
| `gcode.displayRange.min.y` | {{< type "String" >}} | The minimum Y axis value for the loaded gcode            |
| `gcode.displayRange.min.z` | {{< type "String" >}} | The minimum Z axis value for the loaded gcode            |
| `gcode.displayRange.max`   | {{< type "Object" >}} | The maximum axis range for the loaded gcode              |
| `gcode.displayRange.max.x` | {{< type "String" >}} | The maximum X axis value for the loaded gcode            |
| `gcode.displayRange.max.y` | {{< type "String" >}} | The maximum Y axis value for the loaded gcode            |
| `gcode.displayRange.max.z` | {{< type "String" >}} | The maximum Z axis value for the loaded gcode            |
| `gcode.displayRange`       | {{< type "Object" >}} | Preformatted dimension information from the loaded gcode |
| `gcode.displayRange.x`     | {{< type "String" >}} | Total gcode width along the X axis                       |
| `gcode.displayRange.y`     | {{< type "String" >}} | Total gcode depth along the Y axis                       |
| `gcode.displayRange.z`     | {{< type "String" >}} | Total gcode height along the Z axis                      |
