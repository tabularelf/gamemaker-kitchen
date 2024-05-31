---
title: GML-Animated Flag
description: Vertex-based real-time rendering of any sprite resource as a waving flag in the wind
link: https://github.com/Grisgram/gml-animated-flag
date: 2024-05-31 21:36:00
logo: https://www.coldrock.games/assets/raptor/gml-animated-flag-logo.png
tags:
  - animation
  - vertex
  - sprites
authors:
  - Grisgram
---

A simple, vertex based animation, that offers many settings to customize:

![settings](https://raw.githubusercontent.com/Grisgram/gml-animated-flag/main/_assets_/variable-settings.jpg)

| Variable | Description |
|-|-|
| `animation_fps`	| how many frames shall be calculated?|
| `intensity`		| how many waves are on the flag|
| `wave_speed`		| how fast do the waves move|
| `wave_height`		| how strong are the waves|
| `vertex_count`	| if -1, then default of 10% of sprite width|
| `render_width`	| if -1, then image_xscale as set in room editor|
| `render_height`	| if -1, then image_yscale as set in room editor|

Here's a screenshot of the demo room in the repository

![demo-screen](https://raw.githubusercontent.com/Grisgram/gml-animated-flag/main/_assets_/demo-screenshot.jpg)