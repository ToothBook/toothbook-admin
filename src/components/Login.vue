<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    height="1000"
  >
         <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 lg6>
                <v-card class="elevation-12">
              <v-toolbar
                dark
                flat
                prominent
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
              >
                        <v-toolbar-title>Login Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                prepend-icon="person"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                                data-cy="signinEmailField"
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                type="password"
                                data-cy="signinPasswordField"
                                v-model="password"
                                :rules="passwordRules"
                                required
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            rounded
                            large
                            color="primary"
                            :disabled="!valid"
                            @click="submit"
                            to="/admin"
                            data-cy="signinSubmitBtn"
                            >Login</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
  </v-parallax>
</template>


<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: false,
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("userLogin", {
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>
