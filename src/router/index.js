import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import login from "../components/login";
import helloWorld from "../components/helloWorld";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: helloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
