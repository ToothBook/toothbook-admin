<template>
    <v-data-table
        :headers="headers"
        :items="services" 
        sort-by="name" 
        class="elevation-5">
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
                        >  <v-text-field v-model="name" :rules="inputRules" outlined dense  label="Service Name" required></v-text-field>
                            <v-text-field v-model="time" :rules="inputRules" outlined dense label="Estimated Time (minutes)" type="number" required></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text :disabled="!valid" @click="formAction()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
<template v-slot:item.action="{ item }">
    <v-icon small class="mr-2" @click="editItem(item)">
        edit
    </v-icon>
    <v-icon small @click="deleteService(item)">
        delete
    </v-icon>
</template>
  </v-data-table>
</template>

<script>
import { createService, getServices, deleteService, updateService } from "../helpers/actions";
export default {
    name: "schedules",
    // props:['service'],
    data: () => ({
        name: '',
        time: 0,
        getQuery: '',
        services: [],
        service_id: 0,
        dialog: false,
        valid: false,
        inputRules: [
            v => !!v || 'Input is required'
        ],
        headers: [{
                text: "Services",
                align: "left",
                value: "name"
            },
            { text: "Estimated Time (min)", value: "time" },
            { text: "Actions", value: "action", sortable: false }
        ],
        add: true,
        editedIndex: -1,
    }),

    computed: {
        formTitle() {
            return this.add == true ? "Add Service" : "Edit Service";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    methods: {
        editItem(item) {
            this.add = false;
            this.name = item.name;
            this.time = item.time;
            this.service_id = item._id;
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.add = true
                this.editedIndex = -1;
            }, 300);
            this.name = null;
            this.time = null;
            this.retrieveServices()
        },

        formAction() {
            if( this.add === true){
              this.create() 
            }else{
              this.update()
            }
        },

        create() {
            let data = { name: this.name, time: this.time }
            createService(data)
                .then(data => {
                    this.$emit('createService', data.data);
                    console.log(data.data)
                    this.close()
                })
                .catch(err => alert(err.error))
        },

        deleteService(item) {
            const index = this.services.indexOf(item);
            const service = this.services[index];
            console.log(service)
            deleteService(service._id)
                .then(() => this.$emit('deleteService', service._id))
                .catch(err => alert(err))
            this.retrieveServices()
        },

        update() {
            let data = { name: this.name, time: this.time };
            updateService(data, this.service_id)
                .then(data => {
                    this.$emit('updateService', data.data)
                    console.log(data.data)
                    this.close()
                })
                .catch(err => alert(err.error));
        },
        retrieveServices(){
            getServices()
            .then(data => this.services = data.data)
            .catch(err => alert(err))
        }
    },

    mounted() {
        getServices()
            .then(data => (this.services = data.data))
            .catch(err => alert(err))
    }
};
</script>