---
title: Orthographic projection matrix using LTRB/near/far bounds
date: 2024-03-11 03:21:00
tags:
  - orthographic 
  - projection
  - lts
authors:
  - Juju Adams
---

```gml
/// Returns an array that contains the row-major orthographic projection matrix for the given
/// parameters. This is implemented in a way that is consistent with the native GameMaker function.
/// 
/// Follows the DirectX 9 D3D implementation of d3dxmatrixorthooffcenterlh:
/// https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dxmatrixorthooffcenterlh
/// 
/// @param left
/// @param top
/// @param right
/// @param bottom
/// @param near
/// @param far

function matrix_build_projection_ortho_ext(_left, _top, _right, _bottom, _near, _far)
{
    return [2 / (_right - _left), 0, 0, 0,
            0, 2 / (_top - _bottom), 0, 0,
            0, 0, 1 / (_far - _near), 0,
            (_right + _left) / (_left - _right), (_bottom + _top) / (_bottom - _top), _near / (_near - _far), 1]
}
```