import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HomeComponent.vue'
import Setup from '../components/SetupComponent.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/setup',
    name: 'state',
    component: Setup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
