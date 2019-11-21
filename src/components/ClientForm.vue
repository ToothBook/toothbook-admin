<template>
  <v-card
    class="my-4 mx-auto px-10 pb-10"
    max-width="70%"
    elevation="5"
  >
    <v-sheet
      class="v-sheet--offset mx-auto mt-10 pa-5"
      color="light-blue accent-2"
      elevation="10"
      max-width="calc(100% - 1px)"
    >
    <h3>Please provide the following information:</h3>
    </v-sheet>
      <v-form
         ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
     <v-menu
          v-model="menu"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              label="When"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :min="date"
            @change="menu= false"
          ></v-date-picker>
        </v-menu>
     <v-select
        v-model="selectService"
        :items="services"
        item-text="name"
        :rules="[v => !!v || 'Item is required']"
        label="Dental Services"
        sort-by="name"
        required
      ></v-select>
     
        <h3 class="mb-2">Personal Information</h3>
     <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
        </v-col>
        </v-row>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
      v-model="contact"
        :rules="[v => !!v || 'Item is required']"
        label="Contact Number"
        required
      ></v-text-field>
      <v-textarea
      v-model="note"
          outlined
          name="input-7-4"
          label="Notes"
          value=""
        ></v-textarea>
        <v-spacer></v-spacer>
        <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate()"
      >
        Submit Request
      </v-btn>
      </v-form>
  </v-card>
</template>

<script>
import moment from 'moment';
<<<<<<< HEAD
import { createAppointment, getServices} from "../helpers/actions";

=======
import { createAppointment, getServices } from "../helpers/actions";
import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
Vue.use(VueReCaptcha, { siteKey: "6LeT38MUAAAAAL2uxDsVNaptLUdrPOIvIgvz44Mw" });
>>>>>>> 7105bd7f6f9afeed11e8177bedbafe6cad8cdc42
  export default {
    name: "clientform",
    data: () => ({
      status: 'On Queue',
      check: false,
      valid: true,
      firstname: '',
      lastname:'',
      contact:'',
      hours:[],
      // dateOfSubmit: this.moment(date),
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      selectService: null,
      services: [],
      note:'',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      checkbox: false,
      lazy: false,
      data:[],

    }),
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('MMMM DD YYYY') : ''
      },
    },

    methods: {
      validate () {
        this.submitRequest()
        if (this.$refs.form.validate()) {
<<<<<<< HEAD
           this.disableSubmit = true;
          this.submitRequest()
          this.firstname = this.lastname = this.contact = this.email = this.note = this.selectService = null;  
=======
          this.snackbar = true;
          // this.submitRequest();
          this.firstname = this.lastname = this.contact = this.email = this.note = this.selectService = null;
>>>>>>> 7c91c86fcad077a4dc2d99d867845b01a428c644
        }
      },
      
      submitRequest() {
        if(this.note == ''){
          this.note = 'No note is added!'
        }
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email, 
          contact: this.contact, 
          date: this.date,
          reason: this.selectService, 
          note: this.note, 
          status: this.status,
          check: this.check,
          dateOfSubmit: this.dateOfSubmit
          }
        createAppointment(data)
          .then(data => {
          this.$emit('createAppointment', data.data);
          console.log(data.data)
          })
          .catch(err => alert(err.error))
        },
    },
    mounted() {
      console.log(this.date)
      getServices()
        .then(data => (this.services = data.data)
        )
        .catch(err => alert(err))
    }
  }
</script>


<style>
  .v-sheet--offset {
    top: -25px;
    position: relative;
  }
</style>