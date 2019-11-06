<template>
    <div class="admin">
        <v-row>
            <Sidebar />
            <div>test</div>
            <div>
                <router-view></router-view>
            </div>
        </v-row>
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "admin",
  components: {
    Sidebar
  }
};
</script>