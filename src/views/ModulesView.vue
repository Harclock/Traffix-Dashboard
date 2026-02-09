<template>
	<AppHeader @open-sidebar="sidebarOpen = true" />

	<AppSidebar
		:isOpen="sidebarOpen"
		@close="sidebarOpen = false"
	/>

	<main class="dashboard-body">
		<!-- QUI VIENE CARICATO IL MODULO -->
		<component :is="activeModule" />
	</main>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

defineProps({
	activeModule: {
		type: Object,
		required: true
	}
})

const sidebarOpen = ref(false)
</script>
