<template>
  <v-app>
    <Header/>
    <v-content class="mx-4 mb-4">
      
          <router-view/>
    </v-content>
     
  </v-app>
</template>

<script>

import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

