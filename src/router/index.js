import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Services from '../components/Schedule.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
      {
        path: '/',
        name: 'Login',
        component: Login
      },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/services',
        name: 'services',
        component: Services
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router