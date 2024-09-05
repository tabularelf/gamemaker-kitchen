---
title: 10 Levels of Platformer Jumping
description: square go up -> fully featured platformer jumping
link: https://github.com/BobsStuff/CoolThing
date: 2022-04-29 18:35:07
tags:
  - Platformer
authors:
  - Jordan Guillou
donation_link:
  - https://ko-fi.com/jordanguillou
---

In order to make it obvious what changed, code that didn't change will get commented out but that doesn't mean you need to comment out the code.

<iframe frameborder="0" src="https://itch.io/embed-upload/11397537?color=333333" allowfullscreen="" width="1024" height="596"><a href="https://jordan-guillou.itch.io/10-levels-of-platforming-jumps">Play 10 Levels of Platforming Jumps on itch.io</a></iframe>

```gml
// Input

var _right = keyboard_check(vk_right);
var _left = keyboard_check(vk_left);
 
var _move = _right - _left;
hsp = lerp(hsp, _move * spd, 0.25);

// Collision

if place_meeting(x + hsp, y, obj_collision)
{
    while !place_meeting(x + sign(hsp), y, obj_collision)
    {
        x += sign(hsp);
    }
    hsp = 0;
}
x += hsp;
```