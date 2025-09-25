<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>
<!-- Основные цвета: rose-400, yellow-50 -->
<template>
  <div class="grid gap-x-16 gap-y-8 grid-rows-[4rem_1fr] grid-cols-[16rem_1fr_0rem] h-screen">
    <Header class="row-span-1 col-span-3" />
    <Sidebar class="row-span-2 col-span-1" />
    <RouterView />
  </div>
</template>