---
title: Progressify
link: https://github.com/Sidorakh/progressify
description: Allows your players to install your GameMaker HTML5 game as a
  progressive webapp
threadLink: https://discord.com/channels/724320164371497020/1276781912114860076
docs: https://github.com/Sidorakh/progressify
paid: false
date: 2024-08-24 05:55:29
tags:
  - html5
authors:
  - Sidorakh
---
Allows your players to install your GameMaker HTML5 game as a progressive webapp, by generating and automatically including a manifest JSON file and a service worker in the HTML output on HTML5 builds (both in testing and production)! 

## Dependencies
- Node.js v20 on system PATH (other versions may work)

## Notes
This is designed to work with the default `index.html` file included with the HTML5 runtime. It may work on custom files though, as long as the same [template/code injection tags](<https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Extension_Creation/HTML5_Extensions.htm#:~:text=of%20a%20file-,Template%20HTML%20File,-You%20can%20get>) are included in the same/similar places as in the default file. 


https://github.com/Sidorakh/progressify