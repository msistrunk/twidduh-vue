<template>
  <div class="tweet">
    <div class="profilePicture">
      <p><font-awesome-icon :icon="['fas', 'user-circle']" /></p>
    </div>
    <div class="tweetText">
      <p class="username">
        @username
      </p>
      <p class="tweetBody">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faUserCircle);

export default {
  name: "feedTweet",
  data: function() {
    return {};
  },
  props: {
    tweet: Object,
  },
  created: function() {
    console.log(this.tweet, "tweet");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweet {
  display: grid;
  outline-style: solid;
  grid-template-columns: 50px auto;
}
.tweetText {
  text-align: left;
}
</style>
