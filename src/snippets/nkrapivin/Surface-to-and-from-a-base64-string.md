---
title: Surface to&from a base64 string
description: for those who do save thumbnails in a gamemaker game and have the unfortunate fate of having to do a console port.
link: https://gist.github.com/nkrapivin/1aa2707e57f1a62f7005e80bd033418c
date: 2024-05-31 21:36:00
tags:
  - surface
  - base64
  - lts
authors:
  - nkrapivin
---

for those who do save thumbnails in a gamemaker game and have the unfortunate fate of having to do a console port.

```gml
function niklog(msg) {
	show_debug_message(msg);
}

/// @param {Id.Surface} surf input surface
/// @returns {String|Undefined} base64 string or undefined on invalid arguments
function surface_to_string(surf) {
	if (is_undefined(surf)) {
		niklog("surface_to_string: expected a `surf` argument");
		return undefined;
	}
	
	if (!surface_exists(surf)) {
		// or ""? I'm not sure.
		niklog("surface_to_string: invalid `surf` argument: surface does not exist");
		return undefined;
	}
	
	// these cannot be 0.
	var surfw = surface_get_width(surf),
		surfh = surface_get_height(surf);
	var surfbuffer = buffer_create(
		// assume it's 8bpp+alpha
		8 + (surfw * surfh * 4),
		buffer_fixed,
		1
	);
	var surfbuffersize = buffer_get_size(surfbuffer);
	// make sure all the memory is preallocated and filled with 0's
	// for buffer_get_surface
	buffer_fill(surfbuffer, 0, buffer_u8, 0, surfbuffersize);
	// we know for sure neither of these can be 0
	buffer_write(surfbuffer, buffer_u32, surfw);
	buffer_write(surfbuffer, buffer_u32, surfh);
	buffer_get_surface(surfbuffer, surf, buffer_tell(surfbuffer));
	var surfzlibbed = buffer_compress(surfbuffer, 0, surfbuffersize);
	buffer_delete(surfbuffer);
	var surfstring = buffer_base64_encode(surfzlibbed, 0, buffer_get_size(surfzlibbed));
	buffer_delete(surfzlibbed);
	return surfstring;
}

/// @param {String} b64string base64 string to decode
/// @returns {Id.Surface} surface or -1 on error
function surface_from_string(b64string) {
	if (!is_string(b64string) || string_length(b64string) <= 0) {
		// throw an error here??
		niklog("surface_from_string: invalid `b64string` argument: invalid or empty string");
		return -1;
	}
	
	var surfzlibbed = buffer_base64_decode(b64string);
	if (surfzlibbed < 0) {
		// invalid input string?
		niklog("surface_from_string: invalid `b64string` argument: invalid base64 data");
		return -1;
	}
	
	var surfbuffer = buffer_decompress(surfzlibbed);
	buffer_delete(surfzlibbed);
	if (surfbuffer < 0) {
		// invalid compressed data?
		niklog("surface_from_string: invalid zlib data");
		return -1;
	}
	
	if (buffer_get_size(surfbuffer) < 4+4+4) {
		// a valid buffer must be at least 12 bytes long:
		// u32: width (4 bytes)
		// u32: height (4 bytes)
		// u32[]: pixels... (at least 4 bytes for 1 pixel)
		// 4 + 4 + 4 = 12 bytes required for a valid surface.
		buffer_delete(surfbuffer);
		niklog("surface_from_string: invalid decompressed data (too small)");
		return -1;
	}
	
	var surfw = buffer_read(surfbuffer, buffer_u32);
	var surfh = buffer_read(surfbuffer, buffer_u32);
	if (surfw * surfh <= 0) {
		// neither width nor height can be 0
		// probably an empty buffer?
		buffer_delete(surfbuffer);
		niklog("surface_from_string: invalid decompressed data (width or height are 0)");
		return -1;
	}
	var surf = surface_create(surfw, surfh);
	// make sure all pixels are zeroed out.
	surface_set_target(surf);
	draw_clear_alpha(c_black, 0);
	surface_reset_target();
	buffer_set_surface(surfbuffer, surf, buffer_tell(surfbuffer));
	buffer_delete(surfbuffer);
	return surf;
}
```