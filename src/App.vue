<template>
  <v-app>
    <Header v-if="$route.name!= 'Login'" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
/*eslint no-console: "error"*/

import Header from "@/components/Header";
export default {
  name: "App",
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

