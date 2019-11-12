<template>
    <div class="admin">
        
            <!-- <Sidebar /> -->
            <div>Admin</div>
            <div>
                <router-view></router-view>
            </div>
        
    </div>
</template>

<script>
// import Sidebar from "../components/Sidebar.vue";
export default {
  name: "admin",
  components: {
    // Sidebar
  }
};
</script>