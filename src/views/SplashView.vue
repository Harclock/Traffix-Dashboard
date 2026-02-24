<template>
	<div class="page-in splash-image">
		<h1 class="traffix">TRAFFIX</h1>
	</div>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/splash-screen.css'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const load = () => {
  setTimeout(() => {
    router.push('/MainPage')
  }, 3000)
}

onMounted(load)
</script>