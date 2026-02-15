// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importiamo i componenti delle pagine create
import MappaTrento from '@/views/MappaTrento.vue'
import GestioneSegnalazioni from '@/views/GestioneSegnalazioni.vue'
import GestionePremi from '@/views/GestionePremi.vue'

const routes = [
  {
    path: '/dashboard/:module',
    name: 'AppModule',
    component: () => import('@/views/AppModule.vue'),
    props: route => {
      // Mappatura dinamica tra parametro URL e Componente
      const mapping = {
        'mappa_trento': MappaTrento,
        'segnalazioni': GestioneSegnalazioni,
        'premi': GestionePremi
      }
      return { moduleComponent: mapping[route.params.module] }
    },
    // Protezione rotta (Front-end guard)
    beforeEnter: (to, from, next) => {
      const allowed = JSON.parse(localStorage.getItem('user_modules') || '[]')
      if (allowed.includes(to.params.module)) {
        next()
      } else {
        next('/404') // O reindirizza alla home
      }
    }
  }
]

/*
// Esempio di funzione login
const login = async (credentials) => {
  const response = await api.post('/login', credentials)
  // Esempio: response.data.modules = ['mappa_trento', 'segnalazioni']
  localStorage.setItem('user_modules', JSON.stringify(response.data.modules))
}
*/