import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPageView.vue'
import SplashView from '../views/SplashView.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashView
  },
  {
    path: '/MainPage',
    name: 'mainpage',
    component: MainPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router