<template>
  <v-card class="ma-5 mb-12 pa-5" >
    <v-card-title class="display-2">
      List of Clients
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
    >
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name:"Clients",
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Firstname',
            align: 'left',
            value: 'firstname',
          },
          {
            text: 'Lastname',
            value: 'lastname',
          },
          { text: 'Email Address', value: 'email' },
          { text: 'Contact Number', value: 'contact' },
          { text: "Actions", value: "action", sortable: false }
        ],
        clients: [
          {
            firstname: 'Mary Grace',
            lastname: 'Tiburillo',
            email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Geneva',
            lastname: 'Rivas',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Ivy Joy',
            lastname: 'Devilleres',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Jessa',
            lastname: 'Jalandoni',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Jessa Mae',
            lastname: 'Yosores',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Redgie',
            lastname: 'Gravador',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Ma. Theresa',
            lastname: 'Amaquin',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Hannah Mae',
            lastname: 'Pelino',
             email: 'sample@gmail.com',
            contact: '09123557841',
          },
          {
            firstname: 'Yubert',
            lastname: 'Mariscal',
             email: 'sample@gmail.com',
           contact: '09123557841',
          },
          {
            firstname: 'Jonathan',
            lastname: 'Rivas',
            email: 'sample@gmail.com',
            contact: '09123557841',
          },
        ],
      }
    },
    methods:{
    deleteItem(item) {
      const index = this.clients.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.clients.splice(index, 1);
    },
    }
  }
</script>