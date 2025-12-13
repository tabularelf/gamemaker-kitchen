---
title: GMLC
description: GML VM and Compiler built inside of GML with the long term goal to be able to compile any project folder.
link: https://github.com/tinkerer-red/GMLC
date: 2025-12-14 05:07:00
docs: https://github.com/tinkerer-red/GMLC?tab=readme-ov-file#-gmlc-v100--initial-public-release
threadLink: https://discord.com/channels/724320164371497020/1445121374644469780
paid: false
tags:
  - multiple
  - processes
  - multithreading
  - threading
authors:
  - Tinkerer_Red
---

# Multiprocessing!
An implementation of multiprocessing with a focus on simplicity.

# Want multithreading?
Well this isnt that.

This is not multithreading, but instead it launches an additional process of the same game quietly and executes the function with the supplied arguments on a subprocess.

The subprocess will not have access to any variables or data structures as the main process so be sure to send that information as an argument.