---
title: current_step
description: Accurate frame counter for GameMaker
link: https://gist.github.com/tabularelf/a54f338b1cc82f99e7a35cf0ad6f18cb
date: 2024-06-14 23:20:00
tags:
  - frame counter
  - lts
authors:
  - TabularElf
---

```gml
/*
	Blog post: https://tabularelf.com/proper-frame-counter/
	Note:
	This code was created by TabularElf (https://tabelf.link/) for non-commercial and commercial purposes.
	While this snippet of code is free to use for both non-commercial and commercial purposes,
	I would really appreciate it if you could include credits to me along with my links site in any given release!
	Thank you!
	
	The purpose of current_step is to check the current frame count since the beginning of the game.
	For the sole purpose of either allowing us to make a very simple alarm, for debugging purposes,
	or in any given application where relying on the exact frame matters, without any interference.
	Note: The returned result will start from 0 at the very beginning of the game.
	Intended use case: 
	if ((current_step % 3) == 0) {
		// Execute every 3 frames
	}
*/
/// @ignore
function __get_current_step() {
	gml_pragma("forceinline");
	// Initialize our static variable
	// Creates an anonymous method and runs it immediately, returning a struct.
	static _inst = (function() {
		var _inst = {};
		_inst.ts = time_source_create(time_source_global, 1, time_source_units_frames, method(_inst, function() {
			if (executedInBeginStep) {
				--currentStep;
				executedInBeginStep = false;
			}
			++currentStep;
        }), [], -1);
		time_source_start(_inst.ts);
		_inst.currentStep = -1;
		_inst.executedInBeginStep = false;
		return _inst;
	})();
	
	// Check if we're in the begin step event
	if ((event_type == ev_step) && (event_number == ev_step_begin) && 
	(!_inst.executedInBeginStep)) {
		inst.executedInBeginStep = true;    
		++_inst.currentStep;
	}
	
	
	// Check if this is our frame counter is below 0, aka the very first frame.
	if (_inst.currentStep < 0) {
		return 0;   
	}
	
	return _inst.currentStep;
}
__get_current_step(); // We call this once at the start

#macro current_step (__get_current_step())
```