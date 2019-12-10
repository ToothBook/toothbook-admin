<template>
  <v-app light>
    <v-toolbar fixed height="100" color="white">
      <v-avatar tile size="62">
        <img src="../assets/totii.png" alt="Vuetify.js" height="500">
      </v-avatar>
      <v-toolbar-title
        style="font-style: Cursive"
        class="text-center display-2 font-weight-bold"
      >Where smiles come alive...</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <section>
        <Carousel/>
      </section>
      <Form/>
      <section>
        <v-layout column wrap class="my-12" align-center>
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <br>
              <h2 class="headline">The best way to start your day!</h2>
            </div>
          </v-flex>
          <br>
          <br>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-information</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">About us</div>
                    </v-card-title>
                    <v-card-text>Toothbook is the official website for (clinic-name). This site allows client who has dental problem to reserve for a schedule ahead of his planned check up or transaction. <br>This would reduce wait time and create better customer services, thus, customers are getting the service when they expect it without having to wait around to do so.</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-settings</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Available Services</div>
                    </v-card-title>
                    <v-card-text>
                      Toothbook's dental services includes:
                      <li>Dental Cleaning</li>
                      <li>Tooth Filling</li>
                      <li>Tooth Extraction</li>
                      <li>Fluoride Treatment</li>
                      <li>Ceramic Braces</li>
                      <li>Dental Implants</li>
                      <li>and many more..</li>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-account-multiple</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">People Behind</div>
                    </v-card-title>
                    <v-card-text>Toothbook is especially made by a Group of four women as part of their Web Development III finals deliverables. <br>Our developers includes:
                      <li>Mary Grace C. Tiburillo</li>
                      <li>Jessa Jaladoni</li>
                      <li>Ivy Joy Devilleres</li>
                      <li>Geneva Rivas</li>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <br>
      <br>

      <section>
        <v-parallax src="../assets/background4.jpg" height="380">
          <v-layout column align-center justify-center>
            <div
              class="headline white--text mb-4 text-center"
            >Leading the way in results driven care.</div>
            <em>We take care of your smile</em>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Yes Dental Care Clinic is committed to help each patients.We are the leading team in dentistry today. Started from
                  four dedicated individuals who share the common ideal of being genuinely concerned
                  with your overall health and self-esteem. We will provide you with a dazzling smile using the finest materials, the very latest in cutting-edge technology,
                  and the most advanced skills and services. You will receive a truly remarkable, relaxing experience while we focus on your comfort.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>You may find and contact us through the following:</v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>777-867-5309</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Nasipit Road, Talamban, Cebu City</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>toothbook@gmail.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>
 <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
 <script>
import Carousel from "../components/Carousel";
import Form from "../components/ClientForm";
export default {
  name: "landingPage",
  components: {
    Carousel,
    Form
  },
  data: () => ({
    title: "Your Logo"
  })
};
</script>
 