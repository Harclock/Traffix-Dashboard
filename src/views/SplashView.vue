<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/splash-screen.css'

import { onMounted } from 'vue'

const load = () => {
  setTimeout(() => {
    this.$router.push('/MainPage');
  }, 3000); // Mostra lo splash per 3 secondi
}

onMounted(load)
</script>

<template>
	<div class="page-in splash-image">
		<h1 class="traffix">TRAFFIX</h1>
	</div>
</template>