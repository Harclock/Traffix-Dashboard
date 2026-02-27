// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore' // Importa lo store Pinia

// Importiamo i componenti delle pagine base
import Splash from '@/views/SplashView.vue'
import Login from '@/views/LoginView.vue'
import MainPageView from '@/views/MainPageView.vue'
import AppModule from '@/components/layout/AppModule.vue' // Il contenitore della dashboard

// Importiamo i componenti dei moduli dinamici
import GestionePremi from '@/views/modules/GestionePremi.vue'
import GestioneModuli from '@/views/modules/GestioneModuli.vue'
import GestioneProblematiche from '@/views/modules/GestioneProblematiche.vue'
import GestioneRuoli from '@/views/modules/GestioneRuoli.vue'
import GestioneUtenti from '@/views/modules/GestioneUtenti.vue'
import StatisticheTraffico from '@/views/modules/StatisticheTraffico.vue'
import VisioneLog from '@/views/modules/VisioneLog.vue'
import VisualizzazioneTraffico from '@/views/modules/VisualizzazioneTraffico.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/MainPage',
    name: 'main_page',
    component: MainPageView,
    // Protezione rotta: assicura che solo loggati vedano la dashboard principale
    beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.userEmail) {
            next()
        } else {
            next('/Login')
        }
    }
  },
  {
    path: '/dashboard/:module',
    name: 'AppModule',
    component: AppModule,
    // props dinamiche per caricare il componente giusto
    props: route => {
      // QUESTA MAPPA DEVE CORRISPONDERE AI CODICI IN userStore.modules
      const mapping = {
        'GestioneModuli' : GestioneModuli,
        'GestionePremi' : GestionePremi,
        'GestioneProblematiche' : GestioneProblematiche,
        'GestioneRuoli' : GestioneRuoli,
        'GestioneUtenti' : GestioneUtenti,
        'StatisticheTraffico' : StatisticheTraffico,
        'VisioneLog' : VisioneLog,
        'VisualizzazioneTraffico' : VisualizzazioneTraffico
      }
      return { moduleComponent: mapping[route.params.module] }
    },
    // Protezione rotta basata su Pinia
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      
      // Controllo se il modulo richiesto è tra quelli caricati nello store
      if (userStore.modules.includes(to.params.module)) {
        next()
      } else {
        // Se non ha i permessi, rimanda a una pagina di errore o alla home
        next('/404') 
      }
    }
  },
  // Catch-all route per 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard Globale
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const publicPages = ['/', '/Login']
  const authRequired = !publicPages.includes(to.path)

  // Se l'utente tenta di accedere a pagine protette senza essere loggato
  if (authRequired && !userStore.userEmail) {
    return next('/Login')
  }

  next()
})

export default router