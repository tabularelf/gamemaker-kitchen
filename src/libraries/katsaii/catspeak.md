---
title: Catspeak
description: A cross-platform modding language for GameMaker games.
link: https://github.com/katsaii/catspeak-lang
date: 2024-04-29 13:41:00
logo: https://raw.githubusercontent.com/katsaii/catspeak-lang/main/catspeak-logo.svg
tags:
  - modding
  - debug
  - lts
authors:
  - Katsaii
---

Catspeak is the spiritual successor to the long dead `execute_string` function from GameMaker 8.1, but on overdrive.

Use the built-in Catspeak scripting language to expose **safe** and **sandboxed** modding APIs within GameMaker projects, or bootstrap your own domain-specific languages and development tools using the back-end code generation tools offered by Catspeak.

Compile performant scripts from plain-text...
```gml
// parse Catspeak code
var ir = Catspeak.parseString(@'
  let catspeak = "Catspeak"

  return "hello! from within " + catspeak
');

// compile Catspeak code into a callable GML function
var getMessage = Catspeak.compileGML(ir);

// call the Catspeak code just like you would any other GML function!
show_message(getMessage());
```
...without giving modders unrestricted access to your sensitive game code:
```gml
var ir = Catspeak.parseString(@'
  game_end(); -- heheheh, my mod will make your game close >:3
');

// calling `badMod` will throw an error instead
// of calling the `game_end` function
try {
  var badMod = Catspeak.compileGML(ir);
  badMod();
} catch (e) {
  show_message("a mod did something bad!");
}.
```