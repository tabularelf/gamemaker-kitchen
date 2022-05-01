---
title: ds_to_struct_array
description: Converts data structures (ds_map, ds_list, ds_grid) to structs/arrays!
link: https://gist.github.com/tabularelf/547b62efbcb0beaa8e6478afae8e693f
version: 1.0.0
date: 2022-05-01 16:28:54
tags:
  - data structure
  - ds
  - struct
  - array
  - conversion
authors:
  - TabularElf
---

This is a set of scripts that allow you to convert ds_maps, ds_lists and ds_grids into structs/arrays and vice versa.
Addtionally, ds_maps and ds_lists will automatically convert ds_map/ds_list children into structs/arrays, and vice versa.
You can disable this by assigning the optional argument `[convert_children]` to false when calling the function.

**Note**: This does not convert any data structures that are stored within or as `ds_grids` and vice versa.
Also to access a cell from an `array2D` of a `ds_grid`, you will do the following.
`grid[cell_x][cell_y]`

:)