<script setup lang="ts">
import CreateDefect from './components/CreateDefect.vue';
import DefectList from './components/DefectList.vue';
</script>

<template>
  <div class="app">
    <div id="header">
      <CreateDefect />
    </div>
    <div id="content">
      <DefectList />
    </div>
  </div>
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
#header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}
#content {
  margin: 20px;
}
</style>