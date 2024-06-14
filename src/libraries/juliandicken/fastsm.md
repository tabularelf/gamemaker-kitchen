---
title: FastSM 
description: Lightweight State Machines
link: https://github.com/JulianDicken/FastSM
date: 2024-06-14 21:53:00
tags:
  - state machine
  - lts
authors:
  - juliandicken
---

FastSM aims to be a more lightweight alternative to the fantastic SnowState library by [Sahaun](https://github.com/sohomsahaun/SnowState/). FastSM employs different design paradigms which make it more flexible in certain cases, while making it more restrictive in others. Hard limits FastSM has are :

- There can never be more than 64 State Tags per FSM
- There can never be more than 64 States per FSM if you are using the allow/forbid feature of state transitions.