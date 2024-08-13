---
title: Sequence Duplicate
description: Use sequences as graphics templates!
link: https://github.com/KeeVeeGames/DuplicateSequence.gml
date: 2024-05-31 22:38:00
tags:
  - sequences
  - deep-copy
  - duplication
authors:
  - KeeVeeGames
---

In GameMaker currently, there is no built-in way to modify sequences in runtime without modifying the main sequence resource.

One of the use cases of modifying sequences in runtime is, for example, creating a layout for UI button / resource art / character animation with placeholder images and text in the IDE, and then change it with the final ones for each instance before sending them on screen.

This function is aimed to fix this issue, so you can create a deep copy of your sequence resource, modify its properties and spawn a new sequence instance without breaking the original one.