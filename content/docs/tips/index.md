---
title: Tips
date: 2022-07-20T18:47:00-06:00
draft: false
weight: 20
summary: Tips for working configuring the pendant
---

## Improving Stream Deck performance

Unlike the web UI, which uses normal DOM operations for button display, Stream Deck rendering is handled by serverside
image and SVG compositing which can be expensive on low end systems.

If the interface feels sluggish, there are some configuration changes which can help:

- Limit the number of visible buttons. Ensure that buttons which are covered by other buttons are set to `show: false`
- Limit the number of visible buttons which require frequent updates, including updates to their text content or
  disabled state.
- Limit button rendering complexity: A single, flat image is faster to render than compositing a
  background, overlay image and SVG text (but less convenient).
- Throttle button updates. `ui.throttle: 100` will ensure that at most 10 updates per second are allowed for a single
  button.
- For very large gcode files, the benefit of displaying accurate gcode dimensions or rendering the gcode may not be worth
  the cost of parsing the gcode. You can limit the number of gcode lines which will be processed with the `ui.gcodeLimit`
  setting.

Additionally, the Stream Deck can be connected to a different machine than the one running cncjs, at the cost of some
additional network latency.

## Toggling button appearance

If you want to change a button's appearance after it's been pressed, you have a few options:

### Toggle button

Here's an example of two buttons occupying the same space, with only one visible at a time. This gives the impression
of having a button with different "on" and "off" state.

Set the [`if`]({{< ref "variables#conditions" >}}) value for each button to something some mutually-exclusive
condition, and use a nested array in place of a button id in the scene to display both buttons in the same
location.

```json
{
  "buttons": {
    "button_1": {
      "actions": [
        {
          "action": "setRapids",
          "arguments": ["25"]
        }
      ],
      "if": "cnc.overrides.rapids === 25"
    },
    "button_2": {
      "actions": [
        {
          "action": "setRapids",
          "arguments": ["50"]
        }
      ],
      "if": "cnc.overrides.rapids === 50"
    }
  },
  "scenes": {
    "home": {
      "buttons": [["back", ["button_1", "button_2"]]]
    }
  }
}
```

### Radio button

Here's an example of two buttons that could appear side by side, with only one active at once, and the other being
grayed out, and non-interactive.

Set the [`disabled`]({{< ref "variables#conditions" >}}) value for each button to something some mutually-exclusive
condition.

```json
{
  "buttons": {
    "button_1": {
      "actions": [
        {
          "action": "setRapids",
          "arguments": ["25"]
        }
      ],
      "disabled": "cnc.overrides.rapids === 25"
    },
    "button_2": {
      "actions": [
        {
          "action": "setRapids",
          "arguments": ["50"]
        }
      ],
      "disabled": "cnc.overrides.rapids === 50"
    }
  },
  "scenes": {
    "home": {
      "buttons": [["back", "button_1", "button_2"]]
    }
  }
}
```
