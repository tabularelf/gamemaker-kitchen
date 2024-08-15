---
title: git-scripts for Windows
link: https://github.com/coldrockgames/git-scripts
description: git-scripts that make your life easier
threadLink: https://discord.com/channels/724320164371497020/1273682051995799582
docs: ""
paid: false
date: 2024-08-15 16:37:45
tags:
  - tool
  - automation
  - scripting
authors:
  - coldrock.games / grisgram
---
Hey,

we decided to make our git scripts public together with the command line tools we use for batch automation.

Here's a group of scripts, together with a cheat sheet for cloning, pulling, pushing, branching, merging, tagging and all other thinkable git operations, even submodules (repositories in repositories) are supported, all with a clean and consistent interface.

### A little warning:
### I am not sure, if they are good for users at a very basic skill level with git, you should at least have an idea, what you're doing!

There's also a size measure script (`sizeof`) which tells you the _real_ size of the repository, including its history tracks and a very powerful `status` script which can scan an entire folder and multiple repos in one go. `pull` and `push` in addition support `pull *` and `push *` shortcut to update or push all repositories with a single command, which is especially important when you have lots of repositories under your control and you are working on different machines. Just start `pull *` to update them all on your second computer.

it contains an installer script, which will guide you through the setup 

**NO CHANGES ARE MADE TO YOUR SYSTEM CONFIG**
It all runs in the prompt shell created by the installer, it's like the _Visual Studio Developer Command Prompt_, which you know when you are also developing in the .NET world.

We use the scripts with great success and they speed up all our git world. No one here uses any gui client anymore, except Tortoise Git to resolve merge conflicts.

Feel free to open issues or question in the discussions, especially for the tools, where `mgrep` to find things in files, and `frep` are clearly the stars of the show, which can help you automate things in a great way!

Have fun and please, don't hesitate to ask questions!

https://github.com/coldrockgames/git-scripts