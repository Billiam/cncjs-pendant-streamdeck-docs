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

* Limit the number of visible buttons. Ensure that buttons which are covered by other buttons are set to `show: false`
* Limit the number of visible buttons which require frequent updates, including updates to their text content or
  disabled state.
* Limit button rendering complexity: A single, flat image is faster to render than compositing a
  background, overlay image and SVG text (but less convenient).
* Throttle button updates. `ui.throttle: 100` will ensure that at most 10 updates per second ale allowed for a single button.
* For very large gcode files, the benefit of displaying accurate gcode dimensions or rendering the gcode may not be worth
  the cost of parsing the gcode. You can limit the number of gcode lines which will be processed with the `ui.gcodeLimit`
  setting.

Additionally, the Stream Deck can be connected to a different machine than the one running cncjs, at the cost of some
additional network latency.
