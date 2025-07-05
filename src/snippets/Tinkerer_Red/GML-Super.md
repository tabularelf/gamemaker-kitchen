---
title: GML-Super
link: https://github.com/tinkerer-red/GML-__Super__
description: An implementation of super() for GML to inherit from parent constructors.
threadLink: https://discord.com/channels/724320164371497020/1106581611090288640
docs: ""
paid: false
date: 2023-05-12 14:00:15
tags:
  - super
  - snippet
  - oop
authors:
  - Tinkerer_Red
---
# [GML-**Super**](https://github.com/tinkerer-red/GML-__Super__)

An implementation of `super()` for GML to call parent constructors.

This script allows you to call the parent constructor’s static function in a similar manner to how `event_inherited()` works in GameMaker. It automatically invokes the parent class constructor’s function when `super()` is used in the child class constructor.

### Example:

```gml
function A() constructor {
    static print_name = function() {
        show_debug_message("A")
    }
}

function B() : A() constructor {
    static print_name = function() {
        super()
        show_debug_message("B")
    }
}

function C() : B() constructor {
    static print_name = function() {
        super()
        show_debug_message("C")
    }
}

var t = new C()
t.print_name()
// prints: A then B then C
```

### How It Works:

* `super()` calls the parent constructor’s function, allowing for proper chaining of constructor calls in an inheritance chain.
* It mimics `event_inherited()`, enabling child classes to call the parent class constructor before executing their own logic.

### Note:

This implementation only works with **static functions**. The parent constructor’s function must be defined as a static method in the parent class for `super()` to function correctly.