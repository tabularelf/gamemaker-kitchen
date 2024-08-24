---
title: Custom Tabs
link: https://github.com/Sidorakh/custom-tabs
description: Utilise Custom Tabs for Android in your GameMaker games!
threadLink: https://discord.com/channels/724320164371497020/1276785054206398464
docs: ""
paid: false
date: 2024-08-24 06:07:58
tags:
  - android
authors:
  - Sidorakh
---
Utilise Custom Tabs for Android in your GameMaker games! 

## Installation
1. If you have an older version of Custom Tabs installed in GM, delete the Custom Tabs folder in the IDE
2. Download the latest YYMPS file from [Releases](<https://github.com/Sidorakh/custom-tabs/releases>)
3. Drag it into the IDE
4. Import at least `ext_custom_tabs` and `scr_custom_tabs`

## Basic Usage

To open a website showing a wonderful list of open source tools in your mobile game
```js
custom_tab_open("https://gamemakerkitchen.com");
```

## Advanced usage
To show the page URL rather than the title, enable the share button, and hide the URL bar on scroll

```js
var opt = custom_tab_options().show_title(false).share_enabled(true).url_bar_hiding_enabled(true);
custom_tab_open("https://gamemaker.io",opt);
```


https://github.com/Sidorakh/custom-tabs