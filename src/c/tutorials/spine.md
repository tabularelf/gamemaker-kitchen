---
title: Using Spine with GameMaker
description: A guide on how to use Spine sprites with GameMaker
link: N/A
date: 2022-04-29 18:35:07
tags:
  - Spine
authors:
  - Kormex
---


This is not a guide for Spine or Gamemaker individually, rather a guide on using the two of them together. I am working on the assumption that you already have some sprites animated in Spine and are ready to get them into GM. Starting with getting your Spine sprite imported, to quirks to be aware of, to some more advanced functionality, I'll be dumping everything I've learned into this guide.
Additionally, this guide was written for GM 2024.2. If you are using an older or newer version of GM, there may be some differences.

# Prepping your Spine project
There are a few important things to keep in mind when working on your Spine project to ensure things go smoothly in GM:

- GM only supports Spine 4.0. If you are on an older version, you will need to update to 4.0. If you are on a newer version, see the exporting section below.
- Each skeleton in Spine will be a separate sprite in GM. Keep everything in one skeleton if you want it to be one sprite, and split anything that should be a separate sprite into a different skeleton.
- If you want to play multiple animations at once, make sure the animations that should be played together don't both animate the same bone. You cannot mix the tracks of the two animations together, only one animation can affect a bone at a time.
- If you want to control a bone in code, don't include that bone in any animations. The animation will overwrite any code based edits you make to the bone. If you want to be able to animate something *and* alter it in code, create a new bone and make the animated bone a child of it. You can then animate the child in Spine, and control the parent in code.
- I suggest not animating the root bone at all. Things like image_angle, image_xscale, image_yscale, etc. work with the root bone, so animating the root bone may cause various problems. You can work around this using the same strategy as above. Make a new bone that is a child of the root bone, and then make all other bones a child of that bone instead of the root. You can then animate that bone instead of the root bone.
- You must have at least one image that is visible without a skin selected in order for GM to be able to import the sprite. If 100% of your images are attached to a skin, you can get around this limitation by adding an image that's always behind other things and thus not visible, or by adding a new image that's just a single pixel and/or 99% transparent.

# Exporting your sprite from Spine

First things first, GameMaker currently only supports Spine 4.0. If you already made animations using Spine 4.1 or 4.2, don't panic! You can still export a file in the 4.0 format using the "version" option in the export menu. You can also turn your 4.1/4.2 project into a 4.0 project by doing the following:
- Export to JSON or binary using the 4.0 version option in the export window
- Go to spine --> settings
- Where it says Spine version at the very top, change it from "latest stable" to "latest 4.0"
![](/img/spine_guide_images/using_4.0.png)
- Restart Spine
- Go to Spine --> import data, select your exported JSON or binary file, and hit import
![](/img/spine_guide_images/import_data.png)
Your attachments may not show up properly, but you can fix this by clicking on "images" in the tree and setting the file path to the proper folder again.
Keep in mind that anything that only exists in 4.1 or 4.2 will be lost in the export process, regardless of which option you use.

With that out of the way, on to exporting! Your export settings should look something like this:
![](/img/spine_guide_images/export_settings.png)
The important settings are "version" being set to 4.0, and the pack settings being "Pack Attachments" to "Atlas per skeleton". The output folder can be anywhere, pick whatever location you like. I like to make a separate folder for every sprite's JSON and atlas so I don't get them mixed up.

# Importing your sprite into GameMaker
In GameMaker, create a new sprite asset and hit the "Import" button near the top left of the sprite's window. Navigate to the folder you exported your JSON to. You should see two files, a JSON file and a PNG file. Select the JSON file, and hit open. If you instead select the PNG, you will get the raw atlas sprite and not a Spine sprite, so make sure you select the JSON file.
![](/img/spine_guide_images/select_JSON.png)

If you have multiple skeletons, then there will be multiple sets of JSON and PNG files. You can't import multiple skeletons to a single sprite in GM, so they will each need to be imported to a separate sprite asset. If you need all of the skeletons to be in the same sprite, then you will need to edit your Spine project to have everything in a single skeleton.

GM will say that importing sprites is not an undoable action and ask if you're sure. Press yes. Importing a spine sprite can sometimes cause a "Project directory modified" window to pop up. If that happens, hit "reload". That window popping up isn't a problem, it happens regularly when importing spine sprites. 
If everything worked, you should now see a preview of your Spine sprite in the sprite window. If you get an error, make sure your file has done everything in the "Prepping your Spine Project" section above. Additionally, if you get a warning saying "unable to find atlas file", then make sure your export settings are "Pack Attachments to Atlas per skeleton" and not "Pack Attachments to single Atlas"

If you are using any collision mesh attachments, then make sure you open up the sprite's collision mask settings and change the type from "Rectangle" to "Spine Collision Mesh".

![](/img/spine_guide_images/collision_mode.png)

Note: if you are using LTS or some other older version, the Spine Collision Mesh option won't exist and you will need to select "precise" instead.

And with that, importing and setup for the sprite is complete! Time to get things set up on your object.

# Setting up your object and playing an animation
You can assign a Spine sprite directly to an object, just like a regular sprite. All of the built in sprite variables like x, y, image_speed, image_xscale, image_angle, etc. also work with Spine sprites, so you can use those the same ways you would with a normal sprite. 
To control what animations you play, you can use skeleton_animation_set, or skeleton_animation_set_ext if you want to play multiple animations at once. The  "anim_name" argument should be a string of the name of your animation, as set in Spine. 
```gml

skeleton_animation_set("Idle");
```
```gml
skeleton_animation_set_ext("Upper Body Idle", 0);
skeleton_animation_set_ext("Lower Body Walk", 1);
```
When using skeleton_animation_set_ext, the "track" argument takes a number. Calling the function multiple times and using different track numbers for different animations is what allows you to play multiple at once. Using a track number that already has an animation playing will replace that animation with the newly set one. This track number can also be used with other functions to run them for that specific track. 
Try to avoid having animations on different tracks both affect the same bone. Only one of them can control the bone at a time, so if two animations affect the same bone, the animation with a higher track number will take priority. In the above example, if both animations controlled the hip bone, then Lower Body Walk would control the hip bone since it has a higher track number. Note that track number being what determines which animation takes priority is not documented behavior, and shouldn't be relied on.

Tip: You can make an enum for tracks to make it easier to remember which track is being used for what.

### Setting a skin
GM defaults to no skin at all, so if you're using skins make sure you set a skin in the create event. Same as the animation functions, the skin_name argument should be a string of the skin's name, as set in Spine. 
```gml
skeleton_skin_set("Red");
```

With that, you should be able to place the object in the room, run the game and see your sprite animating!
If your animation doesn't play, double check your spelling and capitalization - it's case sensitive. If you're using skins and your sprite doesn't appear at all (or only appears partially as if no skin is set), then double check the skin name.

# Collision
All of the regular object collision functions should work with a Spine that sprite that has bounding box attachments. However, things get a bit awkward if you want to use different attachments for different collisions, such as if you have different hitboxes for different attack animations. 
There's no way to directly specify which mesh you want to use, as GM will automatically combine all bounding box attachments into one big collision mask. The only way to separate them is using skins. 
To do this, each bounding box attachment will need to be a child of a skin placeholder attachment, and only present for the specific skin(s) you want it to be active for. 
![](/img/spine_guide_images/collision_in_skins.png)

You can then swap to that skin prior to doing your collision checks that should use that mask, and then swap back after.
```gml
skeleton_skin_set("Bite Hitboxes");
var _enemy = instance_place(x, y, oEnemy);
if _enemy != noone {
    //code to hit the enemy
}
skeleton_skin_set("Body Hurtbox");
```
This does get awkward when using skins for their original intended purpose of swapping out visuals. There's also no easy way to check for a specific skin's mask when the collision check is happening on a different object.
The only way to get around these issues is to not use spine masks at all for separate hitboxes, and instead create a separate object to do the collision, or set your mask_index to a regular sprite with the mask shape you want.

# Using events
You can use Spine's animation events by using skeleton_animation_get_event_frames and comparing it to the current frame as retrieved by skeleton_animation_get_frame. However, a direct comparison may not work. The number returned by skeleton_animation_get_frame is a float, and the event frame can be a float as well. I use the following function to get around the float issues:
```gml
function skeleton_event(event_name, channel = 0, event_num = 0) {
    var event_frames = skeleton_animation_get_event_frames(skeleton_animation_get_ext(channel), event_name);
    return floor(skeleton_animation_get_frame(channel)) == floor(event_frames[event_num]);
}
``` 
If you use the same event multiple times in one animation, you can change the event_num argument to specify which one you're checking for.

Note: Be careful with changing image_speed when using an animation that has event frames! It is possible to be on a frame for multiple steps (if image_speed is less than 1), or skip frames entirely (if image_speed is greater than 1), which can cause events to happen multiple times or be skipped.

# Misc. Useful animation functions
skeleton_animation_mix is a great tool for automatically creating transitions between different animations. You only need to call the function once in the create event and it will automatically do the transition any time you swap between the specified animations. You do NOT need to call it more than once for an object, regardless of how many times you change animations.
```gml
skeleton_animation_mix("Idle", "Walk", 0.4);
```
Note that the transition is one way. The above example code would only add a mix for swapping from Idle to Walk, not the other way around. If you want it to work both ways, then call the function again with the animation arguments reversed.

skeleton_animation_is_finished works similarly to GameMaker's built in animation end event (or the popular community animation_end() function), but for Spine sprites. It's track independant, so it will only return true when the specified track finishes. This function will not work if the animation has looping enabled.


# Manipulating bones in code
Manipulating bone data in code can be very useful for creating dynamic animation, such as pointing a weapon towards your cursor or having another object follow a bone's position. To do this, you will need to set up a ds map to store the bone data, and retrieve that bone data using skeleton_bone_state_get. For example:
```gml
//create event
mapSword = ds_map_create();
mapArm = ds_map_create();

//step event
skeleton_bone_state_get("Sword", mapSword);
skeleton_bone_state_get("Sword Arm IK Target", mapArm);

//clean up event
ds_map_destroy(mapSword);
ds_map_destroy(mapArm);
```
This will create a ds map and fill it with data about the "Sword" bone every step. You can then change values in this ds map and use skeleton_bone_state_set to put the changes back into the bone itself. 

### Making an object follow a bone's position
Putting something at a bone's location is fairly simple, thanks to the bone data having "worldX" and "worldY" values.
```gml
inst.x = mapSword[? "worldX"];
inst.y = mapSword[? "worldY"];
```

### Changing bone position in code
Setting the position of the bone itself is a little trickier, because worldX and worldY are read only values.

In this example, I get data about an IK bone, and change it's position to be offset in the direction of the mouse:
```gml
skeleton_bone_state_get("Sword Arm IK Target", mapArm);
var mouseDir = point_direction(x, y, mouse_x, mouse_y);
mapArm[? "x"] = lengthdir_x(100, mouseDir);
mapArm[? "y"] = lengthdir_y(-100, mouseDir);
skeleton_bone_state_set("Sword Arm IK Target", mapArm);

```
Notice that the lengthdir_y here has -100 instead of 100. This is because Spine's y axis is the inverse of GM's. In GM, positive Y is down, and negative Y is up. In Spine, positive Y is up, and negative Y is down. This complicates any position based math you do, so don't forget to take it into account.
Keep in mind that the only bone variables you can change are all "local", meaning they don't factor in any parent bone's transforms. If the bone you are changing the position of has any animated parent bones, you may get bizzare results, so I suggest setting up your rig in such a way that the bones you are changing in code have minimal parenting.

### Making an object follow a bone's angle
For this, we have the read-only "worldAngleX" and "worldAngleY" values, so we don't need to worry about the bone's inheritance. But how do we use these when the angle is split in two?

Using negative worldAngleX will usually get you the correct angle:
```gml
hitbox.image_angle = -mapSword[? "worldAngleX"];
```
The fact that the negative of worldAngleX is used here is important. If you use worldAngleX as is, your attached object will rotate in reverse, and not align properly. 
Depending on the orientation of the sprite you are setting to the angle of the bone, using worldAngleX may not line up, and you can try using ``-mapSword[? "worldAngleY"]`` instead if that is the case.

### Changing bone angle in code
For making a weapon point towards the mouse, there's the same issue positions have of the only variable you can change being local. As long as your bone's inheritance isn't interfering, you can make a bone point in a specified direction like so:
```gml
skeleton_bone_state_get("Sword", mapSword);
mapSword[? "angle"] = point_direction(x, y, mouse_x, mouse_y) - image_angle;
skeleton_bone_state_set("Sword", mapSword);
```
image_angle is subtracted here so that the bone will still point in the right direction if you've changed image_angle at all.

### Bone data update delay
If you look closely, you may notice that things positioning or setting their angle using bone data feel like they are lagging behind slightly. That's because they are! The bone data is only updated for the next frame of animation when the Spine sprite is drawn, which means the data retrieved in the step event will be 1 frame behind what actually gets drawn on screen. 
Unfortunately, there is no good solution for this. Running your code in the draw event flies in the face of all good practices and can cause various issues. So, my hacky fix is use the following function in the step event, prior to any calls of skeleton_bone_data_get:
```gml
function skeleton_bone_update() {
    draw_self();    
}
```
By drawing the sprite in step, this will force an update of the bone data and fix the lagging behind issue. I put it inside another function to hide the shame of calling draw_self() in the step event, and to make it easier to search for and remove if a better method is ever added. Drawing the sprite multiple times will not update the animation frame multiple times, so don't worry about that.
This is obviously not a great solution and is a negative for performance, but it's the best one I've been able to come up with. The alternative is to just decide things being a frame behind isn't a big deal, but this being an option or not will depend on what exactly you're doing.

# Drawing different attachment images separately
There may be some situations where you don't want to draw the entire Spine sprite all at once. Maybe you want to draw different parts at different depths, or want to apply a shader to only specific parts. There's no direct way to draw specific attachments, but I've found a workaround using skeleton_slot_color_set to set the alpha of the attachments you don't want to draw to 0.
```gml
//ADD THE JSDOC
function skeleton_slot_isolate(_slots_to_show) {
    var _list = ds_list_create();
    skeleton_slot_list(sprite_index, _list);
    
    var _hide_slot = true;
    for (var i = 0, size = ds_list_size(_list); i < size; ++i) {
        for (var j = 0, len = array_length(_slots_to_show); j < len; ++j) {
            if _list[| i] == _slots_to_show[j] {
                _hide_slot = false;
                break;
            }
        }
        if _hide_slot == true {
            skeleton_slot_color_set(_list[| i], c_white, 0);
        }
        else {
            skeleton_slot_color_set(_list[| i], c_white, 1);
            _hide_slot = true;
        }
    }
    ds_list_destroy(_list);
}


/**
 * Function Resets slot alpha, returning all slots to the default alpha of 1.
 */
function skeleton_slot_reset() {
    var _list = ds_list_create();
    skeleton_slot_list(sprite_index, _list);
    for (var i = 0, size = ds_list_size(_list); i < size; ++i) {
        skeleton_slot_color_set(_list[| i], c_white, 1);
    }
    ds_list_destroy(_list);
}
```
Example usage:
```gml
draw_self();

shader_set(sh_hitflash);
skeleton_slot_isolate(["Head", "Eyes"]);
draw_self();
skeleton_slot_reset();
shader_reset();
```
This would draw the sprite normally, then apply a shader to just the head and eyes of the sprite and draw that on top.