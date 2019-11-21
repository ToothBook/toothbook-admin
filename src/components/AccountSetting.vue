<template>
  <!-- <v-row justify="center"> -->
    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> -->
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card class="mt-4 pa-8" height="100%">
        <v-card-title class="headline">Account Settings</v-card-title>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
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
        <v-card-title>
          <span class="headline">Admin Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="username" label="Username*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog1 = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
         </v-list-item-content>
         </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-title class="headline">Operation Settings</v-card-title>
        <v-list three-line subheader>
          <v-subheader>Operational Controls</v-subheader>
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
        <v-card-title>
          <span class="headline">Total Working Hours</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="hours" label="Total Hours" type="number" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateTotalHours">Save</v-btn>
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
import {updateAccount, updateHours, getHours} from '../helpers/actions'
  export default {
    name: 'accountSettings',
    data () {
      return {
        username:'',
        password:'',
        hours:0,
        dialog1: false,
        dialog2: false,
        notifications: false,
        sound: true,
        widgets: false,
        data: 0, 
      }
    },
    methods:{
      updateAccount(){
        const data = {username: this.username, password: this.password}
        updateAccount(data)
        .then(data => {
            this.$emit('updateAccount', data.data)
            console.log(data.data)
            this.username = data.username;
            this.password = data.password
          })
            .catch(err => alert(err.error));
      },

      updateTotalHours(){
        const data = {totalHours: this.hours}
        updateHours(data)
          .then(data => {
              this.$emit('updateHours', data.data)
              console.log(data.data)
              // this.hours = data.data[0].totalHours
              this.dialog2 = false;
            })
              .catch(err => alert(err.error));
      },
      close(){
        this.dialog2 = false;
        console.log(this.data)
        this.hours = this.data
      }
    },
  mounted() {
        getHours()
            .then(data => (this.hours = this.data = data.data[0].totalHours))
            .catch(err => alert(err))
    }
  }
</script>