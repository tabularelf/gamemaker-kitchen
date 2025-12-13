---
title: RenderStack
link: https://github.com/FoxyOfJungle/RenderStack
description: Manage game rendering in customizable ordered virtual layers
threadLink: https://discord.com/channels/724320164371497020/1385749393021468702
docs: ""
paid: false
date: 2025-06-20 22:33:21
tags:
  - rendering
  - virtual layers
authors:
  - FoxyOfJungle
---
Github: https://github.com/FoxyOfJungle/RenderStack/tree/main

This library is useful for **organizing** the game's **rendering** into a defined and **customizable order**, in real time.

Useful if you are using a lighting system, post-processing, pause, and transitions together, as each needs to receive input from the other to function properly.

RenderStack was created with my libraries in mind ([PPFX](https://foxyofjungle.itch.io/post-processing-fx), [Crystal](https://foxyofjungle.itch.io/crystal-2d-lighting-engine), Transitions), but it can be used for other things (like your own things - following the RenderStack logic).