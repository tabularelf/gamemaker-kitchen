---
title: Scunthorpe
link: https://github.com/zntm/scunthorpe
description: A simple lightweight, customizable profanity filter built for GameMaker.
threadLink: https://discord.com/channels/724320164371497020/1391066724832379120
docs: ""
paid: false
date: 2025-07-05 14:42:31
tags:
  - scunthorpe
authors:
  - zntm
---
Scunthorpe is a lightweight, customizable profanity filter built for GameMaker.
It was created out of the need for a filter that could handle common leetspeak while still being clean, efficient, and easy to drop into any project.

## 🛠️ Features
### -  🔤 Regular Profanity Detection
    Filters profanity only when the word appears on its own (e.g., ass in "an ass", but not "class" or "assassin").
### -  🔥 Extreme Profanity Detection
    Filters profanity no matter where it is in the string (e.g., fuck) which can be used to filter out slurs.
### - 🧩 Pattern-Based Matching
    Detects basic character substitutions like:
    - `|<` → `K`
    - `|)` → `D`
    - `@` → `A`
    - `$` → `S`
    - `7` → `T`

## ✏️ Example Usage

```gml
// Initialize filter settings using the files in the directory "scunthorpe/en"
// NOTE: Censor symbol used: `*`
init_scunthorpe("scunthorpe/en");

// Filter string using scunthorpe
var _string = "you dumb @ss";
var _string_scunthorpe = string_scunthorpe(_string);

show_debug_message(_string_scunthorpe); // → "you dumb ***"
```

## 📝 Quick Notes
- The original profanity list has been cleaned up by removing redundant variations and rare/uncommon terms, and expanded to include more modern or recently used terms.
- It can't figure out the meaning of the words, meaning this can't figure out if a message is sexual, hateful, violent, etc. 
- This is not a perfect or highly optimized solution—it was made in my free time for a personal project when I couldn’t find one that fit my needs.

## 💝 Acknowledgements
- [google-profanity-words](<https://github.com/coffee-and-fun/google-profanity-words>)

    *NOTE: Many of the words have been modified, removed, or grouped based on frequency and relevance.*

- [Scunthorpe](<https://en.wikipedia.org/wiki/Scunthorpe>)

https://github.com/zntm/scunthorpe