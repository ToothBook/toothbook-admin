<template>
  <v-data-table
    :headers="headers"
    :items="services"
    sort-by="time"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white" class="ma-4 mb-12 pa-5"  >
        <v-toolbar-title class="display-1 ">MANAGE DENTAL SERVICES</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="light-blue lighten-1" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title class="blue white--text">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
        
            <v-card-text>
              <v-container>
                 <v-form class="mt-10"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field v-model="editedItem.name" outlined dense  label="Service Name" required></v-text-field>
                    <v-text-field v-model="editedItem.time" outlined dense label="Estimated Time (minutes)" type="number" required></v-text-field>
                 </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text :disabled="!valid" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "schedules",
  data: () => ({
    dialog: false,
    valid: false,
      inputRules: [
        v => !!v || 'Input is required'
      ],
    headers: [
      {
        text: "Services",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Estimated Time (min)", value: "time" },
      { text: "Actions", value: "action", sortable: false }
    ],
    services: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      time: "" 
    },
    defaultItem: {
      name: "",
      time: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Service" : "Edit Service";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.services = [
        {
          name: "Extration",
          time: 45
        },
        {
          name: "Dental Cleaning",
          time: 30
        },
        {
          name: "Cosmetic dentistry",
          time: 25
        },
        {
          name: "x-rays",
          time: 30
        },
        {
          name: "root canals",
          time: 25
        },
        {
          name: "Fillings",
          time: 45
        },
        {
          name: "Implants",
          time: 20
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.services.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.services.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.services.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.services[this.editedIndex], this.editedItem);
      } else {
        this.services.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>