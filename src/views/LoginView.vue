<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/login.css'
import { useAuth0 } from '@auth0/auth0-vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const { loginWithRedirect, loginWithPopup, user, isAuthenticated } = useAuth0()
const userStore = useUserStore()
const router = useRouter()

// Funzione per il Login Standard (Email/Password)
const handleLogin = async () => {
  // Con Auth0, di solito si usa il redirect alla loro pagina sicura
  await loginWithRedirect({
    appState: { target: '/MainPage' }
  });
};

// Esempio: Come caricare i moduli dal DB dopo il login
const fetchUserModules = async (email) => {
  try {
    // Sostituisci con la tua chiamata API reale
    // const response = await fetch(`https://tuo-api.com/user-modules?email=${email}`);
    // const data = await response.json();
    
    // Simulazione dati dal DB
    const mockModules = ['Dashboard', 'Statistiche', 'Mappe']; 
    userStore.setModules(mockModules);
  } catch (error) {
    console.error("Errore nel caricamento moduli:", error);
  }
}
</script>

<template>
  <div class="page-in">
    <header>
      <h1 class="traffix">TRAFFIX</h1>
    </header>

    <main>
      <div class="login-wrapper">
        <div class="login-box">
          <div class="logo-circle">
            <img src="@/assets/Multimedial/Img/logo.png" alt="Traffix Logo" />
          </div>
          <h2>Accedi al tuo account</h2>

          <form @submit.prevent="handleLogin">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            <div class="options">
              <label><input type="checkbox" /> Ricordami</label>
              <a href="#">Password dimenticata?</a>
            </div>

            <button type="submit">Login</button>
          </form>

          <div class="oauth-sep"><span>oppure</span></div>
          <div class="oauth-buttons">
            <button class="oauth-btn google" @click="loginWithRedirect()">
              Continua con Google
            </button>
            <button class="oauth-btn cie">Accedi con CIE</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>