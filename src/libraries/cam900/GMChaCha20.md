---
title: GMBLAKE3
link: https://gitlab.com/cam900/gmchacha20
description: ChaCha20 Stream cipher algorithm extension for GameMaker
threadLink: https://discord.com/channels/724320164371497020/1408368555136778270
docs: ""
paid: false
date: 2025-11-21 09:47:33
tags:
  - Crypto
  - ChaCha20
authors:
  - cam900
---

GMChaCha20 is ChaCha20 Stream cipher algorithm extension for GameMaker, known as faster than AES block cipher algorithm without hardware acceleration. It's support original variant (64 bit counter and 64 bit nonce), IETF variant (32 bit counter, 96 bit nonce), XChaCha20 variant (64 bit counter and 192 bit nonce).
Original library is from https://github.com/Ginurx/chacha20-c. (licensed under Unlicense)

Usage:
```gml
// Configurations
src = (source buffer);
dst = (destination buffer);
size = (size for (en/de)crypt);
key = (64 hexadecimal character (32 bytes) of string);
nonce = (16/24/48 hexadecimal character (8/12/24 bytes) of string);
ctr = (32/64 bit counter)

// Initialize
(x)chacha20(_orig)_ctx_init(key, nonce, ctr);

// Update
(x)chacha20(_orig)_ctx_xor(src, dst, size);

// One-shot functions, return (en/de)crypted buffer
enc = (x)chacha20(_orig)_buffer_crypt(src, key, nonce, ctr);
```