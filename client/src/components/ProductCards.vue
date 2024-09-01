<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
        <v-card class="product-card">
          <v-card-title class="d-flex justify-space-between">
            <span class="product-name">{{ product.name }}</span>
            <v-icon v-if="product.icon" :color="product.iconColor">{{ product.icon }}</v-icon>
          </v-card-title>

          <v-card-subtitle class="d-flex justify-space-between">
            <span>سعر الشراء: {{ product.buyPrice }}</span>
            <span>سعر البيع: {{ product.sellPrice }}</span>
          </v-card-subtitle>

          <v-card-text class="d-flex justify-space-between">
            <span>الكمية: {{ product.amount }}</span>
            <span>اخر تعديل: {{ formatDate(product.updatedAt) }}</span>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="primary" @click="editProduct(product)">
              تعديل
            </v-btn>
            <v-btn color="red" @click="deleteProduct(product)">
              حذف
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  filteredProducts: Array,
});

const emit = defineEmits(['edit-product', 'delete-product']);

const editProduct = (item) => {
  emit('edit-product', item);
};

const deleteProduct = (item) => {
  emit('delete-product', item);
};

const formatDate = (date) => new Date(date).toLocaleDateString();
</script>

<style scoped>
.product-card {
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: white;
}

.product-name {
  font-weight: bold;
}

.v-card-subtitle,
.v-card-text {
  font-size: 0.875rem;
}
</style>
