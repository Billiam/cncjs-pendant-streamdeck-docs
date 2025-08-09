---
title: Editor
date: 2024-10-12T16:33:08+05:00
draft: false
weight: 20
summary: Editor usage information
---

After [installation]({{< ref "Installation" >}}), you can access the configuration editor by visiting the normal pendant
URL, mounted by cncjs, and adding `/editor.html` to the URL.

Example: `http://my-raspberry-pi.local:8000/grid/editor.html`

## Settings

{{< figure src="images/settings-button.png" alt="Settings button gear in the upper right corner" >}}

If you have not already, it's best to configure your cncjs connection first, since this allows
the editor to show the state of cncjs during use.

### Connection settings

{{< figure src="images/connection-settings.png" alt="Connection settings form dialog. Includes fields for the socket address, port and a toggle for connecting using secure web sockets, and serial port and baud rate settings" >}}

The socket address and port should point to your cncjs server.

The serial port and baud rate refer to the connection from cncjs to your CNC controller.

### CNC settings

{{< figure src="images/cnc-settings.png" alt="CNC settings dialog with selections for available axes (x, y, z, a, b and c), and percentage fields to control smooth jogging speed" >}}

In the CNC settings section, you can enable or disable the axes your CNC supports,
change the relative smoothjog speeds for specific axes.

### UI settings

{{< figure src="images/ui-settings.png" alt="UI setting dialog with fields for the number of rows and columns to display, font size and line height, color palette selection, and color options for button background, page, text, and progress indicator" >}}

In the UI settings, you can change the color palette (which lets you maintain consistent colors in your buttons that can
all be updated together), and other general colors, as well as the font and dimension settings.

If you'd like to use different settings for the web-based pendant and a physical stream deck, most of these settings can
be overridden just for the stream deck from the Stream Deck tab. These settings include a checkbox to enable or disable
overriding the default settings from the UI tab.

## Layout editor

{{< figure src="images/scenes.png" title="The home scene" alt="3 by 5 grid of buttons with edit icons, with a tab list of scene names at the top" >}}

The scene list is the list of tabs at the top of the layout view. A scene is a named page containing buttons.

Each space in the scene can contain one _or more_ buttons. The button's visibility settings will control which of these
buttons is visible at any given time, allowing buttons to appear to change based on current state or user input (for
example, hiding or showing a button when GRBL is in an error state).

Most scenes can be renamed or deleted by right clicking on them in the scene list. New scenes can be added by clicking
the `Add scene` button and providing a name for the new scene.

The `Use stream deck display` toggle will emulate a streamdeck for the purposes of button conditions (see button editor
section below)

{{< figure src="images/edit-button-icon.png" title="Editing a button" >}}

You can select a location to edit by clicking the edit icon in the corner of each space. The number next to the icon
indicates how many buttons are being used at that location.

{{< figure src="images/edit-button-list.png" title="The button list" >}}

After clicking the edit button, the button list will be updated to show all of the currently configured buttons for that
location. The order of these buttons does not matter, as only one can be displayed at a time.

A button has a unique name and can be displayed in multiple spaces or scenes. It has an appearance based on the selected
icon, custom text, text alignment and color. It can be configured to be hidden, or disabled based on state, and can have
behavior when the button is pressed down, released, or pressed and held (or a combination of these).

You can add a new button at this location by selecting an existing button by name from the dropdown below the button
list, or typing a new name to create a brand new button.

## Button editor

### Appearance settings

{{< figure src="images/button-appearance.png" alt="Button appearance settings" >}}

You can click the current icon in this view to open the icon selector, which will display all of the available icons.
You can add your own custom icons to the `cncjs-pendant-streamdeck/icons/custom` folder, however these will not be
displayed in the icon list, and must be entered in the icon field manually (ex: `custom/my-custom-icon.png`)

The button background color can either use a color from your configured palette (in the main settings dialog), a custom
color, or no color.

The description field is used to display text when hovering over the button (using the html `title` attribute). It has
no effect on a physical stream deck.

### Dimensions

{{< figure src="images/dimensions.png" alt="Button dimensions dialog with integer fields for rows and columns, and a grid to show the resulting button span" >}}

A button can span multiple rows and columns, which can be helpful for making large, prominent buttons, or for visual
grouping. In the web view, the button will be displayed as a single large button, with its icon centered. On a stream
deck, this large button will cover multiple physical buttons, but will still have its icon centered between them.

### Text settings

{{< figure src="images/text.png" alt="Text setting containing a large text block for button contents with a 'variables' dropdown below, a text alignment grid to select the text position within the button, and a percentage field for overriding the text size" >}}

Optionally, a button can display text inside. This is usually used without an icon, or with images with a small and a
lot of empty space, to leave room for the text itself.

Text can be aligned in the center of the buttons, or offset/aligned to the outside edges. The `Text size` option allows
an individual button to display its text larger or smaller as needed. For the global text size and font, see the main
settings dialog.

The text itself can be static text of your choosing, or can include variable values wrapped in curly braces (ex:
`{{ cnc.connected }}`). For a more detailed look at these variables, see: [Variables]({{< ref "variables" >}}).

### Display conditions

{{< figure src="images/conditions.png" alt="Fields for 'If' and 'Disabled' button settings. The 'If' field contains 'ui.userFlags.showAbsolutePosition === true'" >}}

The `If` field controls a button's visibility, so that it can be hidden when it's not relevant, allowing
buttons in the same space to appear instead.

This is typically done by comparing a variable to a known value, using a limited set of javascript. If the value of the
field returns true (or [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)), the button will be hidden.

The default "Disconnected" button uses an if condition of: `!cnc.connected`, and will appear whenever communication
cannot be established between the pendant and cncjs.

The "Alarm" button uses `cnc.alarm` and will appear whenever the cncjs is in an alarm state.

The `Disabled` settings work the same way, but instead of hiding the button when its condition is true:

- The button's background color will not be shown
- The button will be slightly transparent
- Clicking the button will not do anything

This is useful for buttons that are not always relevant, but should not disappear.

### Actions

{{< figure src="images/actions.png" alt="Button action form, containing a dropdown for 'Action name', a dropdown for the type of mouse event that will cause the action to trigger, and option relevant to the specific action selected" >}}

To make a button _do_ something, you can add one or more action behaviors. An action can be triggered based on mouse
events (like on press, on release, or on hold). A button can have different actions when held vs when pressed.

In the default configuration, most navigation actions are triggered on mouse release ("up"), while more potentially
dangerous actions (like running a macro) are triggered by the "hold" event.

For a detailed list of actions and their available options, see [Actions]({{< ref "actions" >}}).

## Saving

When you're done editing, you can download your new configuration using the save icon in the upper right corner. After
downloading, replace your current `cncjs-pendant-streamdeck` config.json with this new one. If using the stream deck service,
you'll need to restart it for your changes to take effect.
