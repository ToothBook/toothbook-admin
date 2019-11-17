<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="firstname"
    show-expand
    class="elevation-5"
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
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">Notes from the clients here</td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      expanded: [],
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
        { text: "Email Address", value: "email" },
        { text: "Contact Number", value: "contact" },
        { text: "Actions", value: "action", sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
      clients: [
        {
          firstname: "Mary Grace",
          lastname: "Tiburillo",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Geneva",
          lastname: "Rivas",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Ivy Joy",
          lastname: "Devilleres",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Jessa",
          lastname: "Jalandoni",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Jessa Mae",
          lastname: "Yosores",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Redgie",
          lastname: "Gravador",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Ma. Theresa",
          lastname: "Amaquin",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Hannah Mae",
          lastname: "Pelino",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Yubert",
          lastname: "Mariscal",
          email: "sample@gmail.com",
          contact: "09123557841"
        },
        {
          firstname: "Jonathan",
          lastname: "Rivas",
          email: "sample@gmail.com",
          contact: "09123557841"
        }
      ]
    };
  }
};
</script>