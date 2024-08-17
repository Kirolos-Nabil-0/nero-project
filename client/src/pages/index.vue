<template>
  <div class="d-flex align-center rtl-container" dir="rtl">
    <!-- Search Field -->
    <v-text-field v-model="search" label="ابحث من هنا..." variant="outlined" class="search-field align-self-center"
      prepend-inner-icon="mdi-magnify" single-line rounded></v-text-field>

    <!-- Add Product Button -->
    <v-btn color="#1E3A5F" size="x-large" @click="openDialog('add')" class="add-product-btn align-self-baseline" dark>
      اضافة منتج جديد
    </v-btn>

    <!-- Product Dialog -->
    <ProductDialog :dialog="dialog" :mode="dialogMode" :product="selectedProduct" @update:dialog="updateDialog"
      @submit="handleSubmit" />
  </div>

  <!-- Data Table -->
  <v-card style="margin-top: 3rem" class="rounded-card">
    <v-data-table :items="filteredProducts" :headers="headers" :items-per-page="5" :loading="loading"
      :loading-text="loadingText" :no-data-text="noDataText" class="elevation-1 rounded-table">
      <template #item.edit="{ item }">
        <v-icon color="primary" @click="editProduct(item)" title="Edit">
          mdi-pencil
        </v-icon>
      </template>
      <template #item.delete="{ item }">
        <v-icon color="red" @click="deleteProduct(item)" title="Delete">
          mdi-delete
        </v-icon>
      </template>
      <template #item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Fuse from 'fuse.js';
import { useProductsStore } from '@/stores/products';
import Swal from 'sweetalert2';
import { addProduct, updateProduct } from '@/prductsApi';
import { userToken } from '@/main';

const headers = [
  { title: 'اسم المنتج', value: 'name', align: 'center' },
  { title: 'سعر الشراء ', value: 'buyPrice', align: 'end', sortable: true },
  { title: 'سعر البيع', value: 'sellPrice', align: 'end', sortable: true },
  { title: 'الكمية', value: 'amount', align: 'end', sortable: true },
  { title: 'تاريخ اخر تعديل', value: 'updatedAt', align: 'center' },
  { title: 'تعديل', value: 'edit', align: 'center', sortable: false },
  { title: 'حذف', value: 'delete', align: 'center', sortable: false },
];

// Store and State Initialization
const productsStore = useProductsStore();
const search = ref('');
const loading = ref(false);
const dialog = ref(false);
const dialogMode = ref('add'); // New: to track the mode (add/edit)
const selectedProduct = ref(null); // New: to hold the selected product for editing

// Computed property to convert Set to an array
const products = computed(() => Array.from(productsStore.products));

// Fuse.js for Fuzzy Searching
const fuse = new Fuse(products.value, {
  keys: ['name', 'buyPrice', 'sellPrice', 'amount'],
  includeScore: true,
  threshold: 0.3,
});

// Computed property to handle filtered products
const filteredProducts = computed(() => {
  if (search.value.trim() === '') {
    return products.value;
  } else {
    const results = fuse.search(search.value.trim());
    return results.map((result) => result.item);
  }
});

// Watchers
watch(
  () => productsStore.products,
  (newVal) => {
    fuse.setCollection(Array.from(newVal));
  }
);

watch(search, (newVal) => {
  fuse.setCollection(products.value);
});

// Methods

// Open Dialog
const openDialog = (mode, product = null) => {
  dialogMode.value = mode;
  selectedProduct.value = product;
  dialog.value = true;
};

// Update Dialog
const updateDialog = (value) => {
  dialog.value = value;
};

// Format Date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Handle Form Submission
const handleSubmit = async (product) => {
  if (dialogMode.value === 'add') {
    if (!userToken.value) {
      return;
    }
    // remove spaces from the product name and lowercase it
    const productName = product.name.toLowerCase().replace(/\s/g, '');
    if (productsStore.productsNamesLowerCaseNoSpaces.includes(productName)) {
      Swal.fire({
        title: 'هذا المنتج موجود بالفعل',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        background: '#D9D9D9',
        color: 'white',
      });
      return;
    }

    const res = await addProduct(product, userToken.value);
    if (res) {
      productsStore.addProduct(res);
      Swal.fire({
        title: 'تمت الاضافة بنجاح',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        background: '#D9D9D9',
        color: 'white',
      });
    }
  } else if (dialogMode.value === 'edit') {
    const res = await updateProduct(product.id, product, userToken.value);
    if (res) {
      productsStore.updateProduct(res);
      Swal.fire({
        title: 'تم التعديل بنجاح',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        background: '#D9D9D9',
        color: 'white',
      });
    }
  }

  dialog.value = false;
};

// Edit Product
const editProduct = (item) => {
  selectedProduct.value = item;
  openDialog('edit', item);
};

// Delete Product
const deleteProduct = (item) => {
  Swal.fire({
    title: `
      <span style="color: #1E3A5F; font-size: 1.5rem;">
      ${item.name} هل انت متأكد من ازالة هذا المنتج؟
      </span>
    `.trim(),
    imageUrl: '/alert-icon.png',
    imageWidth: 70,
    imageHeight: 70,
    imageAlt: 'Warning Icon',
    showCancelButton: true,
    confirmButtonColor: '#1E3A5F',
    cancelButtonColor: '#4A4A4A',
    confirmButtonText: 'متأكد',
    cancelButtonText: 'الغاء',
    textDirection: 'rtl',
    background: '#D9D9D9',
    color: 'white',
  }).then((result) => {
    if (result.isConfirmed) {
      productsStore.removeProduct(item._id)
        .then(() => {
          Swal.fire({
            title: 'تم الحذف بنجاح',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            background: '#D9D9D9',
            color: 'white',
          });
        })
        .catch((error) => {
          Swal.fire({
            title: 'حدث خطأ اثناء الحذف',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            background: '#D9D9D9',
            color: 'white',
          });
          console.error(error);
        });
    }
  });
};
</script>

<style scoped>
/* General Styles */
.rtl-container {
  direction: rtl;
}

/* Search Field */
.search-field {
  width: 300px;
  margin-left: 16px;
  margin-right: 16px;
}

/* Add Product Button */
.add-product-btn {
  background-color: #243b55;
  font-weight: bold;
  padding: 10px 40px;
  font-size: 1.1rem;
}

.v-btn--dark {
  color: white;
}

/* Card and Table Styling */
.rounded-card,
.rounded-table {
  border-radius: 8px;
}
</style>
