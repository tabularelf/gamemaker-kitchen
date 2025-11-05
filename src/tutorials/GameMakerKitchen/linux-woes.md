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
  - GameMakerKitchen
---

The helpdesk post here on [setting up Ubuntu](https://help.gamemaker.io/hc/en-us/articles/235186168-Setting-Up-For-Ubuntu), while is mainly for Ubuntu, does technically apply to all distros.
However, there may be times where you run into issues that seem strange or peculiar, that no other platform suffers. This guide is to give you a brief jolt down on every possible scenario, as well as common things you can do.

# Filepaths you may need to know
Finding your GameMaker profiles (and um.json)
**`/home/.config/GameMakerStudio2-Beta/`**

If installed via .deb package, where GameMaker IDE *should* be installed.
**`/opt/GameMakerStudio2-Beta/`**

Finding your GameMaker Runtimes folder (And ui.log)
**`/home/.local/share/GameMakerStudio2-Beta/`**

Finding your compiled Linux builds ran from the IDE (remote or local):
**`/home/GameMakerStudio2/`**

# Installing GameMaker on Linux in other ways (unofficial):

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

Note: linuxdeploy/appimage/steam-runtimes is not needed on ARM-based distros at the time of writing.

Distrobox: TBA

# Bugs, tricks and tips:

## When I start up GameMaker, the IDE looks messed up!
This may be caused by a DPI-related issue on some distro platforms. To work around this, you may override it directly.
Create a file at `/home/.local/share/GameMakerStudio2-Beta/dpi_override.json`.
And add the following 
```json
[{"Key":"is_enabled","Value":true},{"Key":"percentage","Value":92}]
``` 
via your preferred text editor. 
After starting GameMaker back up, your DPI will be overriden.

**Note**: As of more recent versions (presumably 2024.8+), this may have changed slightly. You may instead need to have 
```json
[{"Key":"is_enabled","Value":true},{"Key":"percentage","Value":92}]
```

## I can't open the IDE on Fedora!
Fedora, not unlike other distros *but* unlike Ubuntu, has some packages named differently. That's ok! Most dependencies, once you find and install them, will work out-of-the-box.
Except for one: GameMaker's bundled `freetype` library, which relies on `bz2`. Because of the aforementioned package naming disparity, this also may include files themselves: as of the writing of this section, GameMaker looks specifically for `/usr/lib64/libbz2.so.1.0`, which is named/versioned differently on Fedora.

Although tedious, you may do either one of the following:
  - Create a symlink to `libbz2.so.####`, where # is the version present in your Fedora installation
  - Modify the `SharpFont.dll.config` in `/opt/GameMaker-Beta/x86_64` to use the system's installed `freetype` package

NOTE: **Be careful when modifying or moving around system files or program libraries and configurations, as doing so without caution may cause your program and/or system break!**

### Creating a symlink to `libbz2.so.####`:
If you're unfamiliar with what a symlink is, think of it like a Windows shortcut. It points towards a file.
Simply go to `/usr/lib64` and then run this command:
```bash
ln -sf /path/to/file /path/to/symlink
```

Think of it as if `ln` stands for **l**i**n**k, where `/path/to/file` is Fedora's `libbz2.so.1.0` and `/path/to/symlink` is where you want to place your symlink. Do note your symlink has to be `/usr/lib64/libbz2.so.1.0` in order for this to work!

### Modifying GameMaker's `SharpFont.dll.config`:
GameMaker's SharpFont/`freetype` library makes use of the aformentioned `libbz2.so.1.0` file, but you can easily edit the configuration file to make use of the system's `freetype` library package in case you don't like fiddling in system directories.

The configuration in question should be located in `/opt/GameMaker-Beta/x86_64` and can be opened in your text editor of choice (e.g. gedit, GNOME Text Editor, COSMIC Text Editor, Kate etc.) and by default should look like this:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-x86_64-ubuntu-Release/freetype.so"    os="linux"   cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="32" target="Vendor/freetype/freetype-armv7-ubuntu-Release/freetype.so"     os="linux"   cpu="arm,armv7,arm32"  />
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-aarch64-ubuntu-Release/freetype.so"   os="linux"   cpu="armv8,arm64"   	/>

<!--
	<dllmap dll="freetype.dll" wordsize="64" target="libfreetype.so.6"    os="linux"   cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="32" target="libfreetype.so.6"     os="linux"   cpu="arm,armv7,arm32"  />
	<dllmap dll="freetype.dll" wordsize="64" target="libfreetype.so.6"   os="linux"   cpu="armv8,arm64"   	/>
-->

	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-x86_64-windows-Release/freetype.dll"  os="windows" cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="64" target="lib/windows/arm64/freetype.dll" os="windows" cpu="arm64"      />
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-x86_64-macos-Release/freetype.dylib"  os="osx"     cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-aarch64-macos-Release/freetype.dylib" os="osx"  	 cpu="armv8,arm64"      />
</configuration>
```

NOTE: The last pair does not affect linux, so it can be ignored.

`<!--` and `-->` define comments in a XML file. Simply move the comment block from the second pair of `dllmap`s to the first. This will force GameMaker to use the system's installed `freetype` package. Your final configuration file should look like this:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
<!--
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-x86_64-ubuntu-Release/freetype.so"    os="linux"   cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="32" target="Vendor/freetype/freetype-armv7-ubuntu-Release/freetype.so"     os="linux"   cpu="arm,armv7,arm32"  />
	<dllmap dll="freetype.dll" wordsize="64" target="Vendor/freetype/freetype-aarch64-ubuntu-Release/freetype.so"   os="linux"   cpu="armv8,arm64"   	/>
-->

	<dllmap dll="freetype.dll" wordsize="64" target="libfreetype.so.6"    os="linux"   cpu="x86-64,x64,amd64" />
	<dllmap dll="freetype.dll" wordsize="32" target="libfreetype.so.6"     os="linux"   cpu="arm,armv7,arm32"  />
	<dllmap dll="freetype.dll" wordsize="64" target="libfreetype.so.6"   os="linux"   cpu="armv8,arm64"   	/>
  ...
```

## There's no fonts in the Save/Load dialog on Arch!
This is a rather recent issue, mainly with Pango, GTK's text renderer, and apparently the Adwaita Sans font. Since GameMaker links directly to GTK 3 rather than relying on Zenity or `xdg-desktop-portal`s, the offending font will cause Pango to stop rendering any text.
A relatively easy fix can be done by editing `$HOME/.config/gtk-3.0/gtk.css`, adding the following:
```css
* {
    font-family: "Noto Sans"; /* Replace with your desired font */
    font-size: 11pt; /* Adjust size as needed */
}
```

NOTE: This will change all default GTK fonts.
