---
title: Text Input Plug-in
description: Cross platform player text entry for Input
link: https://github.com/offalynne/InputPlugin-Text
date: 2025-05-14 14:26:00
parent: Input
tags:
  - Input
  - Text
  - Input-plugin
authors:
  - offalynne
---
Cross platform player text entry for [Input for GameMaker 2024.8](https://github.com/offalynne/Input)

### Supported Platforms

- Desktop native (Windows, MacOS, Linux)
- Mobile (Android, iOS, iPadOS, tvOS)
- Console (Xbox, PlayStation, Switch)
- Steam Deck

### Direct Functions

Direct functions return per-frame momentary keyboard input. Best used on desktop platforms as they do not expose a mobile or console onscreen keyboard UI.
```
InputTextApplyDelta(string) // Returns string. Apply last frame's keyboard input
InputTextGetCharsRemoved()  // Returns number, last frame's removed characters 
InputTextGetDelta()         // Returns string, last frame's added text
```

### Request Functions

A text request creates context for a prompt, defines a callback method for multi-modal text entry, and opens an onscreen keyboard if necessary. Requests are ideal for cross-platform text entry including mobile and console.
```
InputTextRequestStart( // Returns boolean, success status. Shows keyboard, starts request
  caption,             // String, onscreen prompt
  initialText,         // String, initial text
  maxLength,           // Number, maximum text length between 1 and 256
  callback,            // Method, called upon status change
  [keyboardType])      // Constant, mobile keyboard type

InputTextRequestStop() // Returns undefined. Stop last request

InputTextRequestGetString() // Returns string, text entered last request
InputTextRequestGetStatus() // Returns enum, status of last request

enum INPUT_TEXT_REQUEST_STATUS
  .NONE       // No requests made
  .WAITING    // Awaiting outcome
  .STOPPED    // Request stopped 
  .CANCELLED  // Player cancelled
  .CONFIRMED  // Player confirmed
```

### **[Download (.yymps)](https://github.com/offalynne/InputPlugin-Text/releases)**