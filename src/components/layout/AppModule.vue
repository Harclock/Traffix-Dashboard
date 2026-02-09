<template>
	<AppHeader @open-sidebar="sidebarOpen = true" />

	<AppSidebar
		:isOpen="sidebarOpen"
		@close="sidebarOpen = false"
	/>

	<main class="dashboard-body">
		<!-- CONTENUTO DINAMICO -->
		<component :is="moduleComponent" />
	</main>
</template>

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
