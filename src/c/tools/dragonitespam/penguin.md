---
title: Penguin 
description: 3D Model Converter for GameMaker
link: https://dragonite.itch.io/penguin
date: 2024-03-11 03:24:00
tags:
  - 3D
  - model converter
  - lts
authors:
  - DragoniteSpam
---

Do you want to do batch operations on 3D objects for use in GameMaker (or for other purposes)? Here's a tool which does just that!

# Features
- Import 3D models: D3D / GMMOD (GameMaker), OBJ, FBX, DAE, GLTF/GLB,  3DS, PLY/PLYB, or STL
- Export 3D models: the same formats as above, or a raw vertex buffer for fast loading (use buffer_load in GameMaker), or a collection of vertex buffers that can be loaded with the provided import scripts
- Bulk operations: applying transformations, mirroring texture coordinates, rotating the Up axis, and a bunch of other thing
- Vertex formats: define vertex formats to export models as - in case your game uses a format besides the normal position/normal/texture/color
- Textures maps: load in textures for models
- Mesh normals: set flat normals or smooth normals (within a tolerance)
- Collision shapes: which can be exported alongside the visible models