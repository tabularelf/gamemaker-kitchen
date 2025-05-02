---
title: EventEmitter
description: Basic Event Emitter for GameMaker
link: https://gist.github.com/thennothinghappened/1bfd7215e9d72fb790806887cf547b85
date: 2025-05-02 11:25:00
tags:
  - oop
  - lts
authors:
  - orca
---

```gml
/**
 * Whether to enable debug asserts on event emitters to prevent passing invalid event names to event
 * emitters.
 * 
 * In effect, this option just provides clearer error messages.
 */
#macro EVENT_EMITTER_DEBUG_ASSERTIONS true

/**
 * Something that can emit events that can be subscribed to by one or more listeners.
 * 
 * ### Usage
 * Events can be defined in two ways:
 * 
 * #### 1. Strings
 * ```gml
 * /// Events emitted by this object.
 * /// 
 * /// #### `start`: `() -> Undefined`
 * /// Emitted upon starting some operation.
 * /// 
 * /// #### `stop`: `(stopType: Enum.StopType) -> Undefined`
 * /// Emitted upon stopping some operation. Specifies the way in which the operation stopped.
 * self.events = new EventEmitter("start", "stop");
 * ```
 * 
 * This style matches the style commonly used in JavaScript for event emitters, and has the benefit
 * of not polluting the global namespace with an enum for every event emitter type in the project.
 * 
 * #### 2. Enums
 * ```gml
 * /// Event types emitted by this object.
 * enum MyEvent {
 *     /// Emitted upon starting some operation.
 *     /// `() -> Undefined`
 *     Start,
 * 
 *     /// Emitted upon stopping some operation. Specifies the way in which the operation stopped.
 *     /// `(stopType: Enum.StopType) -> Undefined`
 *     Stop
 * };
 * 
 * self.events = new EventEmitter(MyEvent.Start, MyEvent.Stop);
 * ```
 *
 * This style has benefits with autocompletion, and moves spelling mistakes to compile-time errors,
 * rather than crashing at runtime. However, it comes with the drawback of namespace pollution.
 * 
 * @param {String|Real} ... Names of the events emitted by this emitter.
 */
function EventEmitter() constructor {
	
	self.listeners = {};
	self.oneTimeListeners = {};
	
	for (var i = 0; i < argument_count; i ++) {
		self.listeners[$ argument[i]] = [];
		self.oneTimeListeners[$ argument[i]] = [];
	}
	
	/**
	 * Start listening to the given event.
	 * 
	 * @param {String|Real} event The event to listen to.
	 * @param {Function} listener The subscribing callback.
	 */
	static on = function(event, listener) {
		
		var eventListeners = self.listeners[$ event];
		
		if (EVENT_EMITTER_DEBUG_ASSERTIONS && is_undefined(eventListeners)) {
			throw new Err(string("Debug Assertion: Cannot subscribe to non-existent event `{0}`", event));
		}
		
		array_push(eventListeners, listener);
		
	};
	
	/**
	 * Listen to a single emission of a given event.
	 * 
	 * @param {String|Real} event The event to listen to.
	 * @param {Function} listener The subscribing callback.
	 */
	static once = function(event, listener) {
		
		self.on(event, listener);
		
		var oneTimeListens = self.oneTimeListeners[$ event];
		array_push(oneTimeListens, listener);
		
	};
	
	/**
	 * Stop listening to the given event.
	 * 
	 * @param {String|Real} event The event to stop listening to.
	 * @param {Function} listener The subscribing callback.
	 * @returns {Bool} Whether the listener was removed.
	 */
	static off = function(event, listener) {
		
		var eventListeners = self.listeners[$ event];
		var oneTimeListens = self.oneTimeListeners[$ event];
		
		if (EVENT_EMITTER_DEBUG_ASSERTIONS && is_undefined(eventListeners)) {
			throw new Err(string("Debug Assertion: Cannot unsubscribe from non-existent event `{0}`", event));
		}
		
		var index = self.__arrayGetIndex(eventListeners, listener);
		
		if (index < 0) {
			return false;
		}
		
		var oneTimeIndex = self.__arrayGetIndex(eventListeners, listener);
		
		if (oneTimeIndex >= 0) {
			array_delete(oneTimeListens, oneTimeIndex, 1);
		}
		
		array_delete(eventListeners, index, 1);
		return true;
		
	};
	
	/**
	 * Emit the given event with the given arguments.
	 * 
	 * @param {String|Real} event The event to emit.
	 * @param {Any} ... Data to be emitted with the event.
	 */
	static emit = function(event) {
		
		var eventListeners = self.listeners[$ event];
		var oneTimeListens = self.oneTimeListeners[$ event];
		
		if (EVENT_EMITTER_DEBUG_ASSERTIONS && is_undefined(eventListeners)) {
			throw new Err(string("Debug Assertion: Cannot emit non-existent event `{0}`", event));
		}
		
		var listenersToRemove = [];
		
		if (argument_count > 2) {
			
			var data = array_create(argument_count - 1);
		
			for (var i = 1; i < argument_count; i ++) {
				data[i - 1] = argument[i];
			}
			
			var i = 0;
			
			repeat (array_length(eventListeners)) {
				var listener = eventListeners[i];
				
				if (is_method(listener)) {
					method_call(listener, data);
				} else {
					script_execute_ext(listener, data);
				}
				
				var oneTimeIndex = self.__arrayGetIndex(oneTimeListens, listener);
				if (oneTimeIndex >= 0) {
					array_push(listenersToRemove, listener);
					array_delete(oneTimeListens, oneTimeIndex, 1);
				}
				
				i ++;
			}
			
		} else {
			
			var data = argument[1];
			var i = 0;
			
			repeat (array_length(eventListeners)) {
				var listener = eventListeners[i];
				listener(data);
				
				var oneTimeIndex = self.__arrayGetIndex(oneTimeListens, listener);
				if (oneTimeIndex >= 0) {
					array_push(listenersToRemove, listener);
					array_delete(oneTimeListens, oneTimeIndex, 1);
				}
				
				i ++;
			}
			
		}
		
		var i = 0;
		repeat (array_length(listenersToRemove)) {
			var listenerIndex = self.__arrayGetIndex(eventListeners, listenersToRemove[i]);
			array_delete(eventListeners, listenerIndex, 1);
			
			show_debug_message(string("removing listener {0}", listenersToRemove[i]));
			i ++;
		}
		
	};
	
	/**
	 * Polyfill for `array_get_index` on LTS.
	 * 
	 * @ignore
	 * @param {Array} array
	 * @param {Any} value
	 * @param {Undefined} [noop1]
	 * @param {Undefined} [noop2]
	 */
	static __arrayGetIndex = (string_starts_with(GM_runtime_version, "2022")
		? function(array, value, noop1, noop2) {
			var i = 0;
						
			repeat (array_length(array)) {
				if (array[i] == value) {
					return i;
				}
				
				i ++;
			}
			
			return -1;
		}
		: array_get_index
	);
	
}
```
