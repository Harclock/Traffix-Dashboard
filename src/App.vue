<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const load = () => {
  router.push('/')
}

onMounted(load)
</script>