---
title: GM-Blursed-ECS
description: About A primitive entity-component system for GameMaker.
link: https://github.com/JonathanHackerCG/Blursed-ECS
date: 2024-06-14 22:59:00
tags:
  - entity-component
authors:
  - cloaked-games
---

Blursed-ECS is a rudimentary entity-component system framework for GameMaker. This is an architectural pattern where game objects are represented as entities with attached components.

ECS is designed as an alternative (or supplement) to Object-Oriented style inheritance. Instead of deriving behavior from parents, Entities gain behavior from their attached Components. An Entity can contain any number of any Components, or none at all. This approach can be more flexible than inheritance, and resolves issues where some objects need behavior from multiple parents.