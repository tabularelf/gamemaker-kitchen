---
title: JITSpeak
link: https://github.com/BenjaminUrquhart/JITSpeak
description: A Catspeak to Gamemaker VM bytecode Just-In-Time compiler.
threadLink: https://discord.com/channels/724320164371497020/1448600631584751647
docs: ""
paid: false
date: 2025-12-11 09:01:44
tags:
  - interpreter
  - parser
  - compiler
  - jit
authors:
  - BenjaminUrquhart
---
This project aims to improve Catspeak's performance by compiling scripts directly to Gamemaker's VM bytecode. 

*It is currently a work in progress, but is technically usable which is why I'm making this post. Right now, it is a **Windows VM only** library*

https://github.com/BenjaminUrquhart/JITSpeak

Requires 2024.14 or later. Not compatible with 2022 LTS.

# Usage

JITSpeak is intended to be a drop-in replacement for the existing Catspeak compiler. As such, all you need to do is configure your Catspeak environment to use JITSpeak's compiler like so:
```gml
var env = new CatspeakEnvironment()
env.codegenType = JITSpeakCompilerWrapper

// compile and run Catspeak scripts like normal
```

Please see the readme for more details and config info.

# Feature progress

**Unimplemented:**
- `match` expressions
- `catch` expressions
- infinite loop/recursion timeouts

**Partially supported:**
- `with` loops (these require more accurate stack management than I have implemented atm so complex logic inside them may cause a silent crash)
- `catspeak_get_index` (requires the `allowCatspeakIndexing` config option, currently breaks the self/global getters and setters)

**Work in Progress:**
- Windows YYC support

-# Yes I've spent too much time studying this engine.