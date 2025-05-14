---
title: GMEdit-Constructor
description: Igor-based compilation straight from GMEdit!
link: https://github.com/thennothinghappened/GMEdit-Constructor
date: 2025-05-1 13:00:00
threadLink: https://discord.com/channels/724320164371497020/1208360272570490930
tags:
  - GMEdit
  - Tool
authors:
  - orca
---
As the title suggests, Constructor is a plugin for YellowAfterlife's [GMEdit](<https://github.com/YellowAfterlife/GMEdit>), which allows you to compile from the editor just as you can in the GameMaker IDE.

For modern GM versions, Constructor offers a more stable build experience than [builder](<https://github.com/YAL-GMEdit/builder>), which is an older plugin that directly invokes the asset compiler rather than using the CLI toolchain.

Constructor supports Windows, MacOS and Linux, both web platforms, and can build to external devices, including Android.

## Features
- **Easily run, package releases, or clean projects from GMEdit!**
  - **Execute multiple builds side-by-side** in managed separate directories (disable reusing tabs for this.)
  - **Build and Runtime error parsing** (view them nice and neat rather than scrolling the log!)
  - **Close a build tab to stop it** (or use the hotkey.)
- **Switch between VM or YYC**. (Building for other systems is planned, eventually.)
- **Switch build configurations** (`#macro Config:SOMETHING ...`) via the Control Panel, or by right-clicking a config in the project sidebar.
- **Support for Beta, Monthly, and LTS runtimes**, with a per-project switch, and warnings for project-incompatible selections.
- **Support for HTML5 and GX.Games targets**. Note that the "Package" option for both of these is currently not working YYG have not documented its usage for these targets, and the IDE uses a proprietary extra-undocumented method.
- **Automatic update-checking**. (This calls the GitHub API to check the latest release and can be toggled off.)
- **Readable, central error messages** - the Control Panel shows any configuration issues, or internal errors. All errors display context, and most try to provide tips to resolve the issue where possible.
- **Android support and remote build targets** - you can compile for an Android device, or an external Linux or MacOS device by configuring the devices in the IDE and selecting them in Constructor.

## Installation
See the [**GitHub README**](https://github.com/thennothinghappened/GMEdit-Constructor?tab=readme-ov-file#installation) for information.


## Issues
If you have any issues with Constructor, feel free to either ask on Discord (below), or make a post on the [GitHub Issues](<https://github.com/thennothinghappened/GMEdit-Constructor/issues>) page. I'll try to get back to you when I can, but no guarantees.

## Feature requests
If there's anything else you'd like out of Constructor that isn't mentioned here, the same applies as above with issues - make a feature request by opening an issue on GitHub!

I hope Constructor is a useful tool - though please note that I can only test on the machines I have available to me, so there's gonna be edge cases.

Finally, I also have a thread for this project on the [GameMaker Kitchen Discord server](https://discord.com/channels/724320164371497020/1208360272570490930), for quick feedback!

Thanks, and have fun :)
