<template>
<span>
    <v-system-bar color="light-blue darken-3"></v-system-bar>
    <v-app-bar
      color="light-blue accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TOOTHBOOK</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      top
      temporary
      fit-height
      left
    >
    <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar tile right size="62">
            <img src="../assets/toothbook-logo5.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list nav >
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
        <v-list-item v-for="(item, index) in items" 
            :key="index" 
            :to="item.link"
            >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-footer
      absolute
      class="font-weight-medium"
      inset app
    >

      <v-col
        class="text-left"
        cols="12"
        :to="'/login'"
        @click="logout()"
        
      >

        <v-btn @click="logout()" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
            <v-hover v-slot:default="{ hover }">

        <strong>Logout</strong>
      </v-hover>
      </v-col>

    </v-footer>
    </v-navigation-drawer>
    <v-footer
      absolute
      dense
      class="font-weight-medium mt-10"
      
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>ToothBook</strong>
      </v-col>
    </v-footer>
</span>
</template>

<script>
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
        sessionStorage.removeItem("authenticated")
        this.$router.go({ name: 'Login' }).catch(err => {
      console.log(err)
      })
    }
  },
};
</script>