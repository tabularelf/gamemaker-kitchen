---
title: Lens
description: Camera Constructor adaption for doing what GameMaker should've had been doing along time ago...
link: https://github.com/tabularelf/Lens
date: 2024-05-14 23:25:00
tags:
  - camera
  - wrapper
  - lts
authors:
  - TabularElf
---
Camera Constructor wrapper for GameMaker Studio 2.3.2+.

This is just a drop in for most of the `camera_*` functions presented in GameMaker Studio 2 as methods via a constructor, as `.PascalCase()`.
<br>It also outright removes having to supply a cameraID for every method. Leaving it down to just providing the arguments.
<br>Most of the methods are chainable as well.

## Use case:
```gml
// Creates a new Lens instance. Each instance carries its own cameraID.
cam = new Lens();
cam.SetViewCam(0).SetViewPos(32,32).SetViewSize(1280,720).Apply();
```
  
# Methods

While most of it is pretty much plug in play (without having to supply CameraID), there's a few extra methods included.

## `.GetViewSpeed()`

Returns: an array that contains the results from `.GetViewSpeedX()` and `.GetViewSpeedY()`

## `.GetCameraID()`

Returns: CameraID

## `.SetViewCamera(view_camera)`

Basically the same as `view_camera[view_num] = camID`. but internally tracks the cameraID for when `.free()` is called.

## `.Free()`