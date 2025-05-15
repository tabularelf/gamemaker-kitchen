---
title: JS Promise in GM
link: https://github.com/tinkerer-red/GML-Promise
description: JS style promises added to GML, as well as an abundant number of async functions which can now return a promise.
threadLink: https://discord.com/channels/724320164371497020/1188696458732511283
docs: ""
paid: false
date: 2023-12-25 04:15:20
tags:
  - Promise
  - Async
  - Request
  - Thread
  - Threading
  - Processing
  - Coroutines
authors:
  - Tinkerer_Red
---
## [Promise GML](https://github.com/tinkerer-red/GML-Promise)
[[Old Version](https://gist.github.com/tinkerer-red/49bb859723afdd5c3c89fe836009f7cc)]

This is a 1:1 port of Javascript's `promise` object class. Apart from the requirement to use camel case for words like; `then`, `all`, `catch`, etc, The syntax works exactly the same as it would in Javascript.

Tests are included to fiddle around with.

Wanted to make something over the holiday break, and figured this would be a nice addition to many libraries. So on it's own it doesn't actually do much apart from a very basic coroutine system. But it's intended for use with libraries which handle either expensive computations, or async events. So this one is more for library creators then general use.

Would also recommend:
[Promise.gml](https://github.com/YAL-GameMaker/Promise.gml) - YellowAfterLife
[SimThreads](https://github.com/tabularelf/SimThreads) - Tabularelf
[Coroutines](https://github.com/jujuadams/coroutines) - Juju Adams