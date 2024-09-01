<template>
  <v-card class="rounded-card" style="margin-top: 3rem">
    <v-data-table :items="filteredProducts" :headers="headers" :items-per-page="10" :loading="loading"
      :loading-text="loadingText" :no-data-text="noDataText" class="elevation-1 rounded-table">
      <template #item.name="{ item }">
        <span class="product-name">
          {{ item.name }}
          <v-icon v-if="item.icon" :color="item.iconColor" class="ml-2">{{ item.icon }}</v-icon>
        </span>
      </template>

      <template #item.edit="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" @click="editProduct(item)" title="Edit">
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit Product</span>
        </v-tooltip>
      </template>

      <template #item.delete="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="red" @click="deleteProduct(item)" title="Delete">
              mdi-delete
            </v-icon>
          </template>
          <span>Delete Product</span>
        </v-tooltip>
      </template>

      <template #item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  filteredProducts: Array,
  headers: Array,
  loading: Boolean,
  loadingText: String,
  noDataText: String,
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
.rounded-card,
.rounded-table {
  border-radius: 8px;
}

.product-name {
  display: flex;
  align-items: center;
}

.v-data-table__wrapper {
  overflow-x: auto;
}

.v-data-table__wrapper th,
.v-data-table__wrapper td {
  white-space: nowrap;
}


@media (max-width: 768px) {
  .v-data-table {
    font-size: 0.875rem;
  }

  .v-icon {
    font-size: 1rem;
  }
}
</style>
