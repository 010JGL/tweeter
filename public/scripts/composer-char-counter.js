// Putting the #ID in a var, i can call it with .on
$(document).ready(function() {
  
  const tweetText = $("#tweet-text");
  tweetText.on("keyup", function() {
    const inputLength = Number($(this).val().length);     // this is the element that triggers the event
    const remaining = 140 - inputLength;                  // initial count at 140 - our text area

    //const counter = $(this).siblings('.bottom-tweet').children('.counter')  // works the same as line 10
    const counter = $(this).next().find('.counter');        //.next works on siblings only .find will look for (element)
    
    counter.val(remaining);                              // assign the remaining value to the counter
  
    if (remaining <= 0) {
      document.querySelector(".counter").style.color = "red";
    } else {
      document.querySelector(".counter").style.color = "blue";
    }

  });
});