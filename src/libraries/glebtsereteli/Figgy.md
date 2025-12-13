---
title: Figgy
link: https://github.com/glebtsereteli/Figgy
description: About Centralized and persistent live configs for seamless game
  tuning and balancing in GameMaker.
threadLink: https://discord.com/channels/724320164371497020/1441253042417696829
docs: ""
paid: false
date: 2025-11-21 02:25:02
tags:
  - imgui
  - dear-imgui
  - configuration
  - balancing
  - tuning
authors:
  - glebtsereteli
---
# Figgy

<img width="1280" height="300" alt="banner" src="https://github.com/user-attachments/assets/9e31e7d0-c9d8-40fa-abb8-e15c1ce28479" />

Figgy is a pure GML [Free and Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software) lightweight GameMaker library - a centralized and persistent live configuration system for seamless game tuning and balancing.

* ℹ️ Download the `.yymps` local package from the [Releases](https://github.com/glebtsereteli/Figgy/releases) page.
* ℹ️ Refer to the [Documentation](https://glebtsereteli.github.io/Figgy/) for installation instructions, usage examples and full API reference.
* ℹ️ **GameMaker Version:** [v2024.14.1](https://releases.gamemaker.io/release-notes/2024/14_1) (the latest Monthly).
* ℹ️ **Platforms:** Windows, macOS and Linux are fully supported. GX.games supports everything but IO. Console & Mobile support is planned. HTML5 support is not planned.

<table style="width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 10px;">
  <tr>
    <td style="width: 50%;"><a href="https://github.com/user-attachments/assets/e4c219f0-9d7a-4e83-84ae-d09a5ce8b43b"><img src="https://github.com/user-attachments/assets/e4c219f0-9d7a-4e83-84ae-d09a5ce8b43b" style="width: 100%; display: block;"></a></td>
    <td style="width: 50%;"><a href="https://github.com/user-attachments/assets/a1b743a3-1482-4d4c-aa0b-c16484d15dce"><img src="https://github.com/user-attachments/assets/a1b743a3-1482-4d4c-aa0b-c16484d15dce" style="width: 100%; display: block;"></a></td>
  </tr>
  <tr>
    <td style="width: 50%;"><a href="https://github.com/user-attachments/assets/8727d8d1-1d30-402b-888d-3ca681e794db"><img src="https://github.com/user-attachments/assets/8727d8d1-1d30-402b-888d-3ca681e794db" style="width: 100%; display: block;"></a></td>
    <td style="width: 50%;"><a href="https://github.com/user-attachments/assets/dd164707-250b-457b-bf3b-13889a77b57a"><img src="https://github.com/user-attachments/assets/dd164707-250b-457b-bf3b-13889a77b57a" style="width: 100%; display: block;"></a></td>
  </tr>
</table>

## Why Use It?
Figgy eliminates the constant cycle of recompiling and searching through assets to adjust gameplay values. After defining your stats and parameters in Setup, Figgy automatically builds a [Debug Overlay](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Debugging/The_Debug_Overlay.htm) interface that lets you live-edit values while the game is running, access them in code, and save changes directly within your project's datafiles.

Whether you're a solo developer or part of a team, working on a big project or a weekend-long game jam, Figgy streamlines balancing and tuning, keeping iteration fast and effortless. It also gives your non-programmer team members full design control without touching a single line of code.

# Features
⚙️ **Automatic Live Interface**. Figgy creates [debug views](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Debugging/The_Debug_Overlay.htm#:~:text=using%C2%A0dbg_view.-,Views,-This%20menu%20lists) for your configs automatically, freeing you from dreaded UI coding of any kind and allowing for live editing.

🗂️ **Flexible Data Structure**. Organize your configs using a robust struct-based tree-like JSON layout with [Scope Widgets](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#scope-widgets), including [Windows](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#window), [Sections](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#section), and [Groups](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#group).

🎛️ **Wide Data Type Coverage**. Built on GameMaker's cross-platform Debug Overlay, Figgy provides many Value Widgets for all commonly used data types: [Integers](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#int)​, [Floats](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#float)​, [Reals](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#real)​, [Booleans](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#bool), [Strings](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#string), [Colors](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#color), and [Anys](https://glebtsereteli.github.io/Figgy/pages/api/figgy/setup#any)​.

💾 **Persistent Project Storage**. Keep your configs inside your GitHub repo with Figgy's automatic (and optionally [obfuscated](https://glebtsereteli.github.io/Figgy/pages/home/persistence#obfuscate)) datafiles [saving & loading](https://glebtsereteli.github.io/Figgy/pages/home/persistence) support that tracks variables differing from default values (or the whole config, if [specified](https://glebtsereteli.github.io/Figgy/pages/api/config#figgy-file-delta)).

🧠 **Centralized Configuration**. Keep all gameplay values in one place and read them from the config struct - no more scattered Create-event variables or magic numbers.

👨‍🎨 **Code-Free Design**. Allow your designers to tweak and balance the game live through the [Interface](https://glebtsereteli.github.io/Figgy/pages/home/interface), without ever having to touch code.

# Credits
* Created and maintained by [Gleb Tsereteli](https://linktr.ee/GlebTsereteli).
* Wonderful promo art by the very talented [neerikiffu](https://bsky.app/profile/neerikiffu.bsky.social)!
* Initially created as a submission for [TabularElf](https://tabelf.link/)'s [CookBook Jam #5](https://itch.io/jam/cookbook-jam-5).
* Thanks to [Gutpunch Studios](https://gutpunchstudios.com/) for the original "knobs and levers" design philosophy and inspiration.
* Thanks to [Omar Cornut](https://www.miracleworld.net/) for making the infinitely useful [Dear ImGui](https://github.com/ocornut/imgui) and the GameMaker team for implementing it in the [Debug Overlay](https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Debugging/The_Debug_Overlay.htm).
* Thanks to [Thomas Threlfo](https://bsky.app/profile/tthrelfo.bsky.social) and [Joe Baxter-Webb](https://indiegameclinic.com/) for initial testing.
* Demo project templates by [GameMaker](https://gamemaker.io/).

# Games Using Figgy
* [DirtWorld](https://krankenhaus-uk.itch.io/dirtworld) by [Joe Baxter-Webb](https://bsky.app/profile/indiegameclinic.bsky.social) (AKA [Indie Game Clinic](https://indiegameclinic.com/) and [KRANKENHAUS](https://krankenhaus-uk.itch.io/)).
* [Thomas Threlfo](https://bsky.app/profile/tthrelfo.bsky.social)'s tobu.
* And more to come :)