---
layout: layouts/base.njk
menu:
  visible: true
  title: Cookbook Jam 3
  order: 11
---



<h1>Cookbook Jam 3: Tutorial Edition</h1>
<h2>    
<p id="countdown">Getting Countdown...</p>
</h2>


More soon...

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