import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPageView.vue'
import Splash from '../views/SplashView.vue'
import Login from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash
  },
  {
    path: '/MainPage',
    name: 'mainpage',
    component: MainPage
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router