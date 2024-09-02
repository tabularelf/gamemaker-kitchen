---
title: CommandLineArgs
link: https://github.com/Grisgram/gml-commandline
description: GameMaker CommandLine Argument Analysis
threadLink: https://discord.com/channels/724320164371497020/1279780853039239219
docs: ""
paid: false
date: 2024-09-01 12:32:12
tags:
  - library
authors:
  - Grisgram
---
Here is a small library that helps analyzing the command line you received, when the game was started.

## No more looping through the arguments - query them _by name_ !
It takes you away from a `for...` loop and crawling through all the arguments in a straight-forward class, that supports _switches_, _options_ and _commands_ with some configuration options for the analysis of the command line.

Make sure to look in the wiki, which also includes sample code.

A little sneak preview, how simple and readable your startup code can be with this lib:
```gml
// Example 1: yourgame.exe --fullscreen
if (ARGS.has_option("fullscreen"))
    window_set_fullscreen(true);

// Example 2: yourgame.exe -w=1280 -h=720
if (ARGS.has_command("w") && ARGS.has_command("h")) {
    window_set_fullscreen(false);
    window_set_size(
        ARGS.get_command("w").value,
        ARGS.get_command("h").value
    );
}
```

https://github.com/Grisgram/gml-commandline

As always, if you find it useful, please ⭐ the repository, it helps greatly in increasing the reach and is a very kind way to say "thank you" to open source authors.

Cheers,
Gris