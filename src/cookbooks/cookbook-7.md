---
description: Prefab edition!
menu:
  visible: true
  title: Cookbook Jam 7
  order: 11
---
<center>

# Cookbook Jam 7: Prefab Edition!
<h2>    
<p id="countdown">Getting Countdown...</p>
</h2>
</center>

Got a tool or system in one or several of your projects that you use often? Or an idea in your head that you want to experiment with but don’t have a good excuse, or just got an unfinished prototype? It could be useful for any or specific projects, or a fun time to tinker around with brand new ideas! Or perhaps you want to make a GameMaker specific tutorial? Whatever the case may be, this is the jam for you! 

[Join the GameMaker Kitchen Discord server](https://discord.gg/EaGY2wyQmz) to discuss the jam in #cookbook_jam! 

<h3>Libraries and tools</h3>

### Requirements for participation: 
- Must be familiar with source control of some kind (Github, Bitbucket, Gitlab, Codeberg) 
- Must have a basic fundamental understanding of GameMaker and GameMaker Language (not for complete beginners!)
- Please make prefabs only for 2026.1 betas, or unless LTS 2026.1 comes out. LTS 2026.0 is NOT supported at all, and the submissions will be heavily focused on ensuring that they work in 2026.1. 

### Requirements for submission:
- You may work on a project that was already in progress before the jam started, but it should be in an incomplete or prototype state. No submitting a library that was already finished before the jam started!
- Must have a public repository (No single scripts allowed, sorry!) 
- Must have a basic setup guide
- Must have a documentation section
- Include examples in the repository 
- Must have a v1.0 release
- Any assets must be suitable to FOSS, or have a license that allows it to be used as apart of your examples.
- All non-code assets included within the library and repository, must not be ai-generated.
- If any code included involved an AI agent, follow the AI code assistance guidelines.

### AI code assistance guidelines:
It is pretty much unavoidable that someone will use an AI assistant to generate code. And as much as I would rather outright ban it, people will still work their way around hiding it. So rather than outright banning it, instead I'll be doing the flipside. This section of the post will provide some guidelines in regards to AI code assistance. These guidelines are to ensure that I, TabularElf, am not dealing with AI generated code blindly, during code reviews, and any submission reviewers; to ensure that they comply. While AI code can be masked in ways, ultimately the fault will always go to the submitter.

### Signed-off-by:
AI agents MUST NOT add Signed-off-by tags. The human submitter is responsible for:
- Reviewing all AI-generated code
- Ensuring compliance with licensing requirements
- Adding their own Signed-off-by tag for any and all AI assistant generated code
- Taking full responsibility for any work done by the AI assistant

### How to submit your library:
Please refer to [this guide](https://github.com/tabularelf/Libraries-and-the-state-of-prefabs).<br>
In addition, please add a "cookbook-7" tag upon submitting a prefab, to filter from existing entries.

<h3>Frequently asked questions</h3>
<button class="collapsible">Open collapsible</button>
<div class="content">

# General

### Q: What is FOSS?
**A**: FOSS stands for "Free and Open-Source Software". Indicating that the software and code is available for everyone, to be used by anyone for free. Whether it be commercial or non-commercial used. This is done by a license that grants the right to use, copy, study, and change the software in anyway.

### Q: What is a license?
**A**: A license is a form of legal permission, to use the provided software/code. By providing a license, you allow people to take your existing software/code and use it as per the license terms. These mainly cover usage, modifications and even redistribution. But other license terms may apply.

### Q: What license should I apply to my resources?
**A**: While I am willing to recommend some, I highly encourage reading out each of the licenses that are available from [https://choosealicense.com/](https://choosealicense.com/) and picking one that suits you best. Every license has its own rules and requirements. If you wish to see what I use, [click here to read up about MIT](https://choosealicense.com/licenses/mit/). 

# Libraries and tools
### Q: Can I sell my library?
**A**: The aim of this jam is specifically for FOSS libraries. However, we do allow anyone to setup donations for their libraries (including pay what you want models)!

### Q: What license should I apply to my libraries?
**A**: While I am willing to recommend some, I highly encourage reading out each of the licenses that are available from https://choosealicense.com/ and picking one that suits you best. Every license has its own rules and requirements. If you wish to see what I use, click here to read up about MIT. 

### Q: I'm already working on a library for GameMaker, can I join the jam still and submit it?
**A**: While ideally with many jams it's intended for submissions to be made completely from scratch, I 100% welcome any and all existing submissions that are being worked on, provided that they have not been released previously, were previously undocumented, or were only half completed.

### Q: There’s a library I want to make but XYZ has already made something, is that still allowed? 
**A**: YES! All libraries count, including ones that are similar to another. Every library aims to achieve a certain goal, and follows a certain pattern. And there are libraries that do work well enough for many people. But, that also means that not everyone will also find said library to work for what they need. In the last 5 years, I’ve come across many different libraries/tools/extensions that all achieve similar goals. From localisation, to texture atlas builders, to interpreter machines, to lighting systems, to input systems and many many more! 

### Q: What can I use to make documentation for my library? 
**A**: If your repository is public (which it needs to be to submit it!), then github wiki is a good option. You can also add JSdoc to your functions directly in GameMaker.

### Q: How big can my library be?
**A**: As big as you are willing to document it all. :) 

### Q: How should I handle versioning my libraries? 
**A**: There's a couple out there, see software versioning for more info.

### Q: I’d like to make something in mind for LTS, what should I do? 
**A**: As of LTS 2026.0, I would not recommend making a prefab for LTS 2026.0. Please use the beta version of GameMaker instead. (Or until LTS 2026.1 comes out.)

### Q: Am I allowed to use a dependency of another library/tool, if it aids in my submission?
**A**: Dependencies are allowed WITHIN reason. Provided that they do not take up the majority of the submission itself (should be one or a few aspects that they cover, not basically be THE submission). And crediting andl icensing MUST be given as per the authors own dependency credits and licensing.
</div>


</div>


<script>
// Set the date we're counting down to
var countDownDateTimeStart = new Date("11/17/2026 1:00:00 PM UTC"); // UTC
var countDownDateTime = countDownDateTimeStart;
var countDownDateTimeEnd = new Date("12/21/2026 1:00:00 PM UTC"); // UTC
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