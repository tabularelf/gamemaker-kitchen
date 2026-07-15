---
title: Garbage Collection suite for built-in or custom data structures
link: https://gist.github.com/WuffMakesGames/967112e3e8fb7d5f098092bca6f79823
description: Collection of garbage collection functions for GameMaker
threadLink: https://discord.com/channels/724320164371497020/1526970886689915070
docs: ""
paid: false
date: 2026-07-15 15:17:09
tags:
  - garbage collector
authors:
  - WuffMakesGames
---
```java
var _temp = {}
_temp.surf = surface_create(128,128)

// Custom garbage collecting interface
gc_add_ref(_temp, _temp.surf, function(_surface) {
    if (!surface_exists(_surface)) return false
    surface_free(_surface)
    return true
})

// Garbage collection for built-in types
gc_add_buffer(_temp,     buffer_create(10, buffer_grow, 1))
gc_add_grid(_temp,       ds_grid_create(10, 10))
gc_add_list(_temp,       ds_list_create())
gc_add_map(_temp,        ds_map_create())
gc_add_priority(_temp,   ds_priority_create())
gc_add_queue(_temp,      ds_queue_create())
gc_add_stack(_temp,      ds_stack_create())

// Throws an error and aborts the program (ds_exists cannot be used to check type)
gc_add_stack(_temp,      ds_grid_create(10, 10))
```
https://gist.github.com/WuffMakesGames/967112e3e8fb7d5f098092bca6f79823