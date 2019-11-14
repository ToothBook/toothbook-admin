<template>
<!-- <div>  -->
      <v-container
        class="fill-height"
        fluid
      >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 lg6>
                <v-card class="elevation-12">
              <v-toolbar
                dark
                flat
                prominent
                src="https://www.joliet-dentist.com/images/placeholder/background-1.png"
              >
                <v-toolbar-title>Login form</v-toolbar-title>
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
              <v-card-actions>
                <v-spacer />
               <v-btn class="px-10" rounded dark v-on:click="login()" color="light-blue lighten-1">Login</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
      </v-container>
      <!-- </div> -->
</template>

<script>
  export default {
     name: "btnLogin",
  data(){
    return{
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      if(this.username == "admin" && this.password == "admin"){
        sessionStorage.setItem('authenticated', true);
        this.$store.commit("setAuthentication", true);
        this.$router.push({name: 'Dashboard'
        })
      }else{
        alert("Invalid credentials")
      }
    }
  },
  props:{
    
  }
};
</script>