<template>
  <v-row justify="center">
    <v-dialog v-model="dialog2" persistent max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="light-blue accent-4" class="mt-7" dark v-on="on">Book Schedule Now!</v-btn>
      </template>
      <v-card width="100%" class="px-1 pb-10" elevation="5">
        <v-card-title>
          <v-avatar tile size="62">
            <img src="../assets/totii.png" alt="Vuetify.js" height="500">
          </v-avatar>
          <span class="headline">Please provide the following:</span>
        </v-card-title>
        <v-card-text>
          <v-container class="scrollbar" id="style-3">
            <v-form class="force-overflow" dark ref="form" v-model="valid" :lazy-validation="lazy">
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
                    :rules="[v => !!v || 'Date is required']"
                    label="When"
                    readonly
                    v-on="on"
                    :disabled="disable"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable :min="currentDate" @change="selectDate">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false, cancelDate">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <h3 class="mb-2">Personal Information</h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
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
              >
                <template v-slot:label>
                  <div @click.stop="false">
                    Do you accept the
                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                    and
                    <a
                      href="javascript:;"
                      @click.stop="conditions = true"
                    >conditions?</a>
                  </div>
                </template>
              </v-checkbox>
            </v-form>
          </v-container>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-btn color="primary" text class="ml-5" @click="dialog2 = false, cancel()">Cancel</v-btn>
        <v-btn
          :disabled="!valid"
          color="primary"
          class="ml-5"
          text
          @click="validate, alertSubmit()"
        >Submit</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text v-for="n in 5" :key="n">{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light-blue" @click="terms = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text v-for="n in 5" :key="n">{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light-blue" @click="conditions = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
// import Terms from "../components/TermsConditionModal.vue";
import {
  createAppointment,
  getServices,
  getHours,
  updateHours
} from "../helpers/actions";

export default {
  name: "clientform",
  // components: {
  //   Terms
  // },
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
    nameRules: [
      v => !!v || "Input is required",
      v => (v && v.length <= 50) || "Input must be less than 50 characters"
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
    disable: true,
    conditions: false,
    terms: false,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc."
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("MMMM DD YYYY") : "";
    }
  },

  methods: {
    cancel() {
      this.$refs.form.reset();
    },
    selectDate() {
      const list = this.dataHours[0].hoursRequested; //list of date being booked by clients
      const index = this.services.map(e => e.name).indexOf(this.selectService);
      const time = this.services[index].time;
      const date = `${this.date}T00:00:00.000Z`;
      if (!list.some(item => item.date == date)) {
        this.dataHours[0].hoursRequested.push({
          date: date,
          minutes: time
        });
      } else {
        const indexDate = list.map(e => e.date).indexOf(date);
        const totalTime = list[indexDate].minutes + time;
        if (totalTime > this.dataHours[0].totalHours) {
          this.alertDisplay();
          this.date = null;
        } else {
          list[indexDate].minutes += time;
        }
      }
    },

    submitHours() {
      updateHours(this.dataHours[0])
        .then(data => {
          this.$emit("updateHours", data.data);
        })
        .catch(err => console.log(err.error));
    },
    alertDisplay() {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "The date is not available anymore!"
      });
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.submitHours();
        this.firstname = this.lastname = this.contact = this.email = this.note = this.selectService = this.date = null;
        this.checkbox = false;
        // this.snackbar = true;
        this.$refs.form.reset();
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
    },
    alertSubmit() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.validate();
          this.dialog2 = false;
          this.disable = true;
          Swal.fire({
            title: "Submitted!",
            text: "Your request has been submitted.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.cancelDate();
        }
      });
    },
    cancelDate() {
      getHours()
        .then(data => (this.dataHours = data.data))
        .catch(err => console.log(err));
      this.date = null;
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

.scrollbar {
  float: left;
  height: 500px;
  background: white;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 600px;
  background: white;
}

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: gray;
}
</style>
