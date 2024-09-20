---
title: How to make a proper mod loader, using Catspeak
description: Mod loader tutorial, using Catspeak
date: 2024-09-21 00:47:00
tags:
  - LTS
  - Modding
authors:
  - TabularElf
---

Making a mod system in a GameMaker game is a lot of work, especially late into development.
I've seen plenty of different mod implementations in GameMaker games, and as I'm making a whole game that is entirely moddable from the ground up, I wanted to tackle a tutorial for myself. 


<section>
  <h2>Chapters</h2>
  <ul>
    <li><a href="#CHAPTER_0">Chapter 0: Why a mod system is important</a></li>
    <li>Chapter 1: Setting up Catspeak</li>
  </ul>
</section>

## <a id="CHAPTER_0">Chapter 0: Why a mod system is important</a>
blah blah blah

```gml
function catspeak_load_script(_file, _modName = "") {
	if (global.catspeakIncludeMap[$ _filepathResult] != undefined) {
		return global.catspeakIncludeMap[$ _filepathResult];	
	}
	// Get name of file
	var _filename = filename_name(_filepath);
	var _ext = filename_ext(_filename);
	
	var _asg = undefined;
	var _buff = buffer_load(_filepath);
	if (!buffer_exists(buff)) {
		show_error($"File {_file} doesn't exist!", true);
		return;
	}
	try {
		var _str;
		if (buffer_get_size(_buff) == 0) {
			_str = "return undefined;"	
		} else {
			_str = buffer_read(_buff, buffer_text);
		}
		_asg = Catspeak.parseString(_str);	

		var _program = _program = Catspeak.compileGML(_asg);
		global.catspeakIncludeMap[$ _filepathResult] = _program;
		return _program;
	} catch(_ex) {
		_ex.longMessage += $"\nIn {_file}";
		throw _ex;
	} finally {
		buffer_delete(_buff);
	}
}

global.catspeakIncludeMap = {};
```