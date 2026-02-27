<template>
    <AppHeader v-if="!isInIframe" @open-sidebar="sidebarOpen = true" />
    
    <AppSidebar
        v-if="!isInIframe"
        :isOpen="sidebarOpen"
        @close="sidebarOpen = false"
    />

    <main :class="{ 'in-iframe': isInIframe }">
        <transition name="fade" mode="out-in">
            <component :is="moduleComponent" />
        </transition>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/partials/AppHeader.vue'
import AppSidebar from '@/components/partials/AppSidebar.vue'

defineProps({
    moduleComponent: {
        type: Object,
        required: true
    }
})

const sidebarOpen = ref(false)

// CONTROLLO IFRAME
const isInIframe = ref(false)

onMounted(() => {
    // window.self è la finestra corrente
    // window.top è la finestra principale
    // Se sono diversi, siamo dentro un iframe
    isInIframe.value = window.self !== window.top
})
</script>

<style scoped>
/* Stili per adattare il contenuto dentro l'iframe */
.in-iframe {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    overflow: hidden;
}
</style>