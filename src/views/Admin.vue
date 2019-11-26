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
      <!-- <v-icon small @click="alertDelete(item)">mdi-delete</v-icon> -->
      <v-btn x-small color="secondary" dark @click="actionBtn(item)">{{item.action}}</v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="menu(item, action.title)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:item.status="{ item }">
      <!-- <v-checkbox
        class="black--text"
        v-model="item.check"
        color="success"
        hide-details
        :label="item.status"
        @change="check(item)"
      />-->
      <span>{{item.status}}</span>
    </template>

    <template v-slot:item.info="{ item }">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-icon small @click="details(item)" v-on="on">mdi-information</v-icon>
        </template>
        <v-card class="pa-4">
          <v-card-title class="black--text">
            <v-list-item-avatar tile right size="62">
              <img src="../assets/toothbook-logo5.png" />
            </v-list-item-avatar>
            <span class="headline">Client's Details</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>{{firstname+" "+lastname}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Email Address</v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Contact Number</v-list-item-title>
              <v-list-item-subtitle>{{contact}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Notes</v-list-item-title>
              <v-list-item-subtitle>{{note}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialog=false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <td :colspan="headers.length">{{item.note}}</td> -->
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{item.date.substr(0, 10)}}</span>
    </template>
  </v-data-table>
</template>

<script>
import {
  getAppointments,
  deleteAppointment,
  updateAppointment
} from "../helpers/actions";
import Swal from "sweetalert2";

export default {
  name: "Dashboard",
  data() {
    return {
      // status:'On Queue',
      firstname:"",
      lastname:"",
      email:"",
      contact:"",
      note:"",
      checked: false,
      expanded: [],
      clients: [],
      singleExpand: false,
      label: "Process",
      dialog: false,
      actions: [{ title: "Cancel" }, { title: "Delete" }],
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
        { text: "Requested Dental Service", value: "reason" },
        // { text: "Email Address", value: "email" },
        // { text: "Contact Number", value: "contact" },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "", value: "info" }
      ]
    };
  },
  methods: {
    details(item){
      console.log(item)
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.email = item.email;
      this.contact = item.contact;
      this.note = item.note
    },
    menu(item, title) {
      if (title == "Delete") {
        this.alertDelete(item);
      }
    },
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
    },

    actionBtn(item) {
      console.log(item)
      const index = this.clients.indexOf(item);
      const client = this.clients[index];
      if (item.status == "On Queue") {
        // client.check = false;
        item.action = "Done"
        item.status = "Processing...";
        
      } else if(item.action == "Done") {
        // client.check = true;
        item.status = "Done";
      }
      const data = { status: client.status, check: client.check };
      updateAppointment(data, client._id)
        .then(data => {
          this.$emit("updateService", data.data);
          console.log(data.data);
          // Object.assign(this.clients[this.editedIndex], data.data)
          // this.close()
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
    getAppointments()
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