<template>
  <v-locale-provider rtl>

    <v-app>
      <v-main>



        <v-container class="d-flex   ">
          <v-avatar size="60" color="pink" class="mr-3" />
          <div>
            <h1 class="text-h5"> {{
              user.user.username }}</h1>
            <p class="text-caption">{{
              user.user.phone
            }}</p>
            <router-link to="/logout">تسجيل الخروج</router-link>


          </div>
        </v-container>
        <v-responsive>
          <v-container>

            <router-view />
          </v-container>
        </v-responsive>
      </v-main>
      <base-footer />
    </v-app>
  </v-locale-provider>
</template>

<script lang="ts" setup>
const user = JSON.parse(localStorage.getItem('user') || '{}');



</script>
