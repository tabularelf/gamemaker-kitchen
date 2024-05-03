---
title: Inspectron
description: A fluent API for easily creating GameMaker debug views
link: https://github.com/shdwcat/Inspectron
date: 2024-03-11 02:53:00
tags:
  - debug
  - ui
authors:
  - shdwcat
---
Inspectron is a library designed to help you easily create debug views for objects in your game, and lets you easily customize what values get displayed using a simple [fluent API][fluent_api]. Inspectron calculates the best place to put the debug view, ensuring that it's sized appropriately and remains entirely on screen, and automatically closes the view if the target object is destroyed.

Here's an example of Inspectron working out-of-the-box in the Windy Woods template project:
![image](https://github.com/shdwcat/Inspectron/assets/15136382/cac60a04-29e6-4ff7-a7a3-bca99a0ebf98)

Inspectron can automatically generate a debug view for built-in variables on an instance, as you can see above, but it also allows you to easily customize what values get displayed for objects you create.