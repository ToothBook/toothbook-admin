<template>
<!-- <div>  -->
      
<v-app id="back">
  <v-container class="fill-height" fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md7 lg5>
        <v-row align="center" justify="center">
          <v-img
            src="../assets/toothbook-logo5.png"
            aspect-ratio="1"
            max-width="310"
            max-height="250"
          ></v-img>
        </v-row>
        <v-spacer />

        <v-card  class="mx-auto" color="rgb(255, 255, 255, 0.2)" max-width="500px" raised>
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://ak3.picdn.net/shutterstock/videos/5649743/thumb/4.jpg"
          >
            <v-spacer />
          </v-img>
          <v-card-title>
            <h3>Login Form</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Login"
                name="username"
                prepend-icon="mdi-account"
                color="indigo"
                clearable
                type="text"
              />

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                clearable
                color="indigo"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-spacer />
          <v-card-actions class="justify-center">
            <!-- <v-btn v-if="data == false"
              class="px-10"
              text
              @click="register()"
              text-center
              color="light-blue darken-4"
            >Login</v-btn> -->
            <v-btn
              class="px-10"
              text
              v-on:click="login()"
              text-center
              color="light-blue darken-4"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
 </v-app>
</template>
 
<script>
import { getAccount } from "../helpers/actions.js";
export default {
  name: "btnLogin",
  data() {
    return {
      username: "",
      password: "",
      data: false
    };
  },
  methods: {
      login() {
        if (this.username == "admin" && this.password == "admin") {
          sessionStorage.setItem("authenticated", true);
          this.$store.commit("setAuthentication", true);
          this.$router.push({ name: "Dashboard" });
        } else {
          alert("Invalid credentials");
        }
      
    },
    // props: {}
    // login() {
    //   let body = { username: this.username, password: this.password };
    //   this.$store
    //     .dispatch("login", body)
    //     .then(resp => {
    //       console.log(resp);
    //       if (resp.data.status) {
    //         this.$router.push("/admin");
    //       } else {
    //         alert(resp.data.sms);
    //       }
    //     })
    //     .catch(err => console.log(err));
    // },

    register() {
      let body = { username: this.username, password: this.password };
      this.$store
        .dispatch("register", body)
        .then(resp => {
          if (resp.data.status) {
            this.$router.push("/admin");
          } else {
            alert(resp.data.sms);
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    getAccount()
      .then(data => {
        console.log(data.data);
        if (data.data.length) {
          this.data = true;
        }
        console.log(this.data);
      })
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
h2 {
  color: black;
}

#back {
  background-image: url(../assets/background.jpg);
  background-size: cover;
}
</style>