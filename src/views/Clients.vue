<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title class="display-2">
      List of Clients
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="clients" :search="search">
      <template v-slot:item.action="{ item }">
        <v-icon small @click="alertDelete(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.status="{ item }">
      <span class="green--text font-weight-bold">{{ item.status }}</span>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAppmtDone, deleteAppointment } from "../helpers/actions";
import Swal from "sweetalert2";

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

    alertDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteAppointment(item);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  },
  mounted() {
    getAppmtDone()
      .then(data => ((this.clients = data.data)))
      .catch(err => alert(err));
  }
};
</script>
