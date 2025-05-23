---
logo: /site-assets/img/gamemaker_assets/icon_RT_script_outlined.png
logo_width: 160
logo_height: 160
title: Write your code through Instantiable Constructors
description: Code architecture guide on moving majority of your object code into instantiable constructors, enabling control of the application loop.
date: 2025-03-22
tags:
  - Code Architecture
  - Application Loop
authors:
  - Mtax
donation_link: https://github.com/sponsors/Mtax-Development
donation_text: Donate to author
---

When attempting to write a game outside of a game engine, one would start with an empty text file to create an overarching application loop within their programming language of choice — that is, how the application keeps on repeating to not finish its execution after a single iteration and how and when events of each object and concept within are allowed to be executed. Game engines tend to achieve this through their own event systems, which is represented in GameMaker through [Object Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm). What they really are is code executing another code at specific timing. However, GameMaker does not offer precise control over this timing and it can depend on unpredictable things, such as the alphabetical order of [Object Asset](https://manual.gamemaker.io/monthly/en/Quick_Start_Guide/Objects_And_Instances.htm) names.

This guide is about writing a custom framework using GameMaker Language for executing object code to gain full control of the process. Doing so benefits all kinds of GameMaker projects, both simple and complex, with little actual drawbacks. Effects range from enhancing the programming experience by working with a transparent and understandable code, to extending control over timing of execution and display of elements within the application, enabling several state of the art graphical and networking paradigms.

This guide will go through the setup of such approach, its example benefits, as well as ideas for advanced use of presented concepts. The setup is kept simple, as not many assets are involved in primary functionality.

Techniques presented below are dependent on following GameMaker systems:
* [Objects](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm), [Instances](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm), [Object Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), [Event Order](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Event_Order.htm), [Variables and Variable Scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables_And_Variable_Scope.htm), [Built-In Instance Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/Instance_Variables.htm), [Instance Keywords](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance_Keywords.htm) and [Parent Objects](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Parent_Objects.htm).
* [Functions](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm) and [Method Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm).
* [Structs and Constructors](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm), [Static Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm) and [Garbage Collection](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Garbage_Collection/Garbage_Collection.htm).
* [Data Types](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm), [Arrays](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Arrays.htm) and [Priority Queues](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm).
* [Rooms](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/Rooms.htm), [Room Order](https://manual.gamemaker.io/monthly/en/Settings/The_Room_Manager.htm), [Room Creation Code](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Room_Properties/Room_Properties.htm), [Layers](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/General_Layer_Functions/General_Layer_Functions.htm) and [Sprites](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprites.htm).
* [Asset Editors](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/The_Asset_Editors.htm) and [Code Regions](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm).

These concepts are supported in runtimes after the [2.3 version of GameMaker Studio 2](https://help.gamemaker.io/hc/en-us/articles/360011980018-GameMaker-2-3-0-And-The-Exciting-Changes-It-Brings), released in August 2020.

# The Concept

GameMaker only supports performing the application loop using [Objects](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm), but this can be reduced to just one object acting as the *Event Queue* and a handful of supporting *Blueprint Objects* for use with features exclusive only to them. Everything else can be then operated through *Instantiable Constructors* and *constructors inheriting Instantiable Constructors*. This hierarchy works as follows:

* **Event Queue:** Only one is used. Manages the application loop to execute repeated [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) submitted by all instanced constructors into [Priority Queues](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm), in order according to priority they were assigned.
* **Blueprint Objects**: Several are used, their amount depends on the needs of the project. Each has a different set of [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) of two types: **Repeated** (`Step`, `Draw`, `Draw GUI` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm)) and **instant** (every other [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm)). Their [Instances](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) execute repeated [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to submit *Event Methods* of constructors that instantiated them to the *Event Queue*, for it to execute them at appropriate time. Instant [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) are executed by [Instances](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) at the moment they would normally happen.
* **Instantiable Constructors**: Exactly as many as the number of *Blueprint Objects* used. They create and operate *Blueprint Objects* from the level of a constructor that [inherits](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) them, supplying them with [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) used to operate them, such as actually creating and destroying their instances.
* **Constructors inheriting Instantiable Constructors**: As many as the project requires are used. This is what the code of the actual project will be contained in after this framework is set up. Each of these constructor [inherits](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) an Instantiable Constructor of appropriate type to [inherit](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) executed during specific [Object Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) as necessary. Their [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) with names set up in an Instantiable Constructor they [inherit](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) are the *Event Methods* partaking in this system.

# Benefits

* Increased similarity to programming without game engine tools, making use of ubiquitous knowledge that is easier to transfer between programming environments:
	* Code responsible for executing [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) becomes visible and modifiable.
	* Changes to [Objects](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) are performed mostly through code, without reliance on graphical interface tools.
* Direct control over order and timing of execution and rendering:
	* Simplifies executing [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) outside of their usual order when necessary, using features exclusive to [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm).
	* Enables the possibility of supporting high screen refresh rates, provided the code of object logic is properly separated from rendering code.
	* Can be used in networking to control [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) execution in respect to connection delay.
	* Allows manipulating input through variables without causing additional input delay.
* Reduces reliance on systems built into GameMaker, offering a choice between actively using them or keeping their usage to minimum:
	* Enables the possibility of creating the project using just one [Layer](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/General_Layer_Functions/General_Layer_Functions.htm), as render ordering is handled by order of [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) execution, and using just one [Room](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/Rooms.htm), as [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) management is handled with code.
	* Works on [Object](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) code in a namespace without [Built-In Instance Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/Instance_Variables.htm), as constructors do not use them. This prevents accidental usage of systems based on these variables, as [Instance reference](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/id.htm) has to be explicitly used in constructor code.
	* Encourages lesser need of individual [Objects](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) for features, which can be operated by manager constructors. Constructors are memory-efficient, as their content is entirely customizable.
* Introduces additional convivence to the process of programming:
	* Provides a simple way to change the type of an [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) by changing its [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) name.
	* Individual scripts are easier to recognize in GameMaker project directory structure.
	* Aids understandable programming architectures and expression of the intent.

# Implementation

### Event Queue
The first concept to introduce is the *Event Queue*, through which **repeated** [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) will be executed:
 1. Create a new [Object Asset](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) named `EventQueue` and enable its properties: `Visible` and `Persistent`. Then, add following [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to it: `Create`, `Clean Up`, `Step`, `Draw` and `Draw GUI`.
 2. Ensure a single instance of `EventQueue` is created when the application is launched. This can be done in several different ways using a [Room Asset](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/Rooms.htm) that is the first in the [Room Order](https://manual.gamemaker.io/monthly/en/Settings/The_Room_Manager.htm):
	* Edit [Room Creation Code](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Room_Properties/Room_Properties.htm) to create a [Layer](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/General_Layer_Functions/General_Layer_Functions.htm), on which an instance of `EventQueue` will be created by calling <code><a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/instance_create_layer.htm">instance_create_layer</a>()</code>.
	* Edit [Room Creation Code](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Room_Properties/Room_Properties.htm) to create an [individual Layer](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/layer.htm), on which an instance of `EventQueue` will be created at specified depth by calling <code><a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/instance_create_depth.htm">instance_create_depth</a>()</code> .
	* Use the the [Room Editor](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Rooms.htm) to create or select an existing [Instance Layer](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Room_Properties/Layer_Properties.htm) and drag the `EventQueue` asset into it using the cursor.
 3. In `Create` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) of `EventQueue`, add code declaring a variable with a [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) for each type of a **repeated** [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm):
<pre>
step = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_create.htm">ds_priority_create</a>();
draw = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_create.htm">ds_priority_create</a>();
drawGUI = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_create.htm">ds_priority_create</a>();
</pre>
4. In `Step`, `Draw` and `Draw GUI` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), add code iterating through above [Priority Queues](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm), using the following pattern. In each [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), change the name of the `queue` variable to match an appropriate [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) for the current [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm):
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/repeat.htm"><b>repeat</b></a> (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_size.htm">ds_priority_size</a>(queue))
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _event = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_delete_min.htm">ds_priority_delete_min</a>(queue);
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (_event[0])
	{
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (_event[0])
		{
			_event[1]();
		}
	}
}
</pre>
  Explanation:
* When instances of *Blueprint Objects* execute their **repeated** [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), they add a value to appropriate [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) of `EventQueue`. That value is added at the priority assigned to *Instantiable Constructor*, which created that instance. It decides the order of execution. The value is an array containing two entries: the reference to that constructor and its [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to execute.
* The [**`with`**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) statement is used twice to ensure proper [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) of execution from within the *Event Method* code, both changing the [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) to the constructor. The first use of this statement sets the [`other`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/other.htm) [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm), so it does not refer to `EventQueue` and second sets the [`self`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm) [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm).
* Once [scopes](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) are set, the [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) is executed, then it is removed from the [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) and iteration repeats until it is empty.
1. In `Clean Up` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), add code freeing up memory used by `EventQueue` in case it is destroyed, to prevent memory leaks from occurring:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_destroy.htm">ds_priority_destroy</a>(step);
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_destroy.htm">ds_priority_destroy</a>(draw);
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_destroy.htm">ds_priority_destroy</a>(drawGUI);
</pre>
<hr>

### Instantiable Constructor Parent
Next is the setup of primary constructor, from which all *Instantiable Constructors* will [inherit](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance). It contains the framework for *Event Methods*, execution priorities and [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) used to manage [Instances](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) .
1. Create a new [Script Asset](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Scripts.htm) named `Instance`, then edit it to add [**`constructor`**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm#constr) after its name.
2. In the code of this newly made constructor, add following [**static**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm) properties:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> object = Object;
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> createEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>() {}
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> stepEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>() {}
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> drawEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>() {}
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> cleanUpEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>() {}
</pre>
  Explanation:
* The property `object` is the *Blueprint Object* that will be used for this *Instantiable Constructor*. The value of this property will be replaced in *Instantiable Constructors* [inheriting](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) this constructor.
* The *Event Methods* reference empty [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm), which will become the default content of each [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm). Each *constructor inheriting an Instantiable Constructor* can have [**static**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm) properties with these names to declare content of their own [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm).
3. Add a [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) that will return a struct with variables added to instance of the `object` of this constructor. At minimum, it needs to contain a reference to the constructor:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> getBaseInstanceData = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _base = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm">self</a>;
	
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/return.htm"><b>return</b></a>
	{
		base: _base
	};
}
</pre>
4. Declare a `priority` property and assign any integer number to it. That will become the default priority for any constructor [inheriting](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) this one, which then can be overridden in their own constructor declarations. This number decides which [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) executes its **repeated** [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) first, in cases where that order matters. With how `EventQueue` was set up in previous steps, the **lower** this number is, the earlier its [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) executes, suggesting that `0` can be considered the lowest number used for priorities.
5. Add a `createInstance()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) that will instantiate the `object` of this constructor and add variables to it, as returned by `getBaseInstanceData()`. Exact contents of this [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) are flexible, depending on the rest of the project, as it can be used to expand the [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) with additional features or configure its [Built-In Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/Instance_Variables.htm) by adding them upon creation. A [Layer](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/General_Layer_Functions/General_Layer_Functions.htm) needs to be exist in the application at this point to contain the [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm). Following example code assumes one exists as a `instanceLayer` variable of `EventQueue`:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> createInstance = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/instance_create_layer.htm">instance_create_layer</a>(0, 0, EventQueue.instanceLayer, object, <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm">self</a>.getBaseInstanceData());
}
</pre>
6. Add `destroyInstance()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) that will destroy the instance of this constructor, set its reference to [`undefined`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm) and return [`undefined`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm), so the call of this [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) can be assigned to variable referencing this constructor, removing reference to it. Removing all references to this constructor will allow the [Garbage Collector](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Garbage_Collection/Garbage_Collection.htm) to free memory it occupied after it can be no longer used:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> destroyInstance = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/instance_destroy.htm">instance_destroy</a>(instance);
	instance = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm">undefined</a>;
	
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/return.htm"><b>return</b></a> <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm">undefined</a>;
}
</pre>
<hr>

### Blueprint Object
As the above *Instantiable Constructor* relies on an `object` property to function, it must be created with the same asset name it references to.
1. Create a new [Object Asset](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) named `Object` and enable its `Visible` property. Then, add following [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to it: `Create`, `Clean Up`, `Step` and `Draw`.
2. In `Create` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), add code declaring <code>base.instance = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/id.htm">id</a>;</code>. The `base` variable is a reference to the constructor that created this [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm). This is the earliest timing at which the [Instance Reference](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/id.htm) can be assigned in it, making it possible to access it from the `Create` *Event Method* in the *Instantiable Constructor* code that is about to be executed.
3. Below above code, add the following code executing the `Create` *Event Method* in the [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) of the *Instantiable Constructor*. As it is an **instant** [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), it needs to be executed immediately:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (base)
{
	createEvent();
}
</pre>
4. Add *Event Method* execution with the above code pattern to the `Clean Up` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) by replacing `createEvent()` with `cleanUpEvent()`.
5. In `Step` and `Draw` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), refer to `EventQueue` and add an array with `base` reference and an appropriate *Event Method*, according to following code pattern, where `queue` needs to be replaced with the appropriate variable referencing its [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) for the current [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm):
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_add.htm">ds_priority_add</a>(EventQueue.queue, [base, stepEvent], base.priority);
</pre>

# Examples

### Time tracker
This example illustrates a single-purpose *constructor inheriting an Instantiable Constructor* that needs to execute each `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to operate. Normally, it would need to be fit into code of another [Object](https://manual.gamemaker.io/monthly/en/Quick_Start_Guide/Objects_And_Instances.htm) to be continuously executed, but for an *Instantiable Constructor* it is possible to operate on its own after simply being constructed anywhere in the project after `EventQueue` became operational.
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a> Time() : Instance() <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm"><b>constructor</b></a>
{
	priority = 1;
	
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#region</b></a> [Events]
	
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> createEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
		{
			stepCount = 0;
		}
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> stepEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
		{
			++stepCount;
		}
		
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#endregion</b></a>
	
	createInstance();
}
</pre>

An *Instantiable Constructor* like this should be declared with a low priority, meaning it will be one of the earliest to execute, so *Instantiable Constructors* executing later can access its updated information.

A feature [Object Assets](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) have is that they can be referred to directly, which is intended for use with *Singleton Objects*, where only one [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) is created. That makes it possible to refer `ObjectName.variableName` from code as long as it its [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) exists. This behavior can be reproduced for any kind of variable by using [**`globalvar`**](https://manual.gamemaker.io/monthly/en/index.htm#t=GameMaker_Language%2FGML_Overview%2FVariables%2FGlobal_Variables.htm&rhhlterm=globalvar). This way, any keyword that is not already in use can be registered as a globally accessible variable, without the need of the <code><a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Global_Variables.htm">global</a>.</code> prefix. Instead, its name is written right after the [**`globalvar`**](https://manual.gamemaker.io/monthly/en/index.htm#t=GameMaker_Language%2FGML_Overview%2FVariables%2FGlobal_Variables.htm&rhhlterm=globalvar) keyword exactly once in the code base. Then, that registered variable can have values set to and read from it, in separate calls from its initial declaration.

### Moving and colliding instance
Following constructor operates simple code responsible for rendering, movement and collision. To execute it, it can be constructed twice anywhere in the project after `EventQueue` became operational.
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a> ExampleMovingInstance() : Instance() <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm"><b>constructor</b></a>
{
	priority = 15;
	
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#region</b></a> [Events]
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> createEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> identifier = 0;
			
			++identifier;
			movementSpeed = ((identifier == 1) ? 5 : 0);
			
			instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/x.htm">x</a> = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/round.htm">round</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Cameras_And_Display/The_Game_Window/window_get_width.htm">window_get_width</a>() * (0.325 * identifier));
			instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/y.htm">y</a> = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/round.htm">round</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Cameras_And_Display/The_Game_Window/window_get_height.htm">window_get_height</a>() * 0.5);
			instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/sprite_index.htm">sprite_index</a> = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm">self</a>.createSprite(50);
		}
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> stepEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _speed_x = ((<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Game_Input/Keyboard_Input/keyboard_check.htm">keyboard_check</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Strings/ord.htm">ord</a>("D")) - (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Game_Input/Keyboard_Input/keyboard_check.htm">keyboard_check</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Strings/ord.htm">ord</a>("A")))) * movementSpeed);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _speed_y = ((<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Game_Input/Keyboard_Input/keyboard_check.htm">keyboard_check</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Strings/ord.htm">ord</a>("S")) - (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Game_Input/Keyboard_Input/keyboard_check.htm">keyboard_check</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Strings/ord.htm">ord</a>("W")))) * movementSpeed);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _collision_x = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/sign.htm">sign</a>(_speed_x);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _collision_y = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/sign.htm">sign</a>(_speed_y);
			
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/repeat.htm"><b>repeat</b></a> (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/abs.htm">abs</a>(_speed_x))
			{
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>if</b></a> (!<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm">self</a>.isColliding(_collision_x))
				{
					instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/x.htm">x</a> += _collision_x;
				}
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>else</b></a> 
				{
					<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/break.htm">break</a>;
				}
			}
			
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/repeat.htm"><b>repeat</b></a> (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/abs.htm">abs</a>(_speed_y))
			{
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>if</b></a> (!<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/self.htm">self</a>.isColliding(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Data_Types.htm">undefined</a>, _collision_y))
				{
					instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/x.htm">y</a> += _collision_y;
				}
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>else</b></a> 
				{
					<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/break.htm">break</a>;
				}
			}
		}
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> drawEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>()
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (instance)
			{
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Sprites_And_Tiles/draw_self.htm">draw_self</a>();
			}
		}
		
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#endregion</b></a>
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#region</b></a> [Methods]
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> isColliding = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>(_distance_x = 0, _distance_y = 0)
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (instance)
			{
				<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/return.htm"><b>return</b></a> (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Movement_And_Collisions/Collisions/collision_rectangle.htm">collision_rectangle</a>((<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/bbox_left.htm">bbox_left</a> + _distance_x), (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/bbox_top.htm">bbox_top</a> + _distance_y),
							    (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/bbox_right.htm">bbox_right</a> + _distance_x), (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/bbox_bottom.htm">bbox_bottom</a> + _distance_y),
							    base.object, <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Maths_And_Numbers.htm">false</a>, <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Maths_And_Numbers.htm">true</a>) != <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Instance%20Keywords/noone.htm">noone</a>);
			}
		}
		
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> createSprite = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>(_size)
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _surface = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Surfaces/surface_create.htm">surface_create</a>(_size, _size);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Surfaces/surface_set_target.htm">surface_set_target</a>(_surface);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Colour_And_Alpha/draw_clear.htm">draw_clear</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Colour_And_Alpha/Colour_And_Alpha.htm">c_white</a>);
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Surfaces/surface_reset_target.htm">surface_reset_target</a>();
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _sprite = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Manipulation/sprite_create_from_surface.htm">sprite_create_from_surface</a>(_surface, 0, 0, _size, _size, false, false,
								 (_size * 0.5), (_size * 0.5));
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Surfaces/surface_free.htm">surface_free</a>(_surface);
			
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/return.htm"><b>return</b></a> _sprite;
		}
		
	<a href="https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/Editing_Code.htm"><b>#endregion</b></a>
	
	createInstance();
}
</pre>
  Explanation:
* The priority of the instance is declared. This will cause the **repeated** [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) of this constructor to execute after ones using the default priority value. This step is optional.
* A `createEvent()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) is declared. Just having this [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) assigned to a property of this particular name will cause it to be executed when `createInstance()` is called. The code of the [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) sets property of a constructor in accordance to a declared [**static**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm) property, which is a feature not available to [Object](https://manual.gamemaker.io/monthly/en/Quick_Start_Guide/Objects_And_Instances.htm) code normally. After that, an instance is referred to configure its [Built-In Instance Variables](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/Instance_Variables.htm).
* A `stepEvent()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) is declared, which will be added into `EventQueue` each `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm). Its code depends on [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) of the constructor declared below it to operate collision in a loop as a part of its movement code.
* A `drawEvent()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) is declared, which will be added into `EventQueue` each `Draw` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), as long as this [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) has its [`visible`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/visible.htm) [Built-In Variable](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/Instance_Variables.htm) set to [`true`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Maths_And_Numbers.htm). The [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) must be changed to execute [`draw_self()`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Sprites_And_Tiles/draw_self.htm), as it is an [object-specific function](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Draw_Events.htm#default_draw). It can be replaced with [`draw_sprite()`](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Sprites_And_Tiles/draw_sprite.htm) for use without changing [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm).
* Two constructor [methods](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) are declared. One to be used in the `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) in operating collisions through the `instance` [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) and another to generate a [Sprite](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprites.htm) assigned during creation.
* The `createInstance()` [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) is called. This will immediately create the [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm). Calling this [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm) can be omitted if a constructor is meant to be only constructed, but instantiated later.

According to the implementation of `EventQueue`, the `instance` property is referred to and set as [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm) multiple times in above example. Hence, this programming paradigm is most effective when designed with manager constructors, which would use non-instance constructors to operate logic of each concept and render all results in one go. However, if it is a necessity for the project, the `EventQueue` can be also set up to instead execute in `instance` [scope](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm), in which case its `base` *Instantiable Constructor* will become what will need to be specifically referenced.

# Expanding Implementation

After the initial setup, different kinds of *Blueprint Objects* can be added into the project as they become necessary. [Object Assets](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) must have their [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) added manually, for their use to be possible with *Instantiable Constructors*. While it could be handled by just creating one [Object Assets](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) with code for every kind of an [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) supported by GameMaker, it usually is not necessary. This is also the case for the `Begin` and `End` variants of **repeated** [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), since the priority system acts as a replacement in cases where such distinction is not required to use functionality relying on it. Creating specific *Blueprint Objects* communicates the intent of each *constructor inheriting an Instantiable Constructor*. For example, stating that a constructor [inherits](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) `InterfaceInstance` constructor makes it immediately clear it was made to access the `Draw GUI` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), which the `Instance` constructor does not operate.

Instructions below exemplify an implementation of said *Blueprint Object* and its respective *Instantiable Constructor* by [inheriting](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) from `Instance` constructor, so it can be [inherited](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) further by constructors specific to each project:
1. Create a new [Object Asset](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm) named `InterfaceObject`, enable its `Visible` property and set `Object` as its [Parent Object](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Parent_Objects.htm). Then, add `Draw GUI` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to it.
2. Copy the code of `Draw` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) from `Object` and paste it into the newly created `Draw GUI` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), then change the uses of the `draw` [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm) to `drawGUI`.
3. Create a new [Script Asset](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Scripts.htm) named `InterfaceInstance`, then edit it to make it contain the following code:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a> InterfaceInstance() : Instance() <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm"><b>constructor</b></a>
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> object = InterfaceObject;
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm"><b>static</b></a> drawGUIEvent = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm"><b>function</b></a>() {}
}
</pre>
  Explanation:
4. This constructor is made an *Instantiable Constructor* by [inheriting](https://manual.gamemaker.io/monthly/en/index.htm?#t=GameMaker_Language%2FGML_Overview%2FStructs.htm&rhhlterm=Inheritance) the `Instance` constructor, which causes it to also contain setup necessary for it to function that way.
5. The `object` property has to be assigned to the new *Blueprint Object*, which in this case is the `InstanceObject`.
6. The `Instance` constructor does not contain `drawGUIEvent`, so it has to be added as a [**static**](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Functions/Static_Variables.htm) property referencing an empty [method](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Method_Variables.htm).

# Implementing Advanced Features

With the use of *Event Methods*, it becomes possible to support advanced techniques that require full control of the execution timing. This section presents an implementation of high refresh rate support. While it is a complicated topic in general, it will serve as a simplified example of what can be achieved by manipulating execution loop of the application.

The default configuration of a newly created GameMaker project sets it to execute at 60 frames per second, which is expressed in intent of executing **repeated** [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) at most of 60 times during that second. This value ensures every export target is able to universally display the graphics of the same application. However, it does not make full use of devices that support refresh rates higher than 60, which would possibly allow them to achieve smoother visual motion and more responsive input.

Note that to see the intended result of this section, it must be tested on a display with a refresh rate of more than 60. The operating system also needs to be configured to use the exact refresh rate that is being tested — setting lower frame per second value than the current refresh rate will introduce graphical tearing and higher frame rates will become unusable, as GameMaker runtime will not execute its application loop in a higher frame-per-second rate than the refresh rate of the screen.

Following implementation assumes the intent of executing the `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) code exactly the same for every kind of a device, but executing the `Draw` and `Draw GUI` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) at the highest refresh rate available. If the refresh rate is higher than 60, an appropriate number of `Step` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) will be skipped, while all `Draw` and `Draw GUI` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) will execute with speed of the motion of graphics divided by the ratio of skipped `Step` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm). This will allow the screen to display more frames of motion in the same amount of real time. For this to work properly, the architecture of the project must keep a clear separation between logic of each [Instance](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instances.htm) in `Step` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) and their displayed result in `Draw` and `Draw GUI` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm).

In code from implementation above, perform the following:
1. Edit the code of `EventQueue`. In the `Create` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm), declare `cycle = 0;` and replace the code of its `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) with the following code:
<pre>
cycle += (1 / (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/max.htm">max</a>(60, <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/General_Game_Control/game_get_speed.htm">game_get_speed</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/General_Game_Control/game_get_speed.htm">gamespeed_fps</a>)) <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Expressions_And_Operators.htm">div</a> 60));

<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>if</b></a> (cycle >= 1)
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/repeat.htm"><b>repeat</b></a> (<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_size.htm">ds_priority_size</a>(step))
	{
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Local_Variables.htm"><b>var</b></a> _event = <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_delete_min.htm">ds_priority_delete_min</a>(step);
		<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (_event[0])
		{
			<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm"><b>with</b></a> (_event[0])
			{
				_event[1]();
			}
		}
	}
	
	cycle = 0;
}
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/If_Else_and_Conditional_Operators.htm"><b>else</b></a>
{
	<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/ds_priority_clear.htm">ds_priority_clear</a>(step);
}
</pre>
  Explanation:
* This code divides the execution of `Step` *Event Methods* into cycles. The `Step` *Event Methods* will be executed only during a completion of a cycle. Otherwise, their requests will be discarded by clearing the `step` [Priority Queue](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Data_Structures/DS_Priority_Queues/DS_Priority_Queues.htm).
* If the target number of frames per second is `60` or less, the `Step` *Event Methods* will always be executed. Otherwise, that `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) will be only a part of the cycle. The more time the target number of frames per second can be divided by `60`, the lesser part of a single cycle it makes.
2. Add <code><a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/General_Game_Control/game_get_speed.htm">game_set_speed</a>(<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Cameras_And_Display/display_get_frequency.htm">display_get_frequency</a>(), <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/General_Game_Control/game_get_speed.htm">gamespeed_fps</a>);</code> to any `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) in the project, such as the at the beginning of the `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) of `EventQueue`. This will update the target frame per second number to the highest value handled by the operating system.
3. Edit the `ExampleMovingInstance` constructor to declare <code>previousLocation = [instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/x.htm">x</a>, instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/y.htm">y</a>];</code> at the end of its `createEvent` and at the start of its `stepEvent`. Then, replace its `drawEvent` code with the following:
<pre>
<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Sprites_And_Tiles/draw_sprite.htm">draw_sprite</a>(instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/sprite_index.htm">sprite_index</a>, instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Sprites/Sprite_Instance_Variables/image_index.htm">image_index</a>,
	    <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/lerp.htm">lerp</a>(previousLocation[0], instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/x.htm">x</a>, EventQueue.cycle),
	    <a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Maths_And_Numbers/Number_Functions/lerp.htm">lerp</a>(previousLocation[1], instance.<a href="https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Instances/Instance_Variables/y.htm">y</a>, EventQueue.cycle));
</pre>

After launching the project, the movement of the example moving instance should appear smoother on displays with refresh rate of 120 and higher, as its movement is now interpolated during additional `Draw` [Events](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) to target location set during each `Step` [Event](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Object_Events.htm) executing at the end of the cycle. This is the simplest example of this concept.

# Afterword

This concludes the introduction to concepts of **GML Instantiable Constructors**.

An [importable project file](https://github.com/user-attachments/files/19126128/GML.Instantiable.Constructors.Minimal.Example.zip) is available. It contains minimal setup, examples and does not rely on dependencies.

A [repository](https://github.com/Mtax-Development/GML-Instantiable-Constructors) with an extended version of this framework is available, with its up to date [documentation](https://github.com/Mtax-Development/GML-Instantiable-Constructors/wiki). It will be updated periodically with new features, corrections and further *Blueprint Objects* and their *Instantiable Constructors*.
