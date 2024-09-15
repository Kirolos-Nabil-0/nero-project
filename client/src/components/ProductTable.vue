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

      <template #item.history-btn="{ item }">
        <v-icon color="primary" @click="showHistory(item)">
          mdi-history
        </v-icon>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="historyDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">السجل</span>
      </v-card-title>

      <v-card-text>
        <v-list dense class="history-list">
          <v-list-item v-for="(history, index) in selectedItem?.history" :key="index" class="history-list-item">
            <v-list-item-content>
              <v-list-item-title class="history-date">{{ formatDate(history.date) }}</v-list-item-title>
              <v-list-item-subtitle class="history-details">
                الكمية: <strong>{{ history.amount }}</strong>، سعر الشراء: <strong>{{ history.buyPrice }}</strong>،
                سعر البيع: <strong>{{ history.sellPrice }}</strong>
              </v-list-item-subtitle>
              <v-list-item-subtitle class="history-editor">
                المحرر: <strong>{{ history.editor.username }}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="historyDialog = false">إغلاق</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// Define reactive variables
const historyDialog = ref(false);
const selectedItem = ref(null);

// Function to show history dialog
const showHistory = (item) => {
  selectedItem.value = item;
  historyDialog.value = true;
};

// Define props
const props = defineProps({
  filteredProducts: Array,
  headers: Array,
  loading: Boolean,
  loadingText: String,
  noDataText: String,
});

// Define emit events
const emit = defineEmits(['edit-product', 'delete-product']);

// Function to edit product
const editProduct = (item) => {
  emit('edit-product', item);
};

// Function to delete product
const deleteProduct = (item) => {
  emit('delete-product', item);
};

// Function to format date
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

.history-list {
  padding: 0;
}

.history-list-item {
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.history-list-item:hover {
  background-color: #e0e0e0;
}

.history-date {
  font-weight: bold;
  color: #1976d2;
}

.history-details,
.history-editor {
  font-size: 0.9rem;
  color: #616161;
}

@media (max-width: 768px) {
  .v-data-table {
    font-size: 0.875rem;
  }

  .v-icon {
    font-size: 1rem;
  }

  .history-list-item {
    padding: 8px;
  }

  .history-details,
  .history-editor {
    font-size: 0.8rem;
  }
}
</style>
