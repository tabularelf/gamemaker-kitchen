---
title: GMBLAKE3
link: https://gitlab.com/cam900/gmblake3
description: BLAKE3 wrapper for GameMaker
threadLink: https://discord.com/channels/724320164371497020/1408368555136778270
docs: ""
paid: false
date: 2025-11-21 09:43:33
tags:
  - hash
  - blake3
authors:
  - cam900
---

GMBLAKE3 is BLAKE3 cryptographic hash algorithm wrapper for GameMaker, known as fast, securer than GameMaker embedded MD5 and SHA1 hash algorithms. It's using the official C implementation of BLAKE3, see https://github.com/BLAKE3-team/BLAKE3 for more details. (licensed under CC0 1.0 or Apache 2.0 (dual) license)

Usage:
```gml
// Configurations
out_length = (1 to (2^64));
key = (64 hexadecimal character (32 bytes) of string for keyed, or any-length string for derive_key);
// Hashing buffer
hash = buffer_blake3(buffer, out_length);
hash = buffer_blake3_keyed(buffer, out_length, key);
hash = buffer_blake3_derive_key(buffer, out_length, key);
// Hashing string
hash = blake3_string("String", out_length);
hash = blake3_string_keyed("String", out_length, key);
hash = blake3_string_derive_key("String", out_length, key);
// Hashing file
hash = blake3_file("File.bin", out_length);
hash = blake3_file_keyed("File.bin", out_length, key);
hash = blake3_file_derive_key("File.bin", out_length, key);
// All of these function returns hexadecimal (out_length) byte hexadecimal strings.
```