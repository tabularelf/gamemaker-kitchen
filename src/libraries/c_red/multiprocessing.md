---
title: MultiProcessing
description: An implemention of multiprocessing with a focus on simplicity
link: https://github.com/tinkerer-red/MultiProcessing
date: 2024-06-14 19:30:00
tags:
  - multiple
  - processes
  - multithreading
  - threading
authors:
  - c-red
---

# Multiprocessing!
An implementation of multiprocessing with a focus on simplicity.

# Want multithreading?
Well this isnt that.

This is not multithreading, but instead it launches an additional process of the same game quietly and executes the function with the supplied arguments on a subprocess.

The subprocess will not have access to any variables or data structures as the main process so be sure to send that information as an argument.