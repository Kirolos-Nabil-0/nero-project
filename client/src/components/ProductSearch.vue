<template>
  <v-text-field v-model="props.search" label="ابحث من هنا..." variant="outlined" class="search-field align-self-center"
    prepend-inner-icon="mdi-magnify" single-line rounded />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  search: String,
});
</script>

<style scoped>
.search-field {
  width: 100%;
  margin-bottom: 8px;
}

@media (min-width: 600px) {
  .search-field {
    width: 70%;
    margin-bottom: 0;
  }
}
</style>
