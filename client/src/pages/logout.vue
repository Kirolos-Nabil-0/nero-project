<template></template>
<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

userStore.logout();
router.push('/login');
</script>
