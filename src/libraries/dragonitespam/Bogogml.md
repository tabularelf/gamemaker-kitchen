---
title: BogoGML - Bogosort in GameMaker
description: UI in GameMaker
link: https://dragonite.itch.io/bogosort-for-gamemaker/
date: 2024-07-05 02:03:00
tags:
  - sorting
  - joke
  - please-dont-do-this
authors:
  - DragoniteSpam
---

### Requires GameMaker Studio 2023.1 or later.
Did you ever look GameMaker's built-in ds_list_sort and say to yourself "that function is just too damn fast?" Have you ever wished that your game's performance could be measured in frames per decade, rather than frames per second? Or maybe you've pondered a solution to a problem that was so cosmically awful that you thought there was no way anybody would actually be stupid enough to do it, and that being the first to try something so profoundly stupid might just be how you want to make your mark on the world?

Anyway, I implemented Bogosort in GameMaker. You'd think I'd have more important things to do with my time, but alas.

Versions for both arrays and ds_lists are included.

### Performance
The time complexity of Bogosort is (n - 1)n!, which computer scientists would formally classify as "crying for help," and in practice that is what we see. I tested this with ten lists of ten elements, which took about 90 seconds to complete on the VM, as well as ten arrays of ten elements, which came in slightly faster at about 65 seconds. After that I took pity on my 7th-gen Intel and decided against testing on the YYC. In theory the YYC should perform better. Note that in this sense "better" is meant in the same way as getting in a head-on collision with a cement mixer cruising down the highway is "better" than falling into a black hole while getting scarfed down by a Megalodon while both of you are on fire as, despite your perception of the universe speeding into the future around you due to the relativistic effects of gravitational time dilation, you still never see your sorting algorithm run to completion.

In other words, waiting for the test to complete took more time than actually writing the code.

Sorting arrays of size 11 will take significantly longer. Sorting arrays of size 16 should finish when your grandkids start hitting their mid-life crises. Sorting arrays of size 25 will produce a result at some time after the last red dwarf stars have burned out. Sorting arrays of size 100 might be done in time to have the results printed on the cosmic microwave background of the next Universe, at least according to some possible cosmological models.

Note that sometimes GameMaker will just crash if the game doesn't respond for multiple minutes at a time. If this happens, just run it again and hope for a better roll. You can probably write a shell script to automate this or something.

### Price
Why on god's greenish-brown earth would you even pay for this.