<template>
	<header>
		<button id="open-sidebar-button" @click="$emit('open-sidebar')">
			☰
		</button>

		<h1 class="traffix">TRAFFIX</h1>

		<div id="user">👤 User</div>
	</header>
</template>

<script setup>
defineEmits(['open-sidebar'])
</script>