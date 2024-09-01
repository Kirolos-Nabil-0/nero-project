<template>
  <v-btn color="#1E3A5F" size="large" @click="onClick" class="add-product-btn align-self-baseline" dark>
    اضافة منتج جديد
  </v-btn>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  mode: String,
});

const emit = defineEmits(['open-dialog']);

const onClick = () => {
  emit('open-dialog', 'add');
};
</script>

<style scoped>
.add-product-btn {
  background-color: #243b55;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 1.1rem;
  width: 100%;
}

@media (min-width: 600px) {
  .add-product-btn {
    width: 28%;
  }
}
</style>
