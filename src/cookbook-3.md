---
layout: layouts/base.njk
description: Cookbook 3 - Tutorial Edition
menu:
  visible: true
  title: Cookbook Jam 3
  order: 11
---
<center>

# Cookbook Jam 3: Tutorial Edition
<h2>    
<p id="countdown">Getting Countdown...</p>
</h2>
</center>

Unlike the previous iterations of Cookbook Jam [1](https://itch.io/jam/cookbook-jam-1) and [2](https://itch.io/jam/cookbook-jam-2), this jam is all about tutorials! Whether it's about a specific game mechanic, a library, a tool, or something in relation to GameMaker. If you like making tutorials, this jam is for you!

[Join the GameMaker Kitchen Discord server](https://discord.gg/EaGY2wyQmz) to discuss the jam in #cookbook_jam! 

Requirements for participation: 
- Must be familiar with source control (GameMaker Kitchen uses Github, so Git\Source Tree\Github Desktop, etc)
- Must have a basic fundamental understanding of GameMaker and GameMaker Language (not for complete beginners!) 

Requirements for submission:
- You may work on a tutorial that was already in progress before the jam started, but it should be in an incomplete or prototype state. No submitting a tutorial that was already finished before the jam started!
- The tutorial *may* be in video or text form. (Or both!)
- With exception to videos, you may use `/site-assets/*` to store specific things in relation to the tutorial (such as images, within reasonable file sizes of no greater than 10MB).
- For Videos: All videos should be submitted to YouTube and embeded onto the tutorial page submission directly. 

How to submit:
0. Optional: Install and setup deno (currently located in the readme.md in the repo, will be moved to the wiki soon), as well as a text editor. (I recommend Visual Studio Code)
1. Fork [this repository](https://github.com/tabularelf/gamemaker-kitchen).
2. Clone with your favourite git client, and make a new branch.
3. Make a new folder in `/src/tutorials/author_name/tutorial_name.md`
4. Refer to this [page](https://github.com/tabularelf/gamemaker-kitchen/wiki/Making-or-editing-an-entry-(Post-Library-Tool-Asset-etc) for setting up your tutorial page, as well as markdown that is valid.
5. Once you have finished setting up your tutorial page and you are ready to submit, make a pull request to the main repository.

<h3>Frequently asked questions</h3>
<button class="collapsible">Open collapsible</button>
<div class="content">

### Q: What is FOSS?
**A**: FOSS stands for "Free and Open-Source Software". Indicating that the software and code is available for everyone, to be used by anyone for free. Whether it be commercial or non-commercial used. This is done by a licensed that grants the right to use, copy, study, and change the software in anyway.

### Q: Can I sell my tutorial?
**A**: The aim of this jam is specifically for FOSS resources. However, we do allow anyone to setup donations for their resources (including pay what you want models)!

### Q: What is a license?
**A**: A license is a form of legal permission, to use the provided software/code. By providing a license, you allow people to take your existing software/code and use it as per the license terms. These mainly cover usage, modifications and even redistribution. But other license terms may apply.

### Q: What license should I apply to my resources?
**A**: While I am willing to recommend some, I highly encourage reading out each of the licenses that are available from [https://choosealicense.com/](https://choosealicense.com/) and picking one that suits you best. Every license has its own rules and requirements. If you wish to see what I use, [click here to read up about MIT](https://choosealicense.com/licenses/mit/). 

### Q: I'm already working on a tutorial for GameMaker, can I join the jam still and submit it?
**A**: While ideally with many jams it's intended for submissions to be made completely from scratch, I 100% welcome any and all existing submissions that are being worked on, provided that they have not been released previously, were previously undocumented, or were only half completed.

### Q: There’s a tutorial I want to make but XYZ has already made something, is that still allowed?
**A**: YES! All tutorials count, including ones that are similar to another. 

### Q: How big can my tutorial be?
**A**: As big as you are willing to write it all. :) 

### Q: I’d like to make something in mind for LTS, what should I do?
**A**: Make your project in LTS. Even with the project conversion tool now exposed as an UI as of 2024.2, there’s a huge difference in terms of capabilities between both LTS and monthly. To minimize the amount of effort of converting, rewriting any code or using something that just doesn’t exist in LTS, you should use GameMaker LTS from the start.

### Q: Am I allowed to make a tutorial on an existing GameMaker resource?
**A**: Yes, you can make a tutorial on libraries or tools, made for GameMaker! (Including your own)
</div>


<script>
// Set the date we're counting down to
var countDownDateTimeStart = new Date("Sep 2, 2024 14:00:00Z"); // UTC
var countDownDateTime = countDownDateTimeStart;
var countDownDateTimeEnd = new Date("Oct 2, 2024 14:00:00Z"); // UTC
var countDownTime = countDownDateTime.getTime(); 
var dateText = "Jam Starts";

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownTime - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    

  document.getElementById("countdown").innerHTML = `${dateText}: ${days}d ${hours}h ${minutes}m ${seconds}s`
  +`<br>${countDownDateTime.toLocaleString()}`;
    

  if (distance < 0) {
        let date1 = new Date().getTime();
        let date2 = countDownDateTime.getTime();
        if ((date1 > date2) && (date1 < countDownDateTimeEnd.getTime())) {
            countDownDateTime = countDownDateTimeEnd // UTC
            countDownTime = countDownDateTime.getTime(); 
            dateText = "Jam Ends";
        } else {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Cookbook Jam 3 is over!<br>September 3rd 2024 00:00:00 - October 3rd 2024 00:00:00 AEST";
        }
  }
}, 1000);
</script>

<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
</script>