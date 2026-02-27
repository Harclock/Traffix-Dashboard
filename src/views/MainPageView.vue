<template>
    <AppHeader @open-sidebar="sidebarOpen = true" />

    <AppSidebar
        :isOpen="sidebarOpen"
        @close="sidebarOpen = false"
    />

    <main>
        <div class="modules">
            <div 
                v-for="moduloCodice in userStore.modules" 
                :key="moduloCodice" 
                class="body-modules"
                @dblclick="navigaAModulo(moduloCodice)"
            >
                <iframe 
                    :src="`/dashboard/${moduloCodice}`" 
                    frameborder="0"
                    class="module-preview-iframe"
                ></iframe>
            </div>
        </div>
    </main>

    <footer class="view-options">
        <div>
            <span>Visualizzazione: </span>
            <button id="grid-view-btn">Griglia</button>
            <button id="list-view-btn">Lista</button>
        </div>
        <div class="zoom-controls">
            <span>Zoom: </span>
            <button id="zoom-out">−</button>
            <input type="range" id="zoom-range" min="0.5" max="2" step="0.1" value="1" />
            <button id="zoom-in">+</button>
            <span id="zoom-value">100%</span>
        </div>
    </footer>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/main-page.css'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore' // Importa Pinia
import AppHeader from '@/components/partials/AppHeader.vue'
import AppSidebar from '@/components/partials/AppSidebar.vue'

const router = useRouter()
const userStore = useUserStore() // Inizializza Pinia
const sidebarOpen = ref(false)

// Navigazione diretta
const navigaAModulo = (codice) => {
    router.push(`/dashboard/${codice}`)
}
</script>

<style scoped>
.module-preview-iframe {
    width: 100%;
    height: 100%;
    border: none; /* Rimuove il bordo predefinito dell'iframe */
    pointer-events: none; /* Disabilita interazione dentro la preview */
}
</style>