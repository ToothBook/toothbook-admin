<template>
  <v-app>
    <!-- <carousel  v-if="$route.name!= 'Login' && $route.name!= 'Dashboard'&& $route.name!= 'services'&& $route.name!= 'Clients'&& $route.name!= 'Settings'"/> -->
    <v-app id="main" :style="{background: $vuetify.theme.themes[theme].background}">
      <Header
        v-if="$route.name!= 'Login' && $route.name!= 'ClientsForm' && $route.name!= 'LandingPage'"
      />
      <v-content>
        <router-view />
        <v-footer absolute class="mt-10" color="blue darken-2" v-if="$route.name!= 'Login'">
          <v-layout row wrap align-center>
            <v-flex xs12>
              <div class="white--text text-center">
                <strong>ToothBook@{{ new Date().getFullYear() }}</strong>
              </div>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-content>
    </v-app>
  </v-app>
</template>
<script>
/*eslint no-console: "error"*/

import Header from "@/components/Header";
// import carousel from '@/components/Carousel'
export default {
  name: "App",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
    //  isLoggedIn: function() {
    //   return this.$store.getters.isLoggedIn;
    // }
  },
  components: {
    // carousel,
    Header
  },
  methods: {
    LoginPage() {
      if (this.$route.path == "/") {
        return false;
      } else {
        return true;
      }
    }
    // logout: function() {
    //   this.$store.dispatch("logout").then(() => {
    //     this.$router.push("/");
    //   });
    // },
  }
};
</script>

