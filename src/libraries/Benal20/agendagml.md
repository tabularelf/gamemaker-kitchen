---
title: AgendaGML
description: Promise-like callback chaining for GameMaker
link: https://github.com/benal20/Agenda.gml
date: 2024-06-14 22:57:00
tags:
  - promise
authors:
  - Benal20
---

Agendas are Promise-like struct objects that allow you to easily schedule and chain together callbacks. Unlike Promises, Agendas forgo error catching in favor of a simpler design more suitable for offline-only singleplayer games.

An Agenda is essentially a fancy todo list — Todos get created within a Handler function and may be completed at any time. The Agenda is resolved once all created Todos are completed, or immediately if none were created, which will then execute the Handler function of the next Agenda in the chain if one exists.

The release comes with a small very simple demo project and all functionality is documented in the readme.

I built this for an autobattler I'm working on, and it's been so useful that I decided to clean it up and release it. This is the first time I've released something like this, so any questions or feedback is welcome.