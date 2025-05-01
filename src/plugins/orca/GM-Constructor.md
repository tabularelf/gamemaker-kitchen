---
title: GMEdit-Constructor
description: Igor-based compilation straight from GMEdit!
link: https://github.com/thennothinghappened/GMEdit-Constructor
date: 2025-05-1 13:00:00
tags:
  - GMEdit
  - Tool
authors:
  - orca
---
As the title suggests, Constructor is a plugin for YellowAfterlife's [GMEdit](<https://github.com/YellowAfterlife/GMEdit>), which allows you to compile from the editor just as you can in the GameMaker IDE.

For modern GM versions, Constructor offers a more stable build experience than [builder](<https://github.com/YAL-GMEdit/builder>), which is an older plugin that directly invokes the asset compiler rather than using the CLI toolchain.

Constructor can currently compile for the current build target (your OS), and can switch between build configs.

## Features
 - **Run compile, run and clean jobs** (technically can be in parallel!)
   - Stop jobs by closing their tab
   - YYC Support
 - **View compile output** (duh)
 - **Compile and runner error parsing** (view them nice and neat rather than scrolling the log!)
 - **Runtime selection & project-specific properties**
   - Project build configuration select (`#macro SOMETHING:Config ...` support)
 - **Control Panel** (*see screenshot below*)
   - Centralised error display for build and configuration problems
 - Automatic check for updates

## Installation
See the [**GitHub README**](https://github.com/thennothinghappened/GMEdit-Constructor?tab=readme-ov-file#gmedit-constructor) for information.

## Issues
If you have any issues with Constructor, feel free to either ask here, or make a post on the [GitHub Issues](<https://github.com/thennothinghappened/GMEdit-Constructor/issues>) page for the project. I'll try to get back to you when I can, but no guarantees.

## Feature requests
If there's anything else you'd like out of Constructor that isn't mentioned here, the same applies as above with issues - here or make a feature request by opening an issue on GitHub.

I hope Constructor is a useful tool - though please note that I can only test on the machines I have available to me, so there's gonna be edge cases.

Thanks, and have fun :)