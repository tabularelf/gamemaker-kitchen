---
title: GML Outline Shader
description: Outline shader system
link: https://github.com/Grisgram/gml-outline-shader-drawer
date: 2024-06-14 22:20:00
tags:
  - outline
  - shader
authors:
  - grisgram
---

This shader is based on a Version of [@JujuAdams](https://github.com/JujuAdams/JujuAdams), credits to him for the basic implementation to draw a sprite outlined. He helped me in implementing varying outline strengths, and I took over from that point.

The shader now offers rich functionality and supports even drawing of rotating sprites, by using their bounding box to set up the surfaces needed to draw the correct outline and it also offers Alpha Fading and Pulse animations.