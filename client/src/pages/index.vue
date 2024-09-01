<template>
  <div class="d-flex align-center rtl-container responsive-container" dir="rtl">
    <ProductSearch v-model="search" />
    <AddProductButton @open-dialog="openDialog" />
    <ProductDialog :dialog="dialog" :mode="dialogMode" :product="selectedProduct" @update:dialog="updateDialog"
      @submit="handleSubmit" />
  </div>

  <!-- Dynamic Component Rendering -->
  <component :is="currentComponent" :filteredProducts="filteredProducts" :headers="headers" :loading="loading"
    loadingText="loadingText" noDataText="noDataText" @edit-product="editProduct" @delete-product="deleteProduct" />
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';

import Fuse from 'fuse.js';
import Swal from 'sweetalert2';
import { useProductsStore } from '@/stores/products';
import { addProduct, updateProduct } from '@/prductsApi';
import { userToken } from '@/main';
import ProductCards from '@/components/ProductCards.vue';
import ProductTable from '@/components/ProductTable.vue';

const headers = [
  { title: 'اسم المنتج', value: 'name', align: 'center' },
  { title: 'سعر الشراء ', value: 'buyPrice', align: 'end', sortable: true },
  { title: 'سعر البيع', value: 'sellPrice', align: 'end', sortable: true },
  { title: 'الكمية', value: 'amount', align: 'end', sortable: true },
  { title: 'تاريخ اخر تعديل', value: 'updatedAt', align: 'center' },
  { title: "اخر من قام بالتعديل", value: "lastEditor.username", align: "center" },
  { title: 'تعديل', value: 'edit', align: 'center', sortable: false },
  { title: 'حذف', value: 'delete', align: 'center', sortable: false },
];

const productsStore = useProductsStore();
const search = ref('');
const loading = ref(false);
const dialog = ref(false);
const dialogMode = ref('add');
const selectedProduct = ref(null);

const products = computed(() => Array.from(productsStore.products).map((product) => {
  return {
    ...product,
    icon: product.amount < 5 && product.amount !== 0 ? 'mdi-alert' : product.amount === 0 ? 'mdi-alert-circle' : '',
    iconColor: product.amount < 5 && product.amount !== 0 ? 'yellow' : product.amount === 0 ? 'red' : '',
  }
}))

const fuse = ref(null);

const initFuse = () => {
  fuse.value = new Fuse(products.value, {
    keys: ['name', 'buyPrice', 'sellPrice', 'amount'],
    includeScore: true,
    threshold: 0.3,
  });
};

watch(products, () => {
  initFuse();
});

const filteredProducts = computed(() => {
  if (!fuse.value) initFuse();
  return search.value.trim()
    ? fuse.value.search(search.value.trim()).map(result => result.item)
    : products.value;
});

const openDialog = (mode, product = null) => {
  dialogMode.value = mode;
  selectedProduct.value = product;
  dialog.value = true;
};

const updateDialog = (value) => {
  dialog.value = value;
};

const handleSubmit = async (product) => {
  try {
    loading.value = true;
    const productName = product.name.toLowerCase().replace(/\s/g, '');

    if (dialogMode.value === 'add') {
      if (productsStore.productsNamesLowerCaseNoSpaces.includes(productName)) {
        showAlert('هذا المنتج موجود بالفعل', 'error');
        return;
      }

      const res = await addProduct(product, userToken.value);
      if (res) productsStore.addProduct(res);
      showAlert('تمت الاضافة بنجاح');
    } else if (dialogMode.value === 'edit') {
      const res = await updateProduct(product.id, product, userToken.value);
      if (res) productsStore.updateProduct(res);
      showAlert('تم التعديل بنجاح');
    }
  } catch (error) {
    showAlert('حدث خطأ أثناء العملية', 'error');
    console.error(error);
  } finally {
    loading.value = false;
    dialog.value = false;
  }
};

const editProduct = (item) => openDialog('edit', item);

const deleteProduct = (item) => {
  Swal.fire({
    title: `${item.name} هل انت متأكد من ازالة هذا المنتج؟`,
    imageUrl: '/alert-icon.png',
    imageWidth: 70,
    imageHeight: 70,
    showCancelButton: true,
    confirmButtonColor: '#1E3A5F',
    cancelButtonColor: '#4A4A4A',
    confirmButtonText: 'متأكد',
    cancelButtonText: 'الغاء',
    textDirection: 'rtl',
    background: '#D9D9D9',
    color: 'white',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await productsStore.removeProduct(item._id);
        showAlert('تم الحذف بنجاح');
      } catch (error) {
        showAlert('حدث خطأ اثناء الحذف', 'error');
        console.error(error);
      }
    }
  });
};

const isMobile = ref(window.innerWidth < 768);

const currentComponent = computed(() => {
  console.log('Is mobile:', isMobile.value);
  return isMobile.value ? ProductCards : ProductTable;
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  console.log('Initial component:', currentComponent.value.name);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function showAlert(text, icon = 'success') {
  Swal.fire({
    text,
    icon,
    confirmButtonColor: '#1E3A5F',
    background: '#D9D9D9',
    color: 'white',
  });
}

</script>

<style scoped>
.rtl-container {
  direction: rtl;
}

.responsive-container {
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
}
</style>
