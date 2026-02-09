<template>
	<aside class="sidebar" :class="{ open: isOpen }">
		<div class="sidebar-top">
			<h1 class="traffix">TRAFFIX</h1>
			<button id="close-sidebar-button" @click="close">✕</button>
		</div>

		<nav class="sidebar-middle">
			<ul>
				<li v-for="n in 6" :key="n">Modulo {{ n }}</li> <!-- da cambiare con richiesta moduli e passaggio tra le pagine di questa lista -->
			</ul>
		</nav>

		<div class="sidebar-bottom">
			<div class="user"></div>
			<div class="home-button"></div>
			<div class="settings"></div>
		</div>
	</aside>

	<div v-if="isOpen" class="overlay" @click="close"></div>
</template>

<script setup>
defineProps({
	isOpen: {
		type: Boolean,
		required: true
	}
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>