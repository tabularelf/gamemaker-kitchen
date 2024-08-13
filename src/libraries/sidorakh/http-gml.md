---
title: http.gml
description: A simple http wrapper for GameMaker Studio 2
link: https://github.com/Sidorakh/http.gml
date: 2024-06-14 21:42:00
tags:
  - http
  - wrapper
authors:
  - sidorakh
---

As soon as the function keyword and structs were announced for GameMaker 2.3, I wrote the first version of this library.
This is a wrapper around the http_request function that allows you to ignore the HTTP async event and instead use various callback functions instead.

Includes functions for automatic HTTP request body parsing, including applying a correct Content-Type header, a FormData constructor that can be used to build application/form-data HTTP requests, and hooks for adding HTTP response parsers.