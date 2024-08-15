<template>
  <VTextField rounded v-model="search" label="Search" placeholder="Search for products..." />
</template>

<script setup>
const search = ref('');
</script>
