<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="firstname"
    show-expand
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
      <v-icon
        small
        @click="deleteAppointment(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.status="{ item }">
      <v-checkbox class="black--text"
              v-model="item.check"
              color="success"
              hide-details
              :label="item.status"
              @change="check(item)"
            />
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">{{item.note}}</td>
    </template>
  </v-data-table>
</template>
<script>
import {getAppointments , deleteAppointment, updateAppointment} from "../helpers/actions";
export default {
  name: "Dashboard",
  data() {
    return {
      // status:'On Queue',
      checked: false,
      expanded: [],
      clients:[],
      singleExpand: false,
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
        { text: "Requested Dental Service", value: "reason" },
        { text: "Email Address", value: "email" },
        { text: "Contact Number", value: "contact" },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  methods:{
    deleteAppointment(item) {
            const index = this.clients.indexOf(item);
            const client = this.clients[index];
            console.log(client)
            deleteAppointment(client._id)
                .then(() => this.$emit('deleteAppointment', client._id))
                .catch(err => alert(err))
            this.retrieveAppointments()
        },

    retrieveAppointments(){
      getAppointments()
            .then(data => (this.clients = data.data , console.log(data.data)))
            .catch(err => alert(err))
       },

       check(item){
            const index = this.clients.indexOf(item);
            const client = this.clients[index];
            if (client.check == false) {
              // client.check = false;
              client.status= "On Queue";
            } else {
              // client.check = true;
              client.status="Done";
            }
            const data = {status: client.status, check: client.check}
            updateAppointment(data, client._id)
              .then(data => {
                    this.$emit('updateService', data.data)
                    console.log(data.data)
                    // Object.assign(this.clients[this.editedIndex], data.data)
                    // this.close()
                })
                .catch(err => alert(err.error));
       }
  },
  mounted() {
    getAppointments()
      .then(data => (this.clients = data.data , console.log(data.data)))
      
      .catch(err => alert(err))
  }
};
</script>
<style scoped>
.black--text label {
    color: black;
}
</style>