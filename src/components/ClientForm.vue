<template>
  <v-container>
    <h1 class="font-italic font-weight-medium display-3">WE CARE FOR YOUR SMILE</h1>
    <v-flex xs12>
      <v-img :src="require('@/assets/totii.png')" class="my-3" contain height="200"></v-img>
    </v-flex>
    <v-layout text-center wrap>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                <v-icon>event</v-icon>BOOK SCHEDULE
              </v-btn>
            </template>
            <v-card class="my-4 mx-auto px-10 pb-10" elevation="5">
              <v-sheet
                class="v-sheet--offset mx-auto mt-10 pa-5"
                elevation="10"
                max-width="calc(100% - 1px)"
              >
                <img src="@/assets/totii.png" style="width:50px;height:auto" />
                <v-spacer />
                <v-toolbar-title>Please fill-in the following information</v-toolbar-title>
                <v-spacer />
                <!-- <h3>Please provide the following information:</h3> -->
              </v-sheet>
              <!-- <v-toolbar> -->
              <!-- color="primary" dark flat -->
              <!-- <img src="@/assets/totii.png" style="width:50px;height:auto" />
                <v-spacer />
                <v-toolbar-title>Please fill-in the following information</v-toolbar-title>
                <v-spacer />
              </v-toolbar>-->
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-select
                  v-model="selectService"
                  :items="services"
                  item-text="name"
                  :rules="[v => !!v || 'Item is required']"
                  label="Dental Services"
                  sort-by="name"
                  @change="disable = false, modal= true"
                  required
                ></v-select>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="When"
                      readonly
                      v-on="on"
                      :disabled="disable"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable :min="currentDate" @change="selectDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <h3 class="mb-2">Personal Information</h3>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                  v-model="contact"
                  :rules="[v => !!v || 'Item is required']"
                  label="Contact Number"
                  required
                ></v-text-field>
                <v-textarea v-model="note" outlined name="input-7-4" label="Notes" value></v-textarea>
                <v-spacer></v-spacer>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>
              </v-form>
              <v-row justify="center">
                <v-dialog v-model="dialog2" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="validate, validate()"
                      v-on="on"
                    >Submit</v-btn>
                    <v-btn color="error" class="mr-4" @click="validate" >Reset Form</v-btn>
                    <v-btn color="primary" class="mr-4" @click="dialog = false">Cancel</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Successfully Saved!!!</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

import {
  createAppointment,
  getServices,
  getHours,
  updateHours
} from "../helpers/actions";

export default {
  name: "clientform",
  data: () => ({
    dialog: false,
    dialog2: false,

    status: "On Queue",
    action: "Process",
    valid: true,
    firstname: "",
    lastname: "",
    contact: "",
    hours: [],
    // dateOfSubmit: this.moment(date),
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    selectService: null,
    services: [],
    note: "",
    date: null,
    currentDate: new Date().toISOString().substr(0, 10),
    modal: false,
    checkbox: false,
    lazy: false,
    dataHours: [],
    disable: true
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("MMMM DD YYYY") : "";
    }
  },

  methods: {
    selectDate() {
      const list = this.dataHours[0].hoursRequested; //list of date being booked by clients
      const index = this.services.map(e => e.name).indexOf(this.selectService);
      const time = this.services[index].time;
      const date = `${this.date}T00:00:00.000Z`;
      console.log(list);

      if (!list.some(item => item.date == date)) {
        this.dataHours[0].hoursRequested.push({ date: date, minutes: time });
      } else {
        const indexDate = list.map(e => e.date).indexOf(date);
        const totalTime = list[indexDate].minutes + time;
        if (totalTime > this.dataHours[0].totalHours) {
          this.alertDisplay();
          this.date = this.currentDate;
        } else {
          list[indexDate].minutes += time;
        }
      }
      console.log(list);
    },

    submitHours() {
      // console.log(this.dataHours[0]);
      updateHours(this.dataHours[0])
        .then(data => {
          this.$emit("updateHours", data.data);
          // console.log(data.data)
        })
        .catch(err => console.log(err.error));
    },
    alertDisplay() {
      // this.$swal('Heading', 'this is a Heading', 'OK');
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "The date is not available anymore!"
        // footer: '<a href>Why do I have this issue?</a>'
      });
    },

    validate() {
      // this.submitRequest()
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.submitHours();
        this.firstname = this.lastname = this.contact = this.email = this.note = this.selectService = this.date = null;
        this.checkbox = false;
        this.snackbar = true;
        this.$refs.form.reset();
        // this.submitRequest();
        // this.firstname = this.lastname = this.contact = this.email = this.note = this.selectService = null;
      }
    },

    submitRequest() {
      if (this.note == "") {
        this.note = "No note is added!";
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
        action: this.action,
        dateOfSubmit: moment().format("MMMM Do YYYY, h:mm:ss a"),
        dateOfAccomplish: "None"
      };
      createAppointment(data)
        .then(data => {
          this.$emit("createAppointment", data.data);
        })
        .catch(err => console.log(err.error));
    }
  },
  mounted() {
    getServices()
      .then(data => (this.services = data.data))
      .catch(err => console.log(err));
    getHours()
      .then(data => (this.dataHours = data.data))
      .catch(err => console.log(err));
  }
};
</script>


<style>
.v-sheet--offset {
  top: -25px;
  position: relative;
}

h1 {
  float: right;
  margin-top: 80px;
  margin-right: 100px;
}
</style>