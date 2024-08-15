<template>
  <VAppBar class="mt-5" height="140" color="#1E3A5F">
    <VToolbarTitle class="text-h4">
      تسجيل الدخول
    </VToolbarTitle>
  </VAppBar>

  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card class="pa-5" max-width="900" min-width="500" variant="text">
      <v-form ref="form" @submit.prevent="login" v-model="valid">
        <v-text-field label="رقم الهاتف" variant="outlined" prepend-inner-icon="mdi-phone" dense hide-details
          v-model="phone" class="mb-4" :disabled="loading" :rules="[
            (v) => !!v || 'هذا الحقل مطلوب',
            (v) => (v && v.length === 10) || 'رقم الهاتف يجب ان يكون 10 ارقام',
            (v) => (v && v[0] === '0' && v[1] === '5') || 'رقم الهاتف يجب ان يبدأ بـ 05'
          ]" full-width required>
        </v-text-field>

        <v-text-field :rules="[
          (v) => !!v || 'هذا الحقل مطلوب',
          (v) => (v && v.length >= 6) || 'كلمة المرور يجب ان تكون 6 احرف على الاقل'
        ]" label="كلمة المرور" prepend-inner-icon="mdi-lock" variant="outlined"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword" dense hide-details v-model="password" :disabled="loading"
          required full-width>
        </v-text-field>

        <v-btn class="mt-4" @click="login" :loading="loading" color="#1E3A5F" dark full-width>
          تسجيل الدخول
        </v-btn>
      </v-form>

      <VAlert v-if="errorMessages.length" type="error" class="mt-4">
        <ul>
          <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
        </ul>
      </VAlert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { VAlert } from 'vuetify/components';

const valid = ref(false);
const form = ref(null);

const phone = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errorMessages = ref([]);
const userStore = useUserStore();
const router = useRouter();

const login = async () => {
  errorMessages.value = [];
  if (form.value.validate()) {
    loading.value = true;
    try {
      await userStore.login(phone.value, password.value);
    } finally {
      loading.value = false;
    }
  } else {
    errorMessages.value.push('Please correct the errors in the form.');
  }
};
</script>

<route lang="yaml">
  meta:
    layout: auth
</route>

<style>
.v-toolbar-title__placeholder {
  overflow: visible !important
}
</style>
