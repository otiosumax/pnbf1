<script setup lang="ts">
import CreateDefect from './components/CreateDefect.vue';
import DefectList from './components/DefectList.vue';


</script>

<template>
  <header>
    <CreateDefect />
  </header>
  <main>
    <DefectList />
  </main>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>