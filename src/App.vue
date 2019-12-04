<template>
  <v-app>
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

import Header from "@/components/Header";
export default {
  name: "App",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  components: {
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
  }
};
</script>

