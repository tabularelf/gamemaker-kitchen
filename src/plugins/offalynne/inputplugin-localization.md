---
title: Localization Input Plug-in
description: Keyboard layout localization for Input
link: https://github.com/offalynne/InputPlugin-Localization
date: 2025-10-08 14:26:00
parent: Input
tags:
  - Input
  - Localization
  - Input-plugin
authors:
  - offalynne
---
Keyboard layout localization for [Input for GameMaker 2024.8](https://github.com/offalynne/Input).

### API

```
InputLocalizeGetLocale() // Returns enum, user's keyboard locale

InputLocalizeBinding( // Returns a localized binding
  binding,            // Key bind
  [localeInput],      // Enum, source locale. INPUT_KEYBOARD_LOCALE.QWERTY, if undefined
  [localeOutput])     // Enum, destination locale. User's locale, if undefined

enum INPUT_KEYBOARD_LOCALE
  .QWERTY // English Latin key layout
  .AZERTY // Selective French key layout 
  .QWERTZ // Central European key layout  
```

### Example Usage

```
// Set localized key definitions
InputDefineVerb(INPUT_VERB.WALK_FORWARD, "forward", InputLocalizeBinding("W"), -gp_axislv);
InputDefineVerb(INPUT_VERB.STRAFE_LEFT,  "left",    InputLocalizeBinding("A"), -gp_axislh);
InputDefineVerb(INPUT_VERB.WALK_BACK,    "back",    InputLocalizeBinding("S"),  gp_axislv);
InputDefineVerb(INPUT_VERB.STRAFE_RIGHT, "right",   InputLocalizeBinding("D"),  gp_axislh);
```

***NB: Per limitations of GM Runner application, plug-in returns static OS region-default (locale) layout***

### **[Download (.yymps)](https://github.com/offalynne/InputPlugin-Localization/releases)**