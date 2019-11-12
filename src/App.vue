<template>
  <v-app>
     <v-row>
    <Sidebar/>
    <v-content class="mx-4 mb-4">
          <router-view/>
    </v-content>
     </v-row>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar"
export default {
  name: "App",
  components: {
    Sidebar
  }
};
</script>

