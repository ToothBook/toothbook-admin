import Vue from 'vue'
import Vuex from 'vuex'
import {
    isNull
} from "util";
// import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticated: isNull(sessionStorage.getItem("authenticated")) ? false : true
    },
    mutations: {
        setAuthentication(state, status) {
            sessionStorage.setItem("authenticated", status)
            state.authenticated = status;
        }
    },
    actions: {},
    modules: {}
})