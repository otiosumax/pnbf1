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
header {
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 1rem;
}
</style>