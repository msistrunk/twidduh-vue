<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Welcome</v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="fade" mode="out-in">
        <v-btn icon v-on:click="logout" v-if="currentUser">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </transition>
      <v-btn icon href="https://github.com/msistrunk/twidduh-vue">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$router.push("login");
        })
        .catch(() => {
          console.log("Logout Failed!");
        });
    }
  },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
