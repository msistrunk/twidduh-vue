<template>
  <div class="hello">
    <button v-on:click="firebaseTest">register</button>
    <button v-on:click="loginTest">login</button>
    <button v-on:click="logoutTest">logout</button>
    <button v-on:click="addTest">TWEET</button>
    <button v-on:click="deleteTest">TWEET</button>
    <feedTweet
      v-bind:key="tweet.text"
      v-for="tweet in tweets"
      v-bind:tweet="tweet"
    />
  </div>
</template>

<script>
import firebase from "../firebase";
import feedTweet from "./feedTweet.vue";

export default {
  name: "HelloWorld",
  components: {
    feedTweet,
  },
  data: function() {
    return {
      tweets: {},
    };
  },
  methods: {
    firebaseTest: () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword("bigmeech@sistrunk.codes", "Abcd1234!")
        .then(() => {
          console.log("Registered!");
        })
        .catch(() => {
          console.log("Registration Failed!");
        });
    },
    loginTest: () => {
      firebase
        .auth()
        .signInWithEmailAndPassword("bigmeech@sistrunk.codes", "Abcd1234!")
        .then(() => {
          console.log("Logged in!");
        })
        .catch(() => {
          console.log("Log in Failed!");
        });
    },
    logoutTest: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logged Out!");
        })
        .catch(() => {
          console.log("Logout Failed!");
        });
    },
    addTest: () => {
      const messagesRef = firebase.database().ref("messages");
      const message = {
        dummyStuffs: "meech!!",
      };
      messagesRef.push(message);
    },
    deleteTest: () => {
      const messageRef = firebase
        .database()
        .ref(`/messages/-M4N40cn4cpvkBAVWmNU`);
      messageRef.remove();
    },
  },
  created: function() {
    const messagesRef = firebase.database().ref("messages");
    messagesRef.on("value", (snapshot) => {
      const allMessages = snapshot.val() ?? [];
      this.tweets = allMessages;
      console.log(allMessages, "allMessages");
    });
  },
};
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
