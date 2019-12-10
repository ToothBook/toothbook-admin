<template>
  <span>
    <v-system-bar color="light-blue darken-3"></v-system-bar>
    <v-app-bar color="light-blue accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-family: Cursive">TOOTHBOOK</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-1">
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute top temporary fit-height left>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar tile right size="62">
            <img src="../assets/toothbook-logo5.png">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list nav shaped>
        <v-list-item-group v-model="group" active-class="light-blue--text text--accent-4">
          <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { icon: "mdi-view-dashboard", title: "Dashboard", link: "/admin" },
      { icon: "mdi-timetable", title: "Services", link: "/services" },
      { icon: "mdi-account-multiple", title: "Clients", link: "/clients" },
      { icon: "mdi-settings", title: "Settings", link: "/account-settings" }
    ]
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("authenticated");
      this.$router.go({ name: "Login" }).catch(err => {
        console.log(err)
      });
    },
    alertLogout() {
      Swal.fire({
        title: "Are you sure you want to logout?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.logout();
        }
      });
    }
  }
};
</script>