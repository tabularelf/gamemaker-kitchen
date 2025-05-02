---
title: FSM
description: Basic Finite State Machine
link: https://gist.github.com/thennothinghappened/20d61697425e7a923c415f1371b4bf00
date: 2025-05-02 12:39:00
tags:
  - state machine
  - lts
  - oop
  - finite state machine
authors:
  - orca
---

Simple implementation of a finite state machine in GML.

The design of this state machine just defines states as structs with identifiers. You specify the
initial state's name, define states with `fsm.state(name: Enum|String, state: Struct)`, and call
`fsm.run(name: Enum|String)` to execute the given event for the current state.

State events can choose to return a name of a new state, and the state machine will leave the
current state, and enter that new state.

If specific logic is required when transitioning from some state `A` to some state `B`, but not for
state `A` to `C`, you can choose to define a state perhaps called `A to B`, for instance, which only
specifies an `enter` event, and after running the relevant logic, returns `B`'s name to immediately
jump.

For complex composition of interconnecting logic, you can always define more than one state machine.

If you're looking for a larger, more featureful state machine with features such as inheritance,
state history tracking, and dedicated support for state-specific transition logic, consider checking
out [SnowState](https://github.com/sohomsahaun/SnowState) by
[Sahaun](https://github.com/sohomsahaun)!

## Examples

<details>
<summary>Custom state transitions</summary>

```gml
enum MyState {
	A,
	B,
	C,
	FromAToB
};

self.fsm = new FSM(MyState.A);

self.fsm.state(MyState.A, {
	// ...
	step: function(timeInState) {
		if (timeInState > 10) {
			return MyState.FromAToB;
		}
	}
	// ...
});

self.fsm.state(MyState.B, {
	// ...
});

self.fsm.state(MyState.FromAToB, {
	enter: function() {
		// <Some special logic for this here>
		return MyState.B;
	}
});
```
</details>

<details>
<summary>Real-world usage</summary>

Below is an abridged excerpt from [gml-simpledraw](https://github.com/thennothinghappened/gml-simpledraw/blob/main/objects/oSimpleDraw/Create_0.gml),
which uses this FSM class.

```gml
fsm = new FSM("none");

fsm.state("none", {
	
	/**
	 * @param {Real} duration How long we've been in this state.
	 * @returns {String|undefined}
	 */
	step: function(duration) {
		
		if (mouse_check_button(mb_left)) {
			return "toolStroke";
		}
		
		if (oCameraCtrl.fsm.run("step") != "none") {
			return "cameraMove";
		}
		
	},

	/**
	 * Draw the tool's path as it is now.
	 * @param {Real} duration How long we've been in this state.
	 */
	draw: function(duration) {
		tool.draw(oCameraCtrl.camera.fromScreen(mouse.pos[X], mouse.pos[Y]));
	}
	
});

fsm.state("cameraMove", {
	step: function() {
		if (oCameraCtrl.fsm.run("step") == "none") {
			return "none";
		}
	}
});

fsm.state("toolStroke", {
	
	enter: function() {
		ts.colour = make_color_hsv(irandom(255), 255, 255);
		tool.beginStroke(oCameraCtrl.camera.fromScreen(mouse.pos[X], mouse.pos[Y]));
	},
	
	/**
	 * @param {Real} duration How long we've been in this state.
	 */
	step: function(duration) {
		
		if (!mouse_check_button(mb_left)) {
			return "none";
		}
		
		if (mouse.moved) {
			tool.updateStroke(oCameraCtrl.camera.fromScreen(mouse.pos[X], mouse.pos[Y]));
		}

	},
	
	/**
	 * Draw the tool's path as it is now.
	 * @param {Real} duration How long we've been in this state.
	 */
	draw: function(duration) {
		tool.draw(oCameraCtrl.camera.fromScreen(mouse.pos[X], mouse.pos[Y]));
	},
	
	/**
	 * Complete the stroke.
	 */
	leave: function() {
		tool.endStroke();
	}

});
```
</details>

## Code

```gml
/*
MIT License

Copyright (c) 2025 orca / thennothinghappened

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * An object which can exist in one or more defined states, and move between
 * those states, executing logic specific to each state.
 * 
 * States can be referred to by either strings, or enum members, depending on
 * which is preferred.
 * 
 * @param {String|Real} initialStateName Name of the state to execute first.
 */
function FSM(initialStateName) constructor {
	
	/**
	 * @ignore
	 */
	self.states = {};
	self.currentStateName = initialStateName;
	
	/**
	 * How long the current state has been running for, in frames.
	 * 
	 * @type {Real}
	 * @ignore
	 */
	self.timeInState = 0;
	
	/**
	 * Define a state with a given name. If this state is the specified initial state, the `enter`
	 * event for this state is immediately executed.
	 * 
	 * An `enter` event may return the name of another state. This is useful in such a case to define
	 * a "transition" between states, where an intermediate state only defines an `enter` method, which
	 * produces any necessary transitional side effects, and this method returns the name of the desired
	 * "end" state.
	 * 
	 * The `leave` event is passed the name of the next target state, so it may apply any relevant logic.
	 * This is an alternative option to transitions, where it makes sense to keep logic contained to the
	 * state itself.
	 * 
	 * ### Exceptions
	 * 
	 * Throws if the name is taken.
	 * 
	 * @param {String|Real} name
	 * @param {Struct} struct
	 */
	static state = function(name, state) {
		
		if (variable_struct_exists(self.states, name)) {
			throw new Err(string("State name `{0}` is taken", name));
		}
		
		// Bind state methods to the caller, instead of the struct.
		var eventNames = variable_struct_get_names(state);
		
		for (var i = 0; i < array_length(eventNames); i ++) {
			var key = eventNames[i];
			state[$ key] = method(other, state[$ key]);
		}
		
		if (name == self.currentStateName) {
			var enter = state[$ "enter"];
			
			if (!is_undefined(enter)) {
				enter();
			}
		}
		
		self.states[$ name] = state;
		
	};
	
	/**
	 * Run the event of the given name, for the current state.
	 * 
	 * If the event executed has the name `step`, `event`, or `tick` - or any others you may wish to
	 * add to this list, it will increment the event's duration every time it is executed.
	 * 
	 * @param {String|Real} name
	 * @returns {String}
	 */
	static run = function(name) {
		
		var currentState = self.states[$ self.currentStateName];
		var event = currentState[$ name];
		
		if (is_undefined(event)) {
			return self.currentStateName;
		}
		
		var newStateName = event(self.timeInState);

		if (name == "step" || name == "tick" || name == "update") {
			self.timeInState ++;
		}
		
		if (is_undefined(newStateName)) {
			return self.currentStateName;
		}
		
		return self.change(newStateName);
		
	};
	
	/**
	 * Change to a new state.
	 * 
	 * ### Exceptions
	 * 
	 * Throws if the new state does not exist.
	 * 
	 * @param {String|Real} newStateName
	 */
	static change = function(newStateName) {
		
		if (newStateName == self.currentStateName) {
			return self.currentStateName;
		}
		
		if (!variable_struct_exists(self.states, newStateName)) {
			throw new Err(string("Cannot change to non-existent state `{0}`", newStateName));
		}
		
		var currentState = self.states[$ self.currentStateName];
		
		self.currentStateName = newStateName;
		self.timeInState = 0;
		
		var leave = currentState[$ "leave"];
		
		if (!is_undefined(leave)) {
			leave(newStateName);
		}
		
		var newState = self.states[$ self.currentStateName];
		var enter = newState[$ "enter"];
		
		if (!is_undefined(enter)) {

			var potentialNewStateName = enter();

			if (potentialNewStateName != undefined) {
				return self.change(potentialNewStateName);
			}

		}
		
		return newStateName;
		
	}
	
}
```
