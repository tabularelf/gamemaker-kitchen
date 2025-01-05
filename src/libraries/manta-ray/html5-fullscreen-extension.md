---
title: HTML5 Fullscreen Extension
description: A simple extension for HTML5 that enables full screen toggling/setting for Gamemaker games.
link: https://manta-ray.itch.io/html5-full-screen-extension
date: 2025-01-04 00:00:00
tags:
  - html5
  - fullscreen
authors:
  - manta-ray
---

NOTE: With the release of Gamemaker 2024.11, this extension will no longer be supported or updated, as Gamemaker is migrating to WASM and you can already build for HTML5 using the GX.Games exporter, and this includes native support for Fullscreen.

As you probably know, window_set_fullscreen() does not work on HTML5. So  after searching online, I basically copy/pasted a small Javascript code for a GMS1 extension found [in this forum post](https://forum.yoyogames.com/index.php?threads/html5-button-to-switch-to-fullscreen.18436/#post-446787) (full credit to the original author),  in order to create a button that is added on top of the game canvas (I chose the bottom right corner but you can change that on the provided script), that lets you toggle full screen on or off.  Check out the demo "game" above.