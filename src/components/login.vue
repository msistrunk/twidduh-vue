<template>
  <v-container class="fill-hieght" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="8">
              <v-form ref="form">
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
                <v-row no-gutters>
                  <v-col cols="6" class="text-center">
                    <v-btn
                      large
                      color="primary"
                      cols="6"
                      @click="login"
                      :loading="loading"
                      >Login</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      large
                      color="primary"
                      cols="6"
                      @click="register"
                      :loading="loading"
                      >Register</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
