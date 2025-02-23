---
layout: layouts/base.njk
description: Cookbook 4 - Library, Tools, Tutorial jam!
menu:
  visible: false
  title: Cookbook Jam 4
  order: 11
---
<center>

# Cookbook Jam 4: Library, Tools, Tutorial jam!
<h2>    
<p id="countdown">Getting Countdown...</p>
</h2>
</center>

Got a tool or system in one or several of your projects that you use often? Or an idea in your head that you want to experiment with but don’t have a good excuse, or just got an unfinished prototype? It could be useful for any or specific projects, or a fun time to tinker around with brand new ideas! Or perhaps you want to make a GameMaker specific tutorial? Whatever the case may be, this is the jam for you! 

[Join the GameMaker Kitchen Discord server](https://discord.gg/EaGY2wyQmz) to discuss the jam in #cookbook_jam! 

<h3>Libraries and tools</h3>
<button class="collapsible">Open collapsible</button>
<div class="content">

### Requirements for participation: 
- Must be familiar with source control of some kind (Github, Bitbucket, Gitlab) 
- Must have a basic fundamental understanding of GameMaker and GameMaker Language (not for complete beginners!) 

### Requirements for submission:
- You may work on a project that was already in progress before the jam started, but it should be in an incomplete or prototype state. No submitting a library that was already finished before the jam started!
- Must have a public repository (No single scripts allowed, sorry!) 
- Must have a basic setup guide
- Must have a documentation section
- Include examples in the repository 

### How to submit your library (if not an executable tool):
1. In Gamemaker IDE at the top, Tools -> Create Local Package
2. Only add in the stuff relevant to your library that you absolutely need.
3. Give it a name, an author and a version (as per your version schema) 
4. Press OK, and save it.
5. Either upload it to the GameMaker Kitchen #your_resources and link it to #cookbook_jam. Or upload the .yymps to your itch.io submission page as a download.

</div>

<h3>Tutorials</h3>
<button class="collapsible">Open collapsible</button>
<div class="content">

### Requirements for participation:
- Must have a basic fundamental understanding of GameMaker and GameMaker Language
- Must base your tutorial on either LTS or latest monthly. 

### Requirements for submission:
- You may work on a tutorial that was already in progress before the jam started, but it should be in an incomplete or prototype state. No submitting a tutorial that was already finished before the jam started!
- The tutorial *may* be in video or text form. (Or both!)
- For Videos: All videos should be submitted to YouTube and embeded onto the tutorial page submission directly. 
- For Text: The tutorial *must* be in at least a format that could be transferred to markdown, with preferably minimal effort.

###How to submit:

We offer two ways of submitting a tutorial.

A. Directly onto GameMaker Kitchen.

B. Directly published onto #your_resources

### GameMaker Kitchen Website:
0. Optional: Install and setup deno (currently located in the readme.md in the repo, will be moved to the wiki soon), as well as a text editor. (I recommend Visual Studio Code)
1. Fork [this repository](https://github.com/tabularelf/gamemaker-kitchen).
2. Clone with your favourite git client, and make a new branch.
3. Make a new folder in `/src/tutorials/` with your name, for your tutorial/s.
4. Refer to this [page](https://github.com/tabularelf/gamemaker-kitchen/wiki/Making-or-editing-an-entry-(Post-Library-Tool-Asset-etc)) for setting up your tutorial page, as well as markdown that is valid. 
5. Once you have finished setting up your tutorial page and you are ready to submit, make a pull request to the main repository.

### #your_resources
1. Upload your tutorial to #your_resources as a new thread.
2. Link back to #cookbook_jam.

</div>

<h3>Frequently asked questions</h3>
<button class="collapsible">Open collapsible</button>
<div class="content">

### Q: I'm already working on a tutorial for GameMaker, can I join the jam still and submit it?
**A**: While many jams require submissions to be made completely from scratch, I 100% welcome any and all half finished tutorials you've worked on previously, provided that they have not already been released.

### Q: There’s a tutorial I want to make but XYZ has already made something, is that still allowed?
**A**: YES! All tutorials count, including ones that are similar to another. 

### Q: How big can my tutorial be?
**A**: As big as you are willing to write it all. :) 

### Q: Does my tutorial need to be beginner friendly?
**A**: No, you can target users of any skill level you like. Tutorials for advanced users only are welcome!

### Q: What version of GM should my tutorial be made for?
**A**: Ideally your tutorial should be made either for the latest monthly version of GameMaker, or the LTS release of GameMaker. 

### Q: Am I allowed to make a tutorial on an existing GameMaker resource?
**A**: Yes, you can make a tutorial on libraries or tools, made for GameMaker! (Including your own)

### Q: Can I upload assets specific to the tutorial to the repository?
**A**: Images, that are under 5MB I'll allow. Anything else will be reviewed on a case-by-case basis.

### Q: Can I sell my tutorial?
**A**: The aim of this jam is specifically for FOSS resources. However, we do allow anyone to setup donations for their resources (including pay what you want models)!

### Q: What is FOSS?
**A**: FOSS stands for "Free and Open-Source Software". Indicating that the software and code is available for everyone, to be used by anyone for free. Whether it be commercial or non-commercial used. This is done by a license that grants the right to use, copy, study, and change the software in anyway.

### Q: What is a license?
**A**: A license is a form of legal permission, to use the provided software/code. By providing a license, you allow people to take your existing software/code and use it as per the license terms. These mainly cover usage, modifications and even redistribution. But other license terms may apply.

### Q: What license should I apply to my resources?
**A**: While I am willing to recommend some, I highly encourage reading out each of the licenses that are available from [https://choosealicense.com/](https://choosealicense.com/) and picking one that suits you best. Every license has its own rules and requirements. If you wish to see what I use, [click here to read up about MIT](https://choosealicense.com/licenses/mit/). 

</div>


<script>
// Set the date we're counting down to
var countDownDateTimeStart = new Date("03/15/2024 1:00:00 PM UTC"); // UTC
var countDownDateTime = countDownDateTimeStart;
var countDownDateTimeEnd = new Date("04/15/2024 2:00:00 PM UTC"); // UTC
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
            countDownDateTime = countDownDateTimeEnd;
            countDownTime = countDownDateTime.getTime(); 
            dateText = "Jam Ends";
        } else {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = `Cookbook Jam 4 is over!<br>${countDownDateTimeStart.toLocaleString()} - ${countDownDateTimeEnd.toLocaleString()}`;
        }
  }
}, 100);
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