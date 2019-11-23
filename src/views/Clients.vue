<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title class="display-2">
      List of Clients
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="clients" :search="search">
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteAppointment(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAppointments, deleteAppointment } from "../helpers/actions";

export default {
  name: "Clients",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Firstname",
          align: "left",
          value: "firstname"
        },
        {
          text: "Lastname",
          value: "lastname"
        },
        {
          text: "Email Address",
          value: "email"
        },
        {
          text: "Contact Number",
          value: "contact"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
      clients: []
    };
  },
  methods: {
    deleteAppointment(item) {
      const index = this.clients.indexOf(item);
      const client = this.clients[index];
      console.log(client);
      deleteAppointment(client._id)
        .then(() => this.$emit("deleteAppointment", client._id))
        .catch(err => alert(err));
      this.retrieveAppointments();
    },

    retrieveAppointments() {
      getAppointments()
        .then(data => ((this.clients = data.data), console.log(data.data)))
        .catch(err => alert(err));
    }
  },
  mounted() {
    getAppointments()
      .then(data => ((this.clients = data.data), console.log(data.data)))
      .catch(err => alert(err));
  }
};
</script>
