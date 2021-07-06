import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CreateThread from "../pages/CreateThread.vue"
import ComingSoon from "../pages/ComingSoon.vue"

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/CreateThread',
    component: CreateThread
  },
  {
    path: "/Questions",
    component: ComingSoon
  },
  {
    path: "/Tags",
    component: ComingSoon
  },
  {
    path: "/Unanswered",
    component: ComingSoon
  },
  {
    path: "/History",
    component: ComingSoon
  },
  {
    path: "/Profile",
    component: ComingSoon
  },
  {
    path: "/Star",
    component: ComingSoon
  },
  {
    path: "/Settings",
    component: ComingSoon
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
