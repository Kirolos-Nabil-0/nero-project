<template>
  <VDialog v-model="localDialog" max-width="500" persistent>
    <VCard class="dialog-card">
      <VCardTitle class="headline text-center title-text">
        {{ mode === 'edit' ? 'تعديل منتج' : 'إضافة منتج' }}
      </VCardTitle>
      <VCardText class="text-right">
        <VForm @submit.prevent="submitForm">
          <VTextField v-model="name" label="اسم المنتج" class="input-field" outlined dense
            :rules="[v => !!v || 'هذا الحقل مطلوب']" required />
          <VTextField v-model="buyPrice" label="سعر الشراء" append-inner-icon="currency_icon" class="input-field"
            outlined dense :rules="[
              v => !!v || 'هذا الحقل مطلوب',
              v => parseFloat(v) > 0 || 'يجب أن يكون رقمًا موجبًا'
            ]" required />
          <VTextField v-model="sellPrice" label="سعر البيع" append-inner-icon="currency_icon" class="input-field"
            outlined dense :rules="[
              v => !!v || 'هذا الحقل مطلوب',
              v => parseFloat(v) > 0 || 'يجب أن يكون رقمًا موجبًا'
            ]" required />
          <VTextField v-model="amount" label="الكمية المتاحة" append-inner-icon="unit_icon" class="input-field" outlined
            dense :rules="[
              v => !!v || 'هذا الحقل مطلوب',
              v => parseFloat(v) > -1 || 'يجب أن يكون رقمًا موجبًا  او صفرا '
            ]" required />
          <div class="d-flex justify-space-between mt-4">
            <VBtn @click="closeDialog" color="#4A4A4A" class="cancel-btn">
              إلغاء
            </VBtn>
            <VBtn type="submit" color="#1E3A5F" class="submit-btn">
              {{ mode === 'edit' ? 'تعديل' : 'إضافة' }}
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

// Props
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['add', 'edit'].includes(value),
  },
  product: {
    type: Object,
    default: () => ({}),
  },
});

// Emit event to parent
const emit = defineEmits(['update:dialog', 'submit']);

// Local states
const localDialog = ref(props.dialog);
const name = ref('');
const buyPrice = ref('');
const sellPrice = ref('');
const amount = ref('');

const currency_icon = 'جنيه'; // Icon or text for currency
const unit_icon = 'قطعه'; // Icon or text for unit

// Populate fields if in edit mode
onMounted(() => {
  if (props.mode === 'edit' && props.product) {
    name.value = props.product.name || '';
    buyPrice.value = props.product.buyPrice || '';
    sellPrice.value = props.product.sellPrice || '';
    amount.value = props.product.amount || '';
  }
});

// Watch for changes in dialog prop
watch(
  () => props.dialog,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Watch for changes in localDialog
watch(
  () => localDialog.value,
  (newValue) => {
    emit('update:dialog', newValue);
  }
);
// watch props.product
watch(
  () => props.product,
  (newValue) => {
    if (props.mode === 'edit' && newValue) {
      name.value = newValue.name || '';
      buyPrice.value = newValue.buyPrice || '';
      sellPrice.value = newValue.sellPrice || '';
      amount.value = newValue.amount || '';
    }
  }
);

// Close dialog
const closeDialog = () => {
  localDialog.value = false;
};

// Submit form
const submitForm = () => {
  const formData = {
    name: name.value,
    buyPrice: buyPrice.value,
    sellPrice: sellPrice.value,
    amount: amount.value,
  };

  // Check if product exists and has an _id (for edit mode)
  const productId = props.product && props.product._id ? props.product._id : null;

  emit('submit', { ...formData, mode: props.mode, id: productId });
  closeDialog();
};

</script>

<style scoped></style>
