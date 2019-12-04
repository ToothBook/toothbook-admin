<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="firstname"
    class="elevation-5 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat class="ma-5 mb-12 pa-5">
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-center display-2">Queue of Clients</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        x-small
        color="secondary"
        :disabled="item.status == 'Done'"
        dark
        @click="actionBtn(item)"
      >{{item.action}}</v-btn>
    </template>
    <template v-slot:item.delete="{ item }">
        <v-icon small @click="alertDelete(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:item.status="{ item }">
      <span :class="getColor(item.status)" dark>{{ item.status }}</span>
    </template>
    <template v-slot:item.info="{ item }">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-icon small @click="details(item)" v-on="on">mdi-information</v-icon>
        </template>
        <v-card class="pa-4">
          <v-card-title class="black--text">
            <v-list-item-avatar tile right size="62">
              <img src="../assets/toothbook-logo5.png">
            </v-list-item-avatar>
            <span class="headline">Client's Details</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{firstname+" "+lastname}}</v-list-item-title>
              <v-list-item-subtitle>Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{email}}</v-list-item-title>
              <v-list-item-subtitle>Email Address</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{contact}}</v-list-item-title>
              <v-list-item-subtitle>Contact Number</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{note}}</v-list-item-title>
              <v-list-item-subtitle>Notes</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="light-blue accent-3" @click="dialog=false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{item.date.substr(0, 10)}}</span>
    </template>
  </v-data-table>
</template>-->

<script>
import {
  getAppointmentsDone,
  deleteAppointment,
  updateAppointment
} from "../helpers/actions";
import moment from "moment";
import Swal from "sweetalert2";
import { setTimeout } from "timers";

export default {
  name: "Dashboard",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      note: "",
      disable: false,
      checked: false,
      expanded: [],
      clients: [],
      singleExpand: false,
      label: "Process",
      dialog: false,
      actions: [
        {
          title: "Cancel"
        },
        {
          title: "Delete"
        }
      ],
      headers: [
        {
          text: "Date of Reservation",
          align: "left",
          value: "date"
        },
        {
          text: "Date of Submission",
          value: "dateOfSubmit"
        },
        {
          text: "Firstname",
          value: "firstname"
        },
        {
          text: "Lastname",
          value: "lastname"
        },
        {
          text: "Requested Dental Service",
          value: "reason"
        },
        {
          text: "Status",
          value: "status",
          sortable: false
        },
        {
          text: "Actions",
          value: "action",
          sortable: false
        },
        {
          text: "",
          value: "delete"
        },
        {
          text: "",
          value: "info"
        }
      ],
    };
  },
  methods: {
    getColor(status) {
      if (status == "On Queue") return "red--text font-weight-bold";
      else if (status == "Processing...")
        return "orange--text font-weight-bold";
      else return "green--text font-weight-bold";
    },
    details(item) {
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.email = item.email;
      this.contact = item.contact;
      this.note = item.note;
    },
    menu(item, title) {
      if (title == "Delete") {
        this.alertDelete(item);
      }
    },
    deleteAppointment(item) {
      const index = this.clients.indexOf(item);
      console.log(item)
      deleteAppointment(item._id)
        .then(() => this.$emit("deleteAppointment", item._id))
        .catch(err => alert(err));
      this.clients.splice(index, 1);
      console.log(this.clients)
    },

    actionBtn(item) {
      console.log(item)
      if (item.status === "On Queue") {
        item.action = "Done";
        item.status = "Processing...";
      } else if (item.action == "Done") {
        item.status = "Done";
        item.dateOfAccomplish = moment().format("MMMM Do YYYY, h:mm:ss a");
      }
      if (item.status == "Done") {
        setTimeout(() => {
          this.clients.splice(this.clients.indexOf(item), 1);
        }, 1000);
      }
      const data = {
        status: item.status,
        action: item.action,
        dateOfAccomplish: item.dateOfAccomplish
      };
      updateAppointment(data, item._id)
        .then(data => {
          this.$emit("updateService", data.data);
        })
        .catch(err => alert(err.error));
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
    getAppointmentsDone()
      .then(data => ((this.clients = data.data), console.log(data.data)))
      .catch(err => alert(err));
  }
};
</script>

<style scoped>
.black--text label {
  color: black;
}
</style>
