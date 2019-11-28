<template>
  <v-app>
       <carousel  v-if="$route.name!= 'Login' && $route.name!= 'Dashboard'&& $route.name!= 'services'&& $route.name!= 'Clients'&& $route.name!= 'Settings'"/>
    <v-app id="main" :style="{background: $vuetify.theme.themes[theme].background}">
    <Header v-if="$route.name!= 'Login' && $route.name!= 'ClientsForm'" />
    <v-content  class="mb-5">
      <router-view />
    </v-content>
  </v-app>
  </v-app>
  
</template>
<script>
/*eslint no-console: "error"*/

import Header from "@/components/Header";
import carousel from '@/components/Carousel'
export default {
  name: "App",
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    //  isLoggedIn: function() {
    //   return this.$store.getters.isLoggedIn;
    // }
  },
  components: {
    carousel,
    Header
  },
  methods: {
    LoginPage() {
      if (this.$route.path == "/") {
        return false;
      } else {
        return true;
      }
    },
    // logout: function() {
    //   this.$store.dispatch("logout").then(() => {
    //     this.$router.push("/");
    //   });
    // },
  }
};
</script>

