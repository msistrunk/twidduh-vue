<template>
  <div class="hello">
    <feedTweet v-bind:key="tweet.text" v-for="tweet in tweets" v-bind:tweet="tweet" />
  </div>
</template>

<script>
import axios from 'axios';
import feedTweet from './feedTweet.vue';

export default {
  name: 'HelloWorld',
  components: {
    feedTweet,
  },
  data: function () {
    return {
      tweets: {} 
    }
  },
  mounted () {
    axios
      .get('https://twidduh-api.herokuapp.com/tweets')
      .then(response => (this.tweets = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
