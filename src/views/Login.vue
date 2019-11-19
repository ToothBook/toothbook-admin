<template>
<<<<<<< HEAD
<!-- <div>  -->
      <v-container
        class="fill-height"
        fluid
      >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
              <v-toolbar
                dark
                flat
                prominent
                src="../assets/background.png"
              >
                <v-toolbar-title>ToothBook Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="username"
                    prepend-icon="mdi-account"
                    clearable
                    type="text"
                  />
=======
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
>>>>>>> 6797a74519c3528135df0eab6da5a63bb2afc126

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
                prepend-icon="mdi-account-box"
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
export default {
  name: "btnLogin",
  data() {
    return {
      username: "",
      password: ""
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
    }
  },
  props: {}
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