---
title: string_split_by_width()
description: get string wrapped same as for draw_text_ext()
link: https://gist.github.com/tinkerer-red/c67860e767e7b422aa9dd54ba6e5f645
date: 2024-06-14 21:47:00
tags:
  - string
  - lts
authors:
  - c-red
---

```gml
function string_split_by_width(_str, _line_width, _font=draw_get_font()) {
	
	if (_str == undefined) return;
	if (_line_width < 0) _line_width = 10000000; 	// means nothing will "wrap"
	
	var _prev_font = draw_get_font();
	draw_set_font(_font);
	
	var _whitespace = " ";
	var _newline = chr(0x0a); //  \n
	var _newline2 = chr(0x0d); //  \r
	
	var _arr = [];
	var _arr_index = 0;
	
  // put newlines in
	var _length = string_length(_str);
	
	// Allocate new space
	var _new_str = _str;
	
	var lastChar = string_char_at(_new_str, 0);
	var _start = 0;
	var _end = 0;
	while (_start < _length)
	{
		var total = 0;
		
		// If width < 0 (i.e. no wrapping required), then we DON'T strip spaces from the start... we just copy it!  (sounds wrong.. but its what they do...)
		if (_line_width == 10000000)
		{
		    while (_end < _length && string_char_at(_new_str, _end) != _newline && string_char_at(_new_str, _end) != _newline2)
				{
		        _end++;
		        if (_end < _length) lastChar = string_char_at(_new_str, _end); else lastChar = chr(0x0);
		    }
		    var c;
		    if (_end < _length) c = string_char_at(_new_str, _end); else c = String.fromCharCode(0x0);
		    if ((_newline == lastChar) && (_newline2 == string_char_at(_new_str, _end))) { _end++; continue; } // ignore, we've already split the line on #10
		    if ((_newline2 == lastChar) && (_newline == string_char_at(_new_str, _end))) { _end++; continue; } // ignore, we've already split the line on #13
				
		    lastChar = string_char_at(_new_str, _end);
				_arr[_arr_index++] = string_copy(_new_str, _start, _end-_start); 	// add into our list...
		}
		else
		{
			// Skip leading whitespace
			while (_end < _length && total < _line_width)
			{
				c = string_char_at(_new_str, _end);
				if (string_char_at(_new_str, _end) != _whitespace) break;
				total += string_width(c);
				_end++;
			}
			
			// Loop through string and get the number of chars that will fit in the line.
			while (_end < _length && total < _line_width)
			{
				c = string_char_at(_new_str, _end);
				if (c == _newline) break; 				// if we hit a newline, then "break" here...
				total += string_width(c); 		// add on width of character
				_end++;
			}
			// If we shot past the end, then move back a bit until we fit.
			if (total > _line_width)
			{
				_end--;
				total -= string_width(string_char_at(_new_str, _end)); 			// add on width of character
			}
			
			// END of line
			if (string_char_at(_new_str, _end) == _newline)
			{
				//_new_str[_end] = 0x00;
				_arr[_arr_index++] = string_copy(_new_str, _start, _end-_start);
			} else
			{
				// NOT a new line, but we didn't move on... fatal error. Probably a single char doesn't even fit!
				if (_end == _start)
				{
					draw_set_font(_prev_font);
					return _arr;
				}


				// If we don't END on a "space", OR if the next character isn't a space AS WELL. 
				// then backtrack to the start of the last "word"
				if (_end != _length)
				{
					if ((string_char_at(_new_str, _end) != _whitespace) || (string_char_at(_new_str, _end) != _whitespace && string_char_at(_new_str, _end + 1) != _whitespace))
					{
						var e = _end;
						while (_end > _start)
						{
							if (string_char_at(_new_str, --e) == _whitespace) break; 				// FOUND start of word
						}

						if(e!=_start)
						{
							_end = e;
						}
						else {
							while(string_char_at(_new_str, _end)!=_whitespace)
								_end++;
						}

					}
				}
				var __end = _end;
				if (__end > _start)
				{
					while (string_char_at(_new_str, __end - 1) == _whitespace && __end>0)
					{
						__end--;
					}
				} 
			//	else if (_end == _start) // if we're back to the START of the string... look for the next space - or string end.
			//	{
			//		while (_new_str[_end] != _whitespace && _end < _length)
			//		{
			//			_end++;
			//		}
			//	}
			
				if(__end!=_start)
					_arr[_arr_index++] = string_copy(_new_str, _start, __end-_start);
			}
		}
		_start = ++_end;
	}
	
	
	draw_set_font(_prev_font);
	retur
```