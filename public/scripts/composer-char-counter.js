// Putting the #ID in a var, i can call it with .on
$(document).ready(function() {
  
  const tweetText = $("#tweet-text")
  tweetText.on("keyup", function() {
    const inputLength = Number($(this).val().length);     // this is the element that triggers the event
    const remaining = 140 - inputLength;

    //const counter = $(this).siblings('.bottom-tweet').children('.counter')  // works the same as line 10
    const counter = $(this).next().find('.counter')        //.next works on siblings only .find will look for (element)
    
   
    counter.val(remaining)
    //console.log(remaining)
    
    if (remaining <= 0) {
      document.querySelector(".counter").style.color = "red";   // if you reset the counter back to
    } else {
      document.querySelector(".counter").style.color = "blue";
    }

  });
});