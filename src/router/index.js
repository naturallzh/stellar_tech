import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exhibition from '../views/Exhibition.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/exhibition',
    name: 'Exhibition',
    component: Exhibition
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: AboutUs
  },
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: ContactUs
  }
]

const router = new VueRouter({
  routes
})

export default router
