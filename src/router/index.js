import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Services from '../components/Schedule.vue'
import ClientForm from '../components/ClientForm.vue'
import Login from '../views/Login.vue'
import Client from '../views/Clients.vue'
import store from "../store"
import AccountSettings from '../components/AccountSetting.vue';

// import { isNullOrUndefined } from 'util'

Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == true) {
                    next("/admin");
                } else {
                    next();
                }
    
            },
        },
        {
            path: "/",
            redirect: {
                path: "/admin"
            },
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Admin,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: '/services',
            name: 'services',
            component: Services,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: '/clients',
            name: 'Clients',
            component: Client,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: '/account-settings',
            name: 'Settings',
            component: AccountSettings,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: '/clients-form',
            name: 'ClientsForm',
            component: ClientForm,
            // beforeEnter: (to, from, next) => {
            //     if (store.state.authenticated == false) {
            //         next("/login");
            //     } else {
            //         next();
            //     }
            // }
        },
        {
            path: "*",
            redirect: {
                path: "/"
            }
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     if (!to.meta.tokenRequired) {
//         if (!isNullOrUndefined(localStorage.getItem("isAuthenticated"))) {
//             next("/login");
//         } else {
//             next();
//         }
//     } else {
//         if (isNullOrUndefined(localStorage.getItem("isAuthenticated"))) {
//             next("/");
//         } else {
//             next();
//         }
//     }
// });

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next({ path: "/" });
        }
    }
    next();
});

export default router