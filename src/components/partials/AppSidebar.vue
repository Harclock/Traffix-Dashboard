<template>
    <aside class="sidebar" :class="{ open: isOpen }">
        <div class="sidebar-top">
            <h1 class="traffix">TRAFFIX</h1>
            <button id="close-sidebar-button" @click="close">✕</button>
        </div>

        <nav class="sidebar-middle">
            <ul>
                <li v-for="modulo in userStore.modules" :key="modulo">
                    <router-link 
                        :to="`/${modulo}`" 
                        class="menu-item"
                        @click="close"
                    >
                        {{ formatModuleName(modulo) }}
                    </router-link>
                </li>
            </ul>
        </nav>

        <div class="sidebar-bottom">
            <div class="user"></div>
            <div class="home-button" @click="goHome"></div>
            <div class="settings"></div>
        </div>
    </aside>

    <div v-if="isOpen" class="overlay" @click="close"></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close'])
const close = () => emit('close')

const goHome = () => {
    router.push('/MainPage')
    close()
}

// Helper per rendere 'mappa_trento' -> 'Mappa Trento'
const formatModuleName = (name) => {
    return name
        .replace(/([a-z])([A-Z])/g, '$1 $2')
}
</script>

<style scoped>
.menu-item {
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
    padding: 10px;
}
.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
}
</style>