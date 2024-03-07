---
title: NiceSlice
description: An extended nine-slice library
link: https://github.com/WangleLine/NiceSlice
logo: https://i.imgur.com/DKphaUv.png
date: 2024-03-08 02:00:00
tags:
  - sprites
  - rendering
  - drawing
  - nine-slice
  - LTS
authors:
  - WangleLine
---

In version 2.3.2, Gamemaker introduced a feature called *nine-slice*,
which allows the user to easily create visual elements that scale to various sizes without distortion.

This is done by scaling, tiling, or otherwise transforming only the connecting pieces of a sprite element, but keeping corners unchanged.

 ![alt text](https://i.imgur.com/DKphaUv.png)
 
However, Gamemaker's native nine-slice feature does not allow the user to change the internal scale of a nine-sliced sprite,
which is bad news for anyone trying to, say, render scaled-up pixelart UI elements.
 
This library fixes that.