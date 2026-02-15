<template>
    <AppHeader @open-sidebar="sidebarOpen = true" />
    <AppSidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <main class="dashboard-body">
        <transition name="fade" mode="out-in">
            <component :is="moduleComponent" />
        </transition>
    </main>
</template>

<style scoped>
.dashboard-body {
    padding: 0;
    margin: 0;
    height: calc(100vh - 60px);
    overflow: auto;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

defineProps({
	moduleComponent: {
		type: Object,
		required: true
	}
})

const sidebarOpen = ref(false)
</script>
