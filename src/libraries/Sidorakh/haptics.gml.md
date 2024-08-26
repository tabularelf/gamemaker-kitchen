---
title: haptics.gml
link: https://github.com/Sidorakh/haptics.gml
description: A quick and dirty wrapper around HTML5 and Android vibration functions
threadLink: https://discord.com/channels/724320164371497020/1276789034571534366
docs: ""
paid: false
date: 2024-08-24 06:23:47
tags:
  - html5
  - android
authors:
  - Sidorakh
---
-# I can't be trusted to name things

A quick and dirty wrapper around HTML5 and Android vibration functions

## Installation:
1. If you have an older version of haptics.gml installed in GM, delete the haptics.gml folder in the IDE
2. Download the latest YYMPS file from [Releases](<https://github.com/Sidorakh/haptics.gml/releases>)
3. Drag it into the IDE
4. Import the extension `ext_haptics` and the script `haptics` from the `haptics.gml` folder

## Usage

This code will start a vibration pattern of `100ms` on, `50ms` off, `500ms` on, `30ms` off, and `20ms` on when a left click or tap is detected
```js
if (mouse_check_button_pressed(mb_left)) {
    haptics_vibrate([100,50,500,30,20]);
}
```

## Functions

`haptics_vibrate(pattern)`: will run the specified vibration pattern. A pattern is defined as it is for the web Vibrations api: <https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#vibration_patterns>
`haptics_stop`: will stop any running vibration patterns
`haptics_available`: will return if a vibrations API is available

https://github.com/Sidorakh/haptics.gml