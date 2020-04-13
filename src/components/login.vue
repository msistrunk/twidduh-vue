<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              large
              color="primary"
              cols="6"
              @click="login"
              :loading="loading"
              >Login</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              large
              color="primary"
              cols="6"
              @click="register"
              :loading="loading"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Min 8 characters"
      ],
      showPassword: false,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$router.push("./");
          this.loading = false;
          console.log("Logged in!");
        })
        .catch(error => {
          this.loading = false;
          console.log(error, "Log in Failed!");
        });
    },
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("./");
          this.loading = false;
          console.log("Registered!");
        })
        .catch(() => {
          this.loading = false;
          console.log("Registration Failed!");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
