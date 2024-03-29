import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(VueSweetalert2);
//Vue.config.productionTip = false
// import Axios from 'axios'

// Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
// const token = localStorage.getItem("token");
// if (token) {
//     Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
// }

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')