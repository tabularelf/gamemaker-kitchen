---
title: Shady
link: https://github.com/KeeVeeGames/Shady.gml
description: GLSL preprocessor for code reuse! Import and inline directives,
  generating shader variants
threadLink: https://discord.com/channels/724320164371497020/1293640428184408076
docs: ""
paid: false
date: 2024-10-09 20:37:59
tags:
  - shader
  - preprocessor
  - import
  - shader-variants
authors:
  - keeveegames
---

```glsles
#pragma shady: import(shader_name)
#pragma shady: import(shader_name.identifier_name)

#pragma shady: macro_begin MACRO_NAME
#pragma shady: macro_end
#pragma shady: inline(shader_name.MACRO_NAME)

#pragma shady: variant(shader_name, [KEYWORD_NAME1], [KEYWORD_NAME2], ...)
```
The tool is integrated into the compilation process via compiler scripts so you can write reusable shaders inside standard GameMaker shader files with built-in or any other code editor.
