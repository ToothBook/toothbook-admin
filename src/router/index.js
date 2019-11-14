import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Services from '../components/Schedule.vue'
import Login from '../views/Login.vue'
import Client from '../views/Clients.vue'
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
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/",
            redirect: {
                path: "/admin"
            },
            meta: {
                tokenRequired: false
            }
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Admin,
            meta: {
                tokenRequired: false
            }
        },
        {
            path: '/services',
            name: 'services',
            component: Services,
            meta: {
                tokenRequired: false
            }
        },
        {
            path: '/clients',
            name: 'Clients',
            component: Client,
            meta: {
                tokenRequired: false
            }
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

export default router