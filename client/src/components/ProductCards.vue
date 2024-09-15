<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
        <v-card class="product-card hover-card">
          <v-card-title class="d-flex justify-space-between product-header">
            <span class="product-name">{{ product.name }}</span>
            <v-icon v-if="product.icon" :color="product.iconColor">{{ product.icon }}</v-icon>
          </v-card-title>

          <v-card-subtitle class="d-flex justify-space-between product-subtitle">
            <span>سعر الشراء: {{ product.buyPrice }}</span>
            <span>سعر البيع: {{ product.sellPrice }}</span>
          </v-card-subtitle>

          <v-card-text class="d-flex justify-space-between product-text">
            <span>الكمية: {{ product.amount }}</span>
            <span>آخر تعديل: {{ formatDate(product.updatedAt) }}</span>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="primary" @click="editProduct(product)">
              تعديل
            </v-btn>
            <v-btn color="red" @click="deleteProduct(product)">
              حذف
            </v-btn>

            <v-icon color="primary" @click="showHistory(product)">
              mdi-history
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

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
const showHistory = (product) => {
  selectedItem.value = product;
  historyDialog.value = true;
};

// Define props
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

// Function to format the date
const formatDate = (date) => new Date(date).toLocaleDateString();
</script>

<style scoped>
.product-card {
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.12);
}

.product-header {
  font-weight: bold;
  color: #424242;
}

.product-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.product-subtitle,
.product-text {
  font-size: 0.9rem;
  color: #757575;
}

.v-card-actions {
  border-top: 1px solid #e0e0e0;
  padding-top: 0.75rem;
}

.v-btn {
  font-size: 0.875rem;
}

.hover-card {
  transition: transform 0.2s ease;
}

.hover-card:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .product-card {
    margin-bottom: 1rem;
  }

  .product-name {
    font-size: 1rem;
  }

  .v-card-subtitle,
  .v-card-text {
    font-size: 0.8rem;
  }

  .v-btn {
    font-size: 0.8rem;
  }
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
