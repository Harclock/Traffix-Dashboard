<template>
	<AppHeader @open-sidebar="sidebarOpen = true" />

	<AppSidebar
		:isOpen="sidebarOpen"
		@close="sidebarOpen = false"
	/>

	<main>
		<div class="modules">
			<div 
				v-for="mod in moduliAutorizzati" 
				:key="mod.id" 
				class="body-modules"
				:class="mod.classiCss"
				@dblclick="navigaAModulo(mod.codice)"
			>
				<h3>{{ mod.titolo }}</h3>
				<iframe v-if="mod.previewUrl" :src="mod.previewUrl" frameborder="0"></iframe>
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
			<input
				type="range"
				id="zoom-range"
				min="0.5"
				max="2"
				step="0.1"
				value="1"
			/>
			<button id="zoom-in">+</button>
			<span id="zoom-value">100%</span>
		</div>
	</footer>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/main-page.css'

import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

const sidebarOpen = ref(false)
</script>
