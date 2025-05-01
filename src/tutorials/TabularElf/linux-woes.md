---
title: GameMaker Linux Woes, and how to remedy them
description: A guide online to help resolve and work around the various Linux issues with GameMaker
date: 2025-04-08
draft: true
tags:
  - Linux
authors:
  - TabularElf
---

The helpdesk post here on [setting up Ubuntu](https://help.gamemaker.io/hc/en-us/articles/235186168-Setting-Up-For-Ubuntu), while is mainly for Ubuntu, does technically apply to all distros.
Some steps *can* be ignored, like in the case of ffmpeg/appimage/linuxdeploy/steam-runtimes may be all you need.. As GameMaker by default builds out app images.
On ARM-based distros, or if you are wanting to export zip builds over app image, all of the other dependencies are required.

Finding your GameMaker profiles (and um.json)
/home/.config/GameMakerStudio2-Beta/

If installed via .deb package, where GameMaker IDE *should* be installed.
/opt/GameMakerStudio2-Beta/

Finding your GameMaker Runtimes folder (And ui.log)
/home/.local/share/GameMakerStudio2-Beta/

Finding your compiled Linux builds ran from the IDE (remote or local):
/home/GameMakerStudio2/

/home/.local/share/GameMakerStudio2-Beta/dpi_override.json
Create and add `[{"Key":"is_enabled","Value":true},{"Key":"value","Value":92}]`

Installing GameMaker on Linux in other ways (unofficial):

## Arch Linux
If you are using Arch Linux, you may be able to download directly from the AUR.
https://aur.archlinux.org/packages/gamemaker-beta-bin

## Manual extraction
// Extracting .deb archives manually
```bash
ar -x ~/Downloads/GameMaker-Beta-####.####.#.###.deb
```

Where **#** is the version number of the package you wish to extract. This will allow you to extract the underlying package itself.