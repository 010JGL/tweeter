/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function () {

  const createTweetElement = function (tweetObj) {     // function to make the text safe so a user cannot affect my script

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(tweetObj.content.text)}</p>`;  // save the value in a const, to use it in our HTML

    // copy the whole article so we have the same structure for every tweet
    // line 53 imports timeago in script. for line 63
    const $tweet = $(`
    <article class="tweet"> 
      <header class="top-container">
        <h2><img src=${tweetObj.user.avatars}>${tweetObj.user.name}
        </h2>
        <h2>${tweetObj.user.handle}
        </h2>
      </header>
      <div class="text-tweet">${safeHTML}</div>
      <footer class="bot-container">
        <p class="bottom-left">${timeago.format(tweetObj.created_at)}</span>
        </p>
          <div class="bottom-right">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
    </article>`);
    $('.tweet-container').append($tweet);       // Appends our tweet to the parent tweet-container so it shows up on the page
  };

  const renderTweets = function (tweets) {        // everytime we render, its gonna empty the child of the parent class .tweet-container
    $('.tweet-container').empty();                // this is so we dont load every tweet everytime we post a new one

    for (let tweet of tweets) {
      createTweetElement(tweet);                   // calls createTweetElement for each tweet
    }
  };

  $("form").on("submit", function (event) {    //linking the form, when we click submit, to an event
    event.preventDefault();                    //preventing to go to page /tweets
    const message = $(this).serialize();         // turn form data into a query string

    if (message.length > 5 && message.length <= 145) {    // not optimal, need to find improvement
      $(".error").slideUp();                            // slide the error box back up when condition is met
      $.ajax('/tweets', {
        type: "POST",
        data: message,
        url: '/tweets'
      })
        .then(function (tweet) {
          loadtweets();
          $('#tweet-text').val('');        // sets the text area back to nothing after we send a tweet

          $('.counter').val(140);        //sets back the counter after we load a tweet

        });
    } else {
      $(".error").slideDown();        // makes the error message slidedown when there is an error
    }
  });

  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweet) {

        tweet.reverse();           // takes the tweet and reverse it so the last tweet is on top
        renderTweets(tweet);
      });
  };

  loadtweets();

});

