---
title: FauSet
link: https://github.com/tinkerer-red/FauSet
description: Automatic Garbage Collected Data Structures in GML. Simply replace
  `ds_` with `fs_`.
threadLink: https://discord.com/channels/724320164371497020/1441363397621973032
docs: ""
paid: false
date: 2025-11-21 09:43:33
tags:
  - garbage collection
  - data structure
authors:
  - Tinkerer_Red
---
# [FauSet](https://github.com/tinkerer-red/FauSet)
# FauSet

**FauSet** is a lightweight **garbage collection wrapper** for GameMaker’s built-in data structures.
It helps prevent memory leaks from forgotten `ds_*` objects by automatically cleaning up references when they expire or lose ownership.

Supported data structures:

* `ds_list`
* `ds_stack`
* `ds_queue`
* `ds_map`
* `ds_grid`
* `ds_priority`

---

## ✨ Features

* **Automatic GC**: All created structures are tracked with weak references and TTL counters. When an object goes out of scope, FauSet finalizes and destroys it safely.
* **Drop-in API**: FauSet mirrors GameMaker’s `ds_*` functions (`fs_list_add`, `fs_stack_pop`, `fs_queue_enqueue`, etc.). Just swap `ds_` for `fs_`.
* **Safe destruction**: No more silent leaks - expired or unreferenced structures are cleaned up automatically.
* **Fast internals**: GC tracking uses an over-sized `ds_grid` with geometric growth/shrink, so insertions and removals are constant-time without frequent resizes.
* **Configurable**: Macros let you tune GC step rate, collection rate, and minimum grid size.

---

## ⚙️ Config Macros

```gml
// How frequently to update the "time to live" of objects
#macro FS_Step_Rate 1

// How many steps an object must survive before collection
#macro FS_Collection_Rate 3

// Minimum slack space in the GC grid before resizing
#macro FS_Grid_Min_Size 64
```

---

## 🚀 Usage

```gml
// Create a list (auto-managed)
var myList = fs_list_create();

// Add values
fs_list_add(myList, "hello", "world");

// Check size
var count = fs_list_size(myList);

// Clear when done (optional - FauSet will GC if lost)
fs_list_destroy(myList);
```

FauSet covers all common operations:

* **Lists**: `fs_list_create`, `fs_list_add`, `fs_list_delete`, `fs_list_sort`, …
* **Stacks**: `fs_stack_push`, `fs_stack_pop`, …
* **Queues**: `fs_queue_enqueue`, `fs_queue_dequeue`, …
* **Priorities**: `fs_priority_add`, `fs_priority_delete_min`, …
* **Utilities**: `fs_set_precision`, `fs_exists`

---

## 🧩 Notes

* Objects are wrapped with `FS_Destructor` internally. A weak reference stores both the value and its destructor.
* The GC uses a background `time_source` to decrement TTL and purge expired refs.
* Slack rows in the grid are filled with sentinel values (`infinity`, `undefined`) to avoid accidental decrements.
* Deprecated wrappers are included (`fs_list_size`, `fs_stack_empty`, etc.) for compatibility with GML docs, but marked clearly.
* Some functions like `fs_map_add_map` will still expect a `ds_map` unwrapped, these functions have functionality that would effect the Garbage Collector significantly.

---

## 🙏 Special Thanks

This library was shaped not just through code, but through **conversation, trial, and error** with friends in the GameMaker community.

Special thanks to:

* [**Juju Adams**](https://github.com/JujuAdams)
* [**TabularElf**](https://github.com/tabularelf)
* [**DragoniteSpam (Michael)**](https://github.com/DragoniteSpam)

for their insights, ideas, and willingness to bounce concepts back and forth - leading to the system you see here.
Thanks Gamers <3

---

## 📜 License

MIT - use freely in your projects.