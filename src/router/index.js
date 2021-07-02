import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CreateThread from "../pages/CreateThread.vue"

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/CreateThread',
    component: CreateThread
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
