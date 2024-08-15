<template>
  <v-locale-provider rtl>
    <v-app>
      <v-main>
        <v-container class="text-center d-flex flex-column">
          <RouterView />
        </v-container>
      </v-main>
      <BaseFooter />
    </v-app>
  </v-locale-provider>
</template>

<script setup>
</script>
