import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store"

Vue.use(VueRouter)

// check if FB and goole is logined.
const isLogined = function (to, from, next) {
  const isFbLogined = store.state.isFbLogined

  if (!isFbLogined) {
    next('/')
    return
  }

  next()
}

const routes = [
  {
    path: '/',
    name: 'FB-login',
    component: () => import("../views/FbLogin.vue"),
  },
  {
    path: '/GoogleLogin',
    name: 'GOOGLE-login',
    component: () => import("../views/GoogleLogin.vue"),
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: isLogined
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
