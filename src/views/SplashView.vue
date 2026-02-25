<template>
	<div class="page-in splash-image">
		<h1 class="traffix">TRAFFIX</h1>
	</div>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/splash-screen.css'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { isAuthenticated, isLoading } = useAuth0()

// Funzione che decide dove andare dopo i 3 secondi di splash
const redirect = () => {
  if (isAuthenticated.value) {
    router.push('/MainPage')
  } else {
    router.push('/Login') 
  }
}

const startSplashTimer = () => {
  setTimeout(() => {
    // Se Auth0 ha finito di caricare, reindirizza subito
    if (!isLoading.value) {
      redirect()
    } else {
      // Se sta ancora caricando (connessione lenta), 
      // aspettiamo che isLoading diventi false tramite il watch
    }
  }, 3000)
}

// Se il caricamento finisce DOPO i 3 secondi, il watcher si attiva
watch(isLoading, (loading) => {
  if (!loading) {
    redirect()
  }
})

onMounted(() => {
  startSplashTimer()
})
</script>