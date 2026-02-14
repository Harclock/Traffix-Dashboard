<template>
	<AppHeader @open-sidebar="sidebarOpen = true" />

	<AppSidebar
		:isOpen="sidebarOpen"
		@close="sidebarOpen = false"
	/>

	<main>
		<div class="settings-wrapper">
			<div class="settings-options">
				<p
					:class="isActive('utente') ? 'on' : 'off'"
					@click="setTab('utente')"
				>
					<strong>UTENTE</strong>
				</p>

				<p
					:class="isActive('sicurezza') ? 'on' : 'off'"
					@click="setTab('sicurezza')"
				>
					<strong>SICUREZZA</strong>
				</p>

				<p
					:class="isActive('grafica') ? 'on' : 'off'"
					@click="setTab('grafica')"
				>
					<strong>GRAFICHE</strong>
				</p>

				<p
					:class="isActive('contenuti') ? 'on' : 'off'"
					@click="setTab('contenuti')"
				>
					<strong>CONTENUTI</strong>
				</p>
			</div>

			<div class="settings-box">
				<div :class="isActive('utente') ? 'on' : 'off'">
					<h1>utente</h1>
				</div>

				<div :class="isActive('sicurezza') ? 'on' : 'off'">
					<h1>sicurezza</h1>
				</div>

				<div :class="isActive('grafica') ? 'on' : 'off'">
					<h1>grafica</h1>
				</div>

				<div :class="isActive('contenuti') ? 'on' : 'off'">
					<h1>contenuti</h1>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/modules/settings.css'

import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useSettingsTabs } from '@/composables/useSettingsTabs'

const sidebarOpen = ref(false)
const { setTab, isActive } = useSettingsTabs()
</script>
