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

Platformers are one of the first genres beginner game developers attempt to make. However, jumping (arguably the defining feature of platformers) is not the most straightforward feature to implement.

I'll go through 10 levels of platformer jumps from simple to complex in order to help you level up your platformers. This format will ease you into the technical side of the jump mechanic but it will also help you consider the design side. A more complex jump is not inherently a better jump. You may find any of these levels of complexity to be suitable for your game and I hope you'll be able to mix and match some of these concepts to create *your* perfect jump.

> This tutorial was developed on v2024.8 of GameMaker but the code will work on all recent versions. The concepts are also applicable to other progamming languages and game engines.

# Contents:

0. GameMaker setup
1. Stationary, fixed jump
2. Stationary, smooth jump
3. Simple physics
4. Coyote time and input buffering
5. Variable jump height
6. Bounce pads and jump types
7. Double jump
8. Wall climb
9. Wall jump
10. Visual juice

# 0. GameMaker setup

The first thing you'll want to do is create three sprites. You can do this by right-clicking the 'Sprites' folder inside of the 'Asset Browser' and selecting 'Sprite' from the 'Create' sub-menu. You can also press 'Alt-S' to make a sprite. The sprites should be called something like 'spr_player', 'spr_wall', and 'spr_bounce'. For demo purposes, just make each a 32x32 coloured square. I made my player blue, the wall black, and the bounce pad green.

Then you'll want to create four objects called 'obj_player', obj_collision', 'obj_wall', and 'obj_bounce'. Open the player object and click the 'No Sprite' dropdown button and select the corresponding player sprite. Do this for 'obj_wall' and 'obj_bounce' as well.

Open 'obj_collision' and don't give it a sprite but do click the 'Parent' button and drag 'obj_wall' and 'obj_bounce' from the 'Asset Browser' into the 'Children Area'. This means that we can check for collisions with 'obj_collision' and GameMaker will also check for collisions with 'obj_wall' and 'obj_bounce'.

Next, create a room. The details are arbitrary but I named it 'rm_test' and set the dimensions to 512x288. Now you can design a small test level. Something like the below image will allow us to test all of the features.

The final step is to add some code events to the player object which we'll be using often. Open the player object and click the 'Add Event' button, then select 'Create'. Do this again and select 'Step' from the 'Step' sub-menu. In the 'Create' event, we need to write this code:

```gml
/// @desc Variables

spd = 3; // Maximum horizontal speed
hsp = 0; // Current horizontal velocity
```

These variables will be used for every level of our jump.

Then in the 'Step' event, write this code:

```gml
/// @desc Movement
 
// Input

var _right = keyboard_check(vk_right);
var _left = keyboard_check(vk_left);
 
var _move = _right - _left;
hsp = lerp(hsp, _move * spd, 0.25);

// Collision

if place_meeting(x + hsp, y, obj_collision)
{
    while !place_meeting(x+sign(hsp),y, obj_collision)
    {
        x += sign(hsp);
    }
    hsp = 0;
}
x += hsp;
```

This is the base code I'm using for my horizontal movement and collisions. You can either copy this or, if you have another collision system you prefer, adapt the rest of this tutorial's code to work with that.

If you run the game at this point, you only have horizontal movement and collision and no jumping.

From now on, as I show you how to add and change the code in these events, in order to make it obvious what has changed, code that didn't change will get commented out but that doesn't mean you need to comment out the code.

# 1. Stationary, fixed jump

So, the first jump we'll add is very basic. When we press the jump button, the player cannot move horizontally and is simply teleported a bit into the air and then teleported back down after a short time. To me this is reminiscent of something like Game & Watch: Donkey Kong Jr. (see below video) although even a bit simpler.

<iframe width="560" height="315" src="https://www.youtube.com/embed/B9RAFvZnY14?si=53fxEFZr-DPjZ8Vr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

To code this jump, add the following variables to the 'Create' event:

```gml
jump_stationary = 0;         // How long has the player been jumping
jump_stationary_max = 60;    // How long until the player should fall
jump_stationary_height = 32; // Distance to be telported up
```

The basic concept is that after the jump key has been pressed and the player has been teleported into the air (by the distance defined by ```jump_stationary_height```), ```jump_stationary``` represents a timer which will tick down from 60 to 0 each frame and then teleport the player back down to the ground.

The code in the 'Step' event will look like this:

```gml
// Input

//var _right = keyboard_check(vk_right);
//var _left = keyboard_check(vk_left);
 
//var _move = _right - _left;
//hsp = lerp(hsp, _move * spd, 0.25);

// Jump

if jump_stationary == 0
{
	if keyboard_check_pressed(vk_up)
	and place_meeting(x, y + 1, obj_collision)
	and !place_meeting(x, y - jump_stationary_height, obj_collision)
	{
		y -= jump_stationary_height;
		jump_stationary = jump_stationary_max;
	}
}
else
{
	hsp = 0;
	
    jump_stationary--;

    if jump_stationary == 1
    {
        y += jump_stationary_height;
    }
}

// Collision

//if place_meeting(x + hsp, y, obj_collision)
//{
//    while !place_meeting(x+sign(hsp),y, obj_collision)
//    {
//        x += sign(hsp);
//    }
//    hsp = 0;
//}
//x += hsp;
```

When ```jump_stationary == 0```, that's our default, on-the-ground state. So when that is the case, we're checking for the up-arrow key to be pressed but we're also checking that we are actually on the ground and that there is no wall above us that we might collide with.

Then when ```jump_stationary``` is not equal to 0, we want to stop the horizontal movement. We also need to decrement the ```jump_stationary``` variable and, when it is equal to 1 (i.e. the last frame before we should be back on the ground), the player is teleported back down.

# 2. Stationary, smooth jump

The next level up is to not make that jump look so jarring. Instead of teleporting up, we'll slowly slide up and down. This still won't look natural but it has a certain charm. The code for this level is mostly the same as the previous level.

```gml
//Input

//var _right = keyboard_check(vk_right);
//var _left = keyboard_check(vk_left);
 
//var _move = _right - _left;
//hsp = lerp(hsp, _move * spd, 0.25);

// Jump

//if jump_stationary == 0
//{
//	if keyboard_check_pressed(vk_up)
//	and place_meeting(x, y + 2, obj_collision)
//	and !place_meeting(x, y - jump_stationary_height, obj_collision)
//	{
 		jump_stationary = jump_stationary_max;
//	}
//}
//else
//{
// hsp = 0;
	
	if jump_stationary > jump_stationary_max / 2
	{
		y -= 2;
	}
	else
	{
		y += 2;
	}
	
	jump_stationary--;
//}

// Collision

// if place_meeting(x + hsp, y, obj_collision)
//{
//    while !place_meeting(x+sign(hsp),y, obj_collision)
//    {
//        x += sign(hsp);
//    }
//    hsp = 0;
//}
//x += hsp;
```

You can see that the only difference is that when we jump we don't include the line which teleports us upwards. Then, while we are jumping, we check if the ```jump_stationary``` timer is greater than half of the maximum value of the timer. This represents the time when we are in the first half of the jump. If this is the case, we need to move upwards. I used the value of 2 as the speed to travel upwards but you can choose whatever you want. If the timer is less than or equal to half of its maximum value then we should reverse this upwards movement. Finally, decrement the timer.

# 3. Simple physics

Gravity is a force that is always acting on us (unless any astronauts are reading this tutorial) so it's natural to want to implement that in your game.

For this level, we need to add three variables:

```gml
vsp = 0;    // Current vertical velocity
jspd = 5;   // Jump strength
grav = 0.3; // Gravity
```

This system mostly builds off of the way horizontal movement and collision was shown to work earlier but a constant gravity force is applied downwards on the player and upwards force is only applied in a burst when the up-arrow key is pressed. The code looks like this:

```gml
// Input

//var _right = keyboard_check(vk_right);
//var _left = keyboard_check(vk_left);

//var _move = _right - _left;
//hsp = lerp(hsp, _move * spd, 0.25);

// Jump

vsp += grav;

if keyboard_check_pressed(vk_up) and place_meeting(x, y + 1, obj_collision)
{
    vsp = -jspd;
}

// Collision

//if place_meeting(x + hsp, y, obj_collision)
//{
//    while !place_meeting(x+sign(hsp),y, obj_collision)
//    {
//        x += sign(hsp);
//    }
//    hsp = 0;
//}
//x += hsp;

if place_meeting(x, y + vsp, obj_collision)
{
    while !place_meeting(x, y + sign(vsp), obj_collision)
    {
        y += sign(vsp);
    }
    vsp = 0;
}
y += vsp;
```

First, we add ```grav``` to ```vsp```. Then we check if the up-arrow key has been pressed and if we're on the ground. If so we set our vertical velocity to our jump strength.

Then at the end we need to add some code to handle vertical collisions. This looks similar to the horizontal collision code but obviously checking ```y``` instead of ```x``` and ```vsp``` instead of ```hsp```.

Design-wise this is the first big change we've made. Allowing the player to move horizontally and vertically at the same time gives the player a lot of freedom to traverse your levels. Now, this can obviously be great but it may also not be the vibe you're going for in certain cases.

<iframe frameborder="0" src="https://itch.io/embed-upload/11397537?color=333333" allowfullscreen="" width="1024" height="596"><a href="https://jordan-guillou.itch.io/10-levels-of-platforming-jumps">Play 10 Levels of Platforming Jumps on itch.io</a></iframe>