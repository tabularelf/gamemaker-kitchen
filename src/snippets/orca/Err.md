---
title: Err
description: Extensible, basic error class compatible with GM's Struct.Exception type
link: https://gist.github.com/thennothinghappened/7e3071e923c47154b6cbbd5e93d779da
date: 2025-05-02 11:42:00
tags:
  - oop
  - error
  - lts
authors:
  - orca
---

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
 * Generic Error type as analogue of GM's `Struct.Exception`.
 * 
 * @param {String} message The readable message for this error.
 * @param {Struct.Err|Struct.Exception|Undefined} [cause] The error which caused this one, if any.
 * @param {Array<String>|Undefined} [__stacktrace] The stacktrace of this error, 
 */
function Err(message, cause = undefined, __stacktrace = undefined) constructor {
	
	/**
	 * Array of characters considered whitespace when trimming the error
	 * message.
	 * 
	 * @ignore
	 */
	static __whitespace = ["\n"];
	
	if (!is_undefined(__stacktrace)) {
		
		// Assign the stacktrace we were given, as we must be assigning from an Exception.
		self.stacktrace = __stacktrace;
		
	} else {
		
		// Get the callstack minus the entry for us getting it.
		self.stacktrace = debug_get_callstack();
		array_delete(self.stacktrace, 0, 1);
		
	}
	
	/** The readable message for this error. */
	self.message = string_trim(message, __whitespace);
	
	/** The error that caused this one, if any. */
	self.cause = cause;
	
	/** The object this error occurred in. */
	self.object = event_object;
	
	/** The event type the error occurred during. */
	self.event = event_type;
	
	/** The sub-event type. */
	self.subEvent = event_number;
	
	/** The full error message. */
	self.longMessage = self.toString();
	
	/**
	 * Get a readable representation of this error.
	 * @returns {String}
	 */
	static toString = function() {
		
		if (variable_struct_exists(self, "longMessage")) {
			return self.longMessage;
		}
		
		var str = "Error";
		
		if (object_exists(self.object)) {
			str += " in object " + object_get_name(self.object);
		}
		
		str += ": " + self.message + "\n" +
			"  at " + string_join_ext("\n  at ", self.stacktrace);
		
		if (!is_undefined(self.cause)) {
			str += string("\nCause: {0}", self.cause);
		}
		
		return str;
		
	}
	
	/**
	 * Format this error as closely as reasonably possible to how GM currently
	 * displays errors.
	 * 
	 * @returns {String}
	 */
	static format = function() {
		
		static header = string_repeat("_", 43);
		static divider = string_repeat("#", 92);
		
		var objectName = object_exists(self.object)
			? object_get_name(self.object)
			: "<undefined>";
			
		var causeLine = (!is_undefined(self.cause)
		    ? "Cause: " + string(self.cause)                    + "\n"
		    : ""
		);
		
		return header                                           + "\n" +
		    divider                                             + "\n" +
		    "ERROR in"                                          + "\n" +
		    "action number 1"                                   + "\n" +
		    string("of {0} Event", self.__getEventName())       + "\n" +
		    string("for object {0}:", objectName)               + "\n" +
		                                                          "\n" +
		    self.message                                        + "\n" +
		    " at " + string_join_ext("\n at ", self.stacktrace) + "\n" +
		    causeLine                                           +
		    divider                                             + "\n";
		
	}
	
	/**
	 * Retrieve the name of the event this error occurred in.
	 * 
	 * @ignore
	 * @returns {String}
	 */
	static __getEventName = function() {
		switch (self.event) {
			case ev_create: switch (self.subEvent) {
				case ev_pre_create: return "Pre-Create";
				default: return "Create";
			}
			
			case ev_step: switch (self.subEvent) {
				case ev_step_begin: return "Begin Step";
				case ev_step_end: return "End Step";
				default: return "Step";
			}
			
			case ev_draw: switch (self.subEvent) {
				case ev_draw_begin: return "Begin Step";
				case ev_draw_end: return "End Draw";
				case ev_draw_pre: return "Pre-Draw";
				case ev_draw_post: return "Post-Draw";
				case ev_gui: return "Draw GUI";
				case ev_gui_begin: return "Begin Draw GUI";
				case ev_gui_end: return "End Draw GUI";
				default: return "Draw";
			}

			case ev_destroy: return "Destroy";
			case ev_cleanup: return "Clean Up";
			case ev_alarm: return string("Alarm {0}", self.subEvent);
		}
		
		return string("<unknown event {}:{}>", self.event, self.subEvent);
	}
	
}

// Setup the static struct.
gml_pragma("global", @'new Err("")');
```
