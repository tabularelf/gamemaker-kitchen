---
title: gm-zstd
link: https://github.com/NordLandeW/gm-zstd
description: Simplified zstd/lz4 wrapper for GameMaker.
threadLink: https://discord.com/channels/724320164371497020/1387415008165761024
docs: ""
paid: false
date: 2025-06-25 12:51:54
tags:
  - zstd
  - lz4
authors:
  - NordLandeW
---
A very simplified zstd/lz4 wrapper for gamemaker.

Usage:
```gml
// Replace buffer_compress()
compressedBuffer = zstd_buffer_compress(buffer, size, compressionLevel);
compressedBuffer = lz4_buffer_compress(buffer, size);

// Replace buffer_decompress()
decompressedBuffer = zstd_buffer_decompress(buffer);
decompressedBuffer = lz4_buffer_decompress(buffer);
```

https://github.com/NordLandeW/gm-zstd