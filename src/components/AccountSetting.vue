<template>
  <!-- <v-row justify="center"> -->
  <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> -->
  <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
  </template>-->
  <v-card class="pa-12" height="100%">
    <v-card-title class="headline">
      <v-icon large class="mr-2">mdi-account</v-icon>Account Settings
    </v-card-title>
    <v-list three-line subheader>
      <!-- <v-subheader>User Controls</v-subheader> -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Username</v-list-item-title>
          <v-list-item-subtitle>{{username}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Password</v-list-item-title>
          <v-list-item-subtitle>{{password}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-row justify="center">
            <v-dialog v-model="dialog1" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="light-blue darken-2" v-on="on" absolute right text>Edit Account</v-btn>
              </template>
              <v-card>
                <v-card-title class="black--text">
                  <v-list-item-avatar tile right size="62">
                    <img src="../assets/toothbook-logo5.png" />
                  </v-list-item-avatar>
                  <span class="headline">Admin Account</span>
                </v-card-title>
                <v-divider color="light-blue lighten-2"></v-divider>
                <v-card-text>
                  <v-container>
                    <v-form class="mt-10" ref="form" v-model="valid" :lazy-validation="lazy1">
                      <v-text-field
                        v-model="username"
                        :rules="inputRules"
                        outlined
                        dense
                        label="Username"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :rules="inputRules"
                        outlined
                        dense
                        label="Password"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog1= false">Cancel</v-btn>
                  <v-btn color="blue darken-1" text :disabled="!valid" @click="alertUpdate">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-card-title class="headline">
      <v-icon large class="mr-2">mdi-wrench</v-icon>Operation Settings
    </v-card-title>
    <v-list three-line subheader>
      <!-- <v-subheader>Operational Controls</v-subheader> -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Total Working Minutes Per Day</v-list-item-title>
          <v-list-item-subtitle>{{hours}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="400px">
              <template v-slot:activator="{ on }">
                <v-btn color="light-blue darken-2" v-on="on" absolute right text>Set Hours</v-btn>
              </template>
              <v-card>
                <v-card-title class="black--text">
                  <v-list-item-avatar tile right size="62">
                    <img src="../assets/toothbook-logo5.png" />
                  </v-list-item-avatar>
                  <span class="headline">Total Working Minutes</span>
                </v-card-title>
                <v-divider color="light-blue lighten-2"></v-divider>
                <v-card-text>
                  <v-container>
                    <v-form class="mt-10" ref="form" v-model="valid" :lazy-validation="lazy2">
                      <v-text-field
                        v-model="hours"
                        type="number"
                        :rules="inputRules"
                        outlined
                        dense
                        label="Total Minutes"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog2 = false">Cancel</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :disabled="!valid"
                    @click="alertUpdateTime"
                  >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import {
  updateAccount,
  updateHours,
  getHours,
  getAccount
} from "../helpers/actions";
export default {
  name: "accountSettings",
  data() {
    return {
      username: "",
      password: "",
      hours: 0,
      dialog1: false,
      dialog2: false,
      notifications: false,
      sound: true,
      widgets: false,
      data: 0,
      lazy1: false,
      lazy2: false,
      valid: false,
      inputRules: [v => !!v || "Input is required"],
      id: 0,
    };
  },
  methods: {
    updateAdmin() {
      const data = {
        username: this.username,
        password: this.password
      };
      updateAccount(data, this.id)
        .then(data => {
          this.$emit("updateAccount", data.data);
          console.log(data.data);
          this.dialog1= false
          this.username = data.data[0].username;
          this.password = data.data[0].password;
        })
        .catch(err => console.log(err.error));
    },

    updateTotalHours() {
      const data = {
        totalHours: this.hours
      };
      updateHours(data)
        .then(data => {
          this.$emit("updateHours", data.data);
          console.log(data.data);
          // this.hours = data.data[0].totalHours
          this.dialog2 = false;
        })
        .catch(err => alert(err.error));
    },
    // close() {
    //   this.dialog2 = false;
    //   console.log(this.data);
    //   this.hours = this.data;
    // },

    alertUpdate() {
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
          this.updateAdmin();
          Swal.fire({
            title: "Updated!",
            text: "Account has been updated.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    alertUpdateTime() {
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
          this.updateTotalHours();
          Swal.fire({
            title: "Updated!",
            text: "Time has been updated.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  },
  mounted() {
    getHours()
      .then(data => (this.hours = this.data = data.data[0].totalHours))
      .catch(err => alert(err));
    getAccount()
      .then(
        data => (
          (this.username = data.data[0].username),
          (this.password = data.data[0].password),
          (this.id = data.data[0]._id),
          console.log(data.data[0])
        )
      )
      .catch(err => alert(err));
  }
};
</script>
