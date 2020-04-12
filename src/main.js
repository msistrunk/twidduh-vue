import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "./store.js";
const firebase = require("./firebase");

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

let app;
firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      vuetify,
      render: h => h(App)
    });
  }
});
