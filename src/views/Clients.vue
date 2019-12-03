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
      <template v-slot:item.status="{ item }">
      <span class="green--text font-weight-bold">{{ item.status }}</span>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAppmtDone, deleteAppointment } from "../helpers/actions";

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
          text: "Date of Accomplish",
          value: "dateOfAccomplish"
        },
        {
          text: "Status",
          value: "status"
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
      deleteAppointment(item._id)
        .then(() => this.$emit("deleteAppointment", item._id))
        .catch(err => alert(err));
      this.clients.splice(index, 1);
    },
  },
  mounted() {
    getAppmtDone()
      .then(data => ((this.clients = data.data)))
      .catch(err => alert(err));
  }
};
</script>
