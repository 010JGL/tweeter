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
}

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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {

  const createTweetElement = function (tweetObj) {         
    // copy the whole article so we have the same structure for every tweet
    const $tweet = $(`
    <article class="tweet">
      <header class="top-container">
        <h2><img src=${tweetObj.user.avatars}>${tweetObj.user.name}
        </h2>
        <h2>${tweetObj.user.handle}
        </h2>
      </header>
      <p>${tweetObj.content.text}</p>
      <footer class="bot-container">
        <p class="bottom-left">${tweetObj.created_at}</span>
        </p>
          <div class="bottom-right">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
    </article>`);
    $('.tweet-container').append($tweet);       // Appends our tweet to the parent tweet-container so it shows up on the page

  }
  

  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      createTweetElement(tweet)
    }
  }
  renderTweets(data);
});

