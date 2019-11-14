<template>
<div> 
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
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
               <v-btn v-on:click="login()" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </div>
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
        this.$router.push({name: 'Dashboard'})
      }else{
        alert("Invalid credentials")
      }
    }
  },
  props:{
    
  }
};
</script>