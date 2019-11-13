<template>
  <v-app>
    <!-- <Header/> -->
     
    <!-- <Sidebar/> -->
    <Header/>
    <v-content class="mx-4 mb-4">
      
          <router-view/>
    </v-content>
     
  </v-app>
</template>

<script>
// import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    // Sidebar,
    Header
  }
};
</script>

