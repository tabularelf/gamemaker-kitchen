---
title: "GameMaker Patterns: Step Manager"
description: A tutorial describing a Step Manager pattern, for ensuring correct execution order and easily disabling part of gameplay logic.
date: 2024-10-03
gm_versions:
  - Any
tags:
  - GM Patterns
authors:
  - Alice
---

In this tutorial I'll introduce a **Step Manager** pattern useful for GameMaker projects. It will cover:

- the problem with unknown execution order within the Step event
- how to implement the Step Manager and use it to order bits of the gameplay logic
- how to conditionally disable core gameplay logic or parts thereof within the Step Manager framework

The tutorial assumes a general familiarity with object events and basics of GML Code.

The Step Ordering Problem
=========================

The [manual page about Event Order](https://manual.gamemaker.io/monthly/en/#t=The_Asset_Editors%2FObject_Properties%2FEvent_Order.htm) specifies, among other things, the order of events processing in a single frame. From there we can learn, for example, how **Alarm** events are processed before the **Step** event and how the **End Step** event is executed last before **Draw** events.

From the same manual page, we can read that:

> As a general rule, you can rely on the order of the events listed below, but not on the order in which the instances in the room execute one event.

In other words, you may always expect that e.g. the player's **Step** event will execute before the enemies' **End Step** event, but the relation between the player's **Step** event and the enemies' **Step** event can't be relied upon in any way. The player may execute its Step logic before the enemies, or after, maybe even in-between Step events of some enemies. What's more, the behaviour may vary between platforms, so a code relying on a specific **Step** events execution order may act inconsistently between platforms, leading to frustrating and hard to diagnose bugs.

Some of the ordering problem may be alleviated by a clever use of **Begin Step**, **Step** and **End Step** events. However, the number of gameplay logic components may grow so large it becomes hard if not impossible to ensure correct order. For example, consider the following gameplay logic:

- check device inputs (e.g. arrow keys, space) and match them to in-game actions (movement, interaction)
- move the moving platforms and push any players/enemies in the way
- move the player and the enemies
- check collisions for the player and the enemies (the collisions are non-trivial enough that they can't be handled by **Collision** events)
- update animation state for the player and the enemies

Technically, checking device inputs and movement of the moving platforms can both occur in the **Begin Step** event, as long as the input-based actions aren't used in some other **Begin Step** event. Then, these input-based actions could be used in the **Step** event to decide the player movement, while enemies use their AI. But then collision checking would need to be pushed to the **End Step** event and there is no event left for updating the animation state. What's more, the gameplay logic is scattered across various objects, and it becomes difficult to piece together a comprehensive overview of it.

**NOTE:** You might stumble across various urban legends about how the execution order within the Step event depends on which objects were created first, or which have the highest depth etc. *Never rely on these!* Even if you observe a consistent order within a certain event, the ordering may change in a newer runtime or on another platform. The only exception is when the order is explicitly documented - for example, Draw events are specified to be executed from the highest depth to lowest.

Implementing the Step Manager
=============================

Enter the **Step Manager** pattern! It helps with taming the unruly individual objects and making sure the core logic is processed in a consistent order.

A Step Manager is *an instance solely responsible for the Step event execution*. Thus, you cannot have multiple active Step Managers at the same time, and you cannot have instances other than the Step Manager running their **Step** event. Otherwise, the Step Manager wouldn't be *solely* responsible for the **Step** event execution. Step Manager solely running its **Step** event removes any ambiguity about the order of processing gameplay logic components - there's only one way to shuffle a single Step event to execute, after all. 

It's recommended that the Step Manager focuses only on the "big picture". Player-specific logic would still preferably belong to the player object, enemies-specific logic would preferably belong to the enemy object etc. The easiest way to handle that - especially with existing codebase using Step event variations - is to put the core logic in the **User Events** instead. These events aren't performed automatically; instead, they can be triggered with the [event_user](https://manual.gamemaker.io/monthly/en/#t=GameMaker_Language%2FGML_Reference%2FAsset_Management%2FObjects%2FObject_Events%2Fevent_user.htm) built-in function. Following this, the gameplay logic from above can be changed like so:

- *check device inputs* - logic remains in the **Begin Step** event
- *move the moving platforms* - logic is moved to **User Event 0** of the moving platforms parent
- *move the player and enemies* - logic is moved to the **User Event 0** of the player and enemy objects, respectively
- *check collision for the player and enemies* - logic is moved to the **User Event 1** of the player and enemy objects, respectively
- *update animation state* - logic may be added to the **End Step** events of the player and enemies objects; the assumption is that once core gameplay logic is processed, each object should be able to update animation state independently and thus ambiguous order is not a problem here

With these changes in place, the Step Manager object would implement the following logic in its **Step** event:

```gml
// Movement

with (par_MovingPlatform) {
    event_user(0); // platforms pushing/movement
}
with (obj_Player) {
    event_user(0); // player movement
}
with (par_Enemy) {
    event_user(0); // enemies movement
}

// Collision checks

with (obj_Player) {
    event_user(1); // player collision checks
}
with (par_Enemy) {
    event_user(1); // enemies collision checks
}
```

Such a **Step** event gives a nice overview of what's supposed to happen every frame. Moreover, should some reordering be required, it can be easily done from a single place, without juggling events across different objects.

On the other hand, the developer must ensure an active Step Manager instance is in the room, whether by placing it in the room or creating it with code; otherwise no gameplay logic will be executed at all! Also, for any **User Event** representing a gameplay logic step they must remember to make the `event_user` call in the **Step** event of the Step Manager; forgetting to include a corresponding call will cause some of the gameplay logic to be omitted. Thankfully, any bugs related to absence of the Step Manager or missing `event_user` calls should be easy to diagnose and quickly fixed, especially once the developer gets used to the Step Manager pattern.

**NOTE:** While the tutorial uses **User Events** for organising gameplay logic in its examples, the developer may use other alternatives such as [named methods](https://manual.gamemaker.io/monthly/en/#t=GameMaker_Language%2FGML_Overview%2FMethod_Variables.htm). Any code that can be called from the Step Manager and isn't processed automatically will work for that purpose.

Disabling gameplay logic
========================

Sometimes, the developer may want to disable the gameplay logic; usually this need arises for pause menus. Another common scenario would be omitting player walking input in the middle of a dialogue. Both of these situations will be covered here.

When gameplay objects run their **Step** events independently, the common solution is to detect a pause menu instance and prevent execution then:

```gml
if (instance_exists(obj_PauseMenu))
    exit;

// do own part of the gameplay logic
```

However, this can get quite unwieldy and bug-prone the more objects you add - the developer must remember to add the condition in each relevant object, or else some instances might keep running while the rest is paused. What's worse, if the developer comes up with another entity that blocks the core gameplay logic, they need to modify the condition for each affected object:

```gml
if (instance_exists(obj_PauseMenu) || instance_exists(obj_Tutorial) || instance_exists(obj_Inventory) || ...)
    exit;

// do own part of the gameplay logic
```

Someone smart might eventually come up with wrapping all these conditions in a function, so that only the function would need to be changed if another gameplay-blocking entity appeared. However, it still leads to lots of similar code in the newly added entities.

What's more, if the pause menu happens to be created from within a **Step** event, it may turn out some objects will process their gameplay logic in the portion of the Step event before the pause menu was created, while other objects won't. Same problem may arise if unpausing the game happens in the **Step** event as well. So not only is pausing based on independent **Step** events cumbersome to handle, it can easily lead to desynchronisation bugs.

In contrast, the Step Manager can handle pausing from a single place, without any desynchronisation whatsoever:

```gml
// process the pause menu, if any
if (instance_exists(obj_PauseMenu)) {
    with (obj_PauseMenu) {
        event_user(0); // process the pause menu inputs
    }
    exit; // don't process anything other than the pause menu
}

// open the pause menu with Escape key
if (keyboard_check_pressed(vk_escape)) {
    instance_create_layer(0, 0, layer, obj_PauseMenu);
    exit; // prevent any further actions upon pausing
}

// Movement

with (par_MovingPlatform) {
    event_user(0); // platforms pushing/movement
}
with (obj_Player) {
    event_user(0); // player movement
}
with (par_Enemy) {
    event_user(0); // enemies movement
}

// Collision checks

with (obj_Player) {
    event_user(1); // player collision checks
}
with (par_Enemy) {
    event_user(1); // enemies collision checks
}
```

Broadly speaking, if you find yourself adding the same gameplay-blocking condition across many objects, it's a sign you might significantly benefit from the Step Manager.

---

In some cases, you might want to disable only a part of the core gameplay logic - especially player input - while the rest keeps going. Here is an example for a hypothetical dialogue system:

```gml
// Inputs/AI

if (instance_exists(obj_Dialogue)) {
    with (obj_Dialogue) {
        event_user(0); // redirect input to the dialogue
    }
} else {
    with (obj_Player) {
        event_user(0); // accept input for the overworld player
    }
}

with (par_NPC) {
    event_user(0); // decide on the next step, if any
}

// Movement

with (obj_Player) {
    event_user(1); // keep moving to the destination, if not already reached
}
with (par_NPC) {
    event_user(1); // move NPCs according to the next step they've chosen
}
```

While the overworld player's input is omitted during a dialogue, the NPCs are still free to decide on their next steps and move around. The NPCs might additionally check if they aren't in the middle of talking to the player, but this should be manageable too.

Moreover, both the player and NPCs movement is processed regardless of the presence or absence of the dialogue entity. This can be especially useful for built-in cutscenes - e.g. the dialogue system might at some point tell the player to move to another spot while still accepting input instead of the overworld player instance.

Summary
=======

In this tutorial, I introduced the **Step Manager** pattern. It's especially useful for:

- ensuring that the core gameplay logic is correctly ordered (in contrast with objects running their Step events independently)
- organising the gameplay logic in a single place, so that it's easier to reason about it and adjust it
- conditionally disabling the gameplay logic or fragments thereof from a single place (including pausing the game)

Admittedly, the Step Manager requires some extra setup compared to simply adding Step events on respective objects. However, most of the time - especially for projects involving many non-trivial objects - the benefit of more predictable and easily adjustable code will far outweigh the little additional cost.
