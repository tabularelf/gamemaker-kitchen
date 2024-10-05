---
title: What video recorder should you use on desktop?
description: A general suggestion guide on what video recorders you can use for free.
date: 2024-10-05
draft: false
tags:
  - Video Recorder
authors:
  - TabularElf
---

When it comes to making a video, whether it's for showing off something in your project. Or to show off some cool sick gameplay, or anything else you wish to share, it'd be nice if we could record our screen, right?
If you're looking for potential options, you've come to the right place! While I won't be covering how to use every single video recorder mentioned here, this will cover a general list of small recommendations and very brief tips. It is up to you to look up separate guides online for each of the tools suggested here.

# Windows
Windows nowadays comes with built in tools to recording your screen. So you may actually find those to be worthwhile enough for your needs.

### Windows 10
If you are on Windows 10, you can use Xbox Game Bar (`start + alt + r`) to start & stop a recording. And then you can access Xbox Game Bar (`start + g`) to bring up your captures. Or alternatively, you can navigate to `C:\Users\your_username\Videos\Captures` to bring up your captures. You can also adjust your capture settings by going to Settings -> Gaming -> Captures.

### Windows 11
With the introduction of an update (KB5030310), the built in Windows Snippet Tool has been upgraded to handle recording. TODO: Fill in more info about this.

### Windows other versions, or those who want more control 
There are other video recorders out there that don't come stock with Windows. For convience sake, I'll stick to a small list of video recorders that I would highly recommend.

### Simple, but effective
- [Bandicam](https://www.bandicam.com/)
- Nvidia Shadow Play (This requires a Nvidia GPU! This is apart of the Nvidia GeForce Experience and can be accessed via the in-game overlay (`alt + z`) or record via this shortcut (`alt + f9`). Shortcuts *can* be changed.)
- Intel Arc Control (This requires an Intel Arc GPU! Can be accessed via Intel Arc Control -> Studio -> Capture. Note that this requires a display to be connected to your Intel Arc GPU. No shortcuts as of October 5th 2024)

### Powerful GUI recorders
- [OBS (Open Broadcaster Software)](https://obsproject.com/)
- [ShareX](https://getsharex.com/)

### CLI only (Comamnd-Line-Interface)
- [ffmpeg](https://www.ffmpeg.org/) (it can [record screens](https://trac.ffmpeg.org/wiki/Capture/Desktop)).

# MacOSX
Just about every single MacOSX installation has a built in shortcut to recording your screen. However, it does not include audio. You can access it directly via `cmd + shift 5`.<br>
However, you may prefer some free alternatives so I'll list them here.<br>

**Note**: MacOSX out of the box does not support recording internal (desktop) audio. So if this is vital to you in anyway, you'll have to use a third party driver. [This](https://existential.audio/blackhole/) I recommend.

### Powerful GUI recorders
- [OBS (Open Broadcaster Software)](https://obsproject.com/)

### CLI only (Comamnd-Line-Interface)
- [ffmpeg](https://www.ffmpeg.org/) (it can [record screens](https://trac.ffmpeg.org/wiki/Capture/Desktop)).

# Linux
Some Linux distros do have built in ways of recording, but not all support it exclusively.<br>
And as this could get get vastly bloated easily, I am going to assume that you're reading this because your distro doesn't support it out of the box.

### Simple, but effective
- [SimpleScreenRecorder](https://www.maartenbaert.be/simplescreenrecorder/)

### Powerful GUI recorders
- [OBS (Open Broadcaster Software)](https://obsproject.com/)

### CLI only (Comamnd-Line-Interface)
- [ffmpeg](https://www.ffmpeg.org/) (it can [record screens](https://trac.ffmpeg.org/wiki/Capture/Desktop)).


# Formatting videos correctly
For the most part, if you're using a simple recorder, like ShareX, SimpleScreenRecorder, one of the GPU provided screen recording utilities, or Bandicam, those should automatically be in MP4, h264. Which is the universally supported format for all internet services. If you are using the latest version of OBS (Open Broadcaster Software) for the first time ever (as of writing, 30.2.3), it should automatically be set to Hybrid MP4 or Fragmented MP4, which is akin to MKV but within a MP4 container. The codec will be h264.

If you are using a more complex recorder or have modified your encoder settings, you'll want to ensure that they can be converted to MP4, h264.<br>

### Codec
A codec is simply the data of the video itself. It describes the video, how it stores each and every pixel, the amount of bits it has, how it's compressed, whether it's lossless or lossy compression, etc.<br>
Example codecs:
- h264 (The internet standard)
- h265 (A more up to date h264, not widely adopted)
- AV1
- VP9
- Apple Video
- WMV (It is a container too)

### Container
A container is simply a small file container for the video itself. Generally, the codec and container are separate from one another, however there are some exceptional ones.<br>
Example containers:
- MP4 (The internet standard)
- MKV
- MOV
- AVI
- WMV (It is a codec too)
- WebM
- FLV

## OBS (Open Broadcaster Software)
Some users usually have it already in h264, but the container may be set to Matroska Video (MKV) on older versions of OBS. You can change that to one of the supported MP4 formats (I highly recommend fragmented mp4). Alternatively, you may set it up to automatically remux to an MP4 container, `Settings -> Advanced -> Recording -> Automatically remux to MP4`. Or if you prefer to do it manually, especially if you already have existing MKV videos, `File -> Remux Recordings`. 

Otherwise users may have its codec not set to h264. Remuxing or fragmented MP4 won't help, especially for certain platforms that outright do not support them (such as Discord). To that end, there isn't much you can do unless you have either [ffmpeg](https://www.ffmpeg.org/) installed, or [Handbrake](https://handbrake.fr/) (which I highly recommend as well for both, as these are universal). The other alternative I'll recommend is a video editor, but you generally are going to be doing more than just converting it to mp4 h264 at that point.

## ShareX
If you are on Windows and happen to be using ShareX, while ShareX already records for mp4 h264, you might have altered its settings at some point. However, there is actually a video converter built right in. You can access it by going to ShareX -> Tools -> Video Converter. 

![sharex-sidebar](/site-assets/img/video-recorder-options/sharex-options.png) ![sharex-video-converter](/site-assets/img/video-recorder-options/sharex-video-converter.png)

# Summary
I hope this gives you a brief overview of your options, and solutions to video recorders for your needs. Good luck with your recordings!