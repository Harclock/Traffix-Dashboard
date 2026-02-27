<script setup>
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useUserStore } from '@/stores/userStore' // Assicurati che il percorso sia corretto

const router = useRouter()
const userStore = useUserStore()
const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0()

// Funzione per caricare i moduli dal DB
const fetchUserModules = async (email) => {
  if (!email) return;
  
  try {
    console.log("Caricamento moduli per:", email);
    // Qui andrà la tua fetch reale, per ora simuliamo:
    const mockModules = ['GestioneModuli', 'GestionePremi', 'VisualizzazioneTraffico']; 
    userStore.setModules(mockModules);
    
    // Una volta caricati i moduli, possiamo andare alla MainPage
    router.push('/MainPage');
  } catch (error) {
    console.error("Errore nel caricamento moduli:", error);
  }
}

const checkAuthAndRedirect = () => {
  // Se Auth0 sta ancora caricando la sessione, non fare nulla
  if (isLoading.value) return;

  // Timer per lo Splash (3 secondi)
  setTimeout(async () => {
    if (isAuthenticated.value && user.value) {
      // UTENTE LOGGATO: Preleviamo la mail e carichiamo i moduli
      await fetchUserModules(user.value.email);
    } else if (!isAuthenticated.value) {
      // UTENTE NON LOGGATO: Vai alla tua pagina personalizzata di Auth0
      loginWithRedirect();
    }
  }, 3000)
}

// Watcher: se il caricamento di Auth0 finisce mentre siamo sulla pagina
watch(isLoading, (loading) => {
  if (!loading) {
    checkAuthAndRedirect()
  }
})

onMounted(() => {
  if (!isLoading.value) {
    checkAuthAndRedirect()
  }
})
</script>

<template>
  <div class="page-in splash-image">
    <div class="content">
      <h1 class="traffix">TRAFFIX</h1>
      <div v-if="isLoading || isAuthenticated" class="loader">Caricamento moduli...</div>
    </div>
  </div>
</template>

<style scoped>
.content {
  text-align: center;
}
.loader {
  color: white;
  margin-top: 20px;
  font-family: sans-serif;
  letter-spacing: 1px;
}
</style>