import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue' // Usa questo!
import { domain, clientId } from '../auth_config.json'

const app = createApp(App)

app.use(
  createAuth0({
    domain: domain,
    clientId: clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    cacheLocation: 'localstorage' // Fondamentale per il "Remember Me"
  })
)

app.use(router).mount('#app')