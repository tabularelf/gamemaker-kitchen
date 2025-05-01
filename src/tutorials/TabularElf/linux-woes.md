---
title: Linux Woes, and how to remedy them
description: A guide online to help resolve and work around the various Linux issues with GameMaker
date: 2025-05-01 13:11:00
draft: false
tags:
  - Linux
  - IDE
  - Runtime
authors:
  - TabularElf
---

The helpdesk post here on [setting up Ubuntu](https://help.gamemaker.io/hc/en-us/articles/235186168-Setting-Up-For-Ubuntu), while is mainly for Ubuntu, does technically apply to all distros.
However, there may be times where you run into issues that seem strange or peculiar, that no other platform suffers. This guide is to give you a brief jolt down on every possible scenario, as well as common things you can do.

Finding your GameMaker profiles (and um.json)
**`/home/.config/GameMakerStudio2-Beta/`**

If installed via .deb package, where GameMaker IDE *should* be installed.
**`/opt/GameMakerStudio2-Beta/`**

Finding your GameMaker Runtimes folder (And ui.log)
**`/home/.local/share/GameMakerStudio2-Beta/`**

Finding your compiled Linux builds ran from the IDE (remote or local):
**`/home/GameMakerStudio2/`**

`/home/.local/share/GameMakerStudio2-Beta/dpi_override.json`
Create and add `[{"Key":"is_enabled","Value":true},{"Key":"value","Value":92}]` via your preferred text editor.
Start up GameMaker.

## Installing GameMaker on Linux in other ways (unofficial):

## Arch Linux
If you are using Arch Linux, you may be able to download directly from the AUR.
[https://aur.archlinux.org/packages/gamemaker-beta-bin](https://aur.archlinux.org/packages/gamemaker-beta-bin).

## Manual extraction + Installation
In a lot of cases, you may have the `.deb` package unable to install, or need to manually install it yourself. You can remedy that by extracting it manually.
Extracting .deb archives manually can be done via this command.

```bash
ar -x ~/Downloads/GameMaker-Beta-####.####.#.###.deb
```

Where **#** is the version number of the .deb package you wish to extract. This will allow you to extract the underlying .deb package itself.

In regards to dependencies, you still need *all* dependencies as listed in the **setting up Ubuntu** helpdesk guide. But, if you are as luck as I am, you may be able to get away with installing some.
For non-ARM, ffmpeg/appimage/linuxdeploy/steam-runtimes may be all you need at minimal installed. As GameMaker on testing will build out .appimages by default, and you can still export with .appimage.
On ARM-based distros, or if you are wanting to export zip builds over app image, all of the other dependencies are required. 

### Note: linuxdeploy/appimage/steam-runtimes is not needed on ARM-based distros at the time of writing.