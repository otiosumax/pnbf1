<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { useRoute } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

const route = useRoute();
</script>
<!-- Основные цвета: rose-400, yellow-50 -->
<template>
  <div v-if="route.name == 'login'">
    <Login />
  </div>
  <div v-if="route.name == 'register'">
    <Register />
  </div>
  <div  v-if="route.name !== 'login' && route.name !== 'register'" class="grid gap-x-16 gap-y-8 grid-rows-[4rem_1fr] grid-cols-[16rem_1fr_0rem] h-screen">
    <!-- Показываем header/sidebar только если мы НЕ на login -->
    <Header class="row-span-1 col-span-3" />
    <Sidebar class="row-span-2 col-span-1" />
    <div>
      <RouterView />
    </div>
  </div>
</template>