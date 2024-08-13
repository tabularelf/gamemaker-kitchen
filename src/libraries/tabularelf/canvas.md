---
title: Canvas
description: A surface that you can modify & keep the contents, even when the surface should've had been lost, for GameMaker Studio 2.3+!
link: https://github.com/tabularelf/Canvas
date: 2024-03-08 01:05:00
tags:
  - surface
  - buffer
  - lts
authors:
  - TabularElf
---

A surface that you can modify & keep the contents, even when the surface should've had been lost, for GameMaker Studio 2.3+!

Join my Discord for any questions! https://discord.gg/ThW5exp6r4

Example on usage:
```gml
// Create Event
surf = new Canvas(512, 512);
surf.Start();
var width = surf.GetWidth();
var height = surf.GetHeight();
draw_rectangle_colour(32, 32, width, height, c_red, c_green, c_blue, c_yellow, false);
surf.Finish();

// Draw Event
draw_surface(surf.GetSurfaceID(), 0, 0);
```

```json
{
  "a_string": "Hello World!",
  "a_num": 32
}
```