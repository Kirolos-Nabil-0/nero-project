<template>
  <VAppBar :class="$display.smAndDown ? 'mt-3' : 'mt-5'" :height="$display.smAndDown ? 100 : 140" color="#1E3A5F">
    <VToolbarTitle class="text-h5 text-sm-h4">
      تسجيل الدخول
    </VToolbarTitle>
  </VAppBar>

  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-card class="pa-4" :max-width="$display.smAndDown ? '100%' : '500px'"
      :min-width="$display.smAndDown ? '90%' : '500px'" variant="text">
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
import { useDisplay } from 'vuetify';

const valid = ref(false);
const form = ref(null);

const phone = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errorMessages = ref([]);
const userStore = useUserStore();
const router = useRouter();
const $display = useDisplay();

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
  overflow: visible !important;
}

@media (max-width: 600px) {
  .v-app-bar {
    height: 100px !important;
  }

  .v-card {
    max-width: 100% !important;
    min-width: 90% !important;
  }

  .v-toolbar-title {
    font-size: 20px !important;
  }
}
</style>
