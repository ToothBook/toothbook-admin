<template>
  <!-- <div>  -->

  <v-app id="back">
    <v-container class="fill-height ml-12" fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md7 lg5>
          <v-card class="mx-auto text-center pa-5" max-width="500px" shaped raised>
            <v-avatar tile size="62">
              <img src="../assets/totii.png" alt="Vuetify.js" height="500" />
            </v-avatar>
              <h2 class="text-center">Admin Login</h2>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  label="Login"
                  name="username"
                  prepend-icon="mdi-account"
                  color="light-blue accent-4"
                  clearable
                  type="text"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  clearable
                  color="light-blue accent-4"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-spacer />
            <v-card-actions class="justify-center">
              <v-btn
                class="px-10"
                text
                @click="register()"
                text-center
                v-if="!disable"
                color="light-blue accent-4"
              >register</v-btn>
              <v-btn
                v-if="!loginbtn"
                class="px-10"
                dark
                v-on:click="login()"
                text-center
                color="light-blue accent-3"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { getAccount, loginAdmin, registerAdmin } from "../helpers/actions.js";
export default {
  name: "btnLogin",
  data() {
    return {
      username: "",
      password: "",
      data: false,
      disable: false,
      loginbtn: true
    };
  },
  methods: {
    login() {
      loginAdmin(this.username)
        .then(data => {
          this.$emit("loginAdmin", data.data);
          if (
            this.username == data.data.username &&
            this.password == data.data.password
          ) {
            sessionStorage.setItem("authenticated", true);
            this.$store.commit("setAuthentication", true);
            this.$router.push({
              name: "Dashboard"
            });
          } else {
            alert("Invalid credentials");
          }
        })
        .catch(err => alert(err.error));
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
      let data = {
        username: this.username,
        password: this.password
      };
      registerAdmin(data)
        .then(data => {
          this.$emit("registerAdmin", data.data);
          sessionStorage.setItem("authenticated", true);
          this.$store.commit("setAuthentication", true);
          this.$router.push({
            name: "Dashboard"
          });
          console.log(data.data);
        })
        .catch(err => alert(err.error));
    }
  },
  mounted() {
    getAccount()
      .then(data => {
        console.log(data.data);
        if (data.data.length) {
          this.disable = true;
          this.loginbtn = false;
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
  background-image: url(../assets/background3.jpg);
  background-size: cover;
}
</style>
