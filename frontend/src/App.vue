<script setup lang="ts">
import CreateDefect from './components/CreateDefect.vue';
import DefectList from './components/DefectList.vue';
</script>

<template>
  <!-- <div class="app"> -->
    <header>
      <!-- <div class="form-section"> -->
        <CreateDefect />
      <!-- </div> -->
    </header>
    <main>
      <!-- <div class="list-section"> -->
        <DefectList />
      <!-- </div> -->
    </main>

  <!-- </div> -->
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 40px auto;
  display: flex;
  align-items: flex-start;
  /* форма и список прижаты к верху */
  justify-content: center;
  gap: 40px;
  /* расстояние между секциями */
  max-width: 1200px;
  padding: 20px;
}

/* Левая часть (форма) */
.form-section {
  flex: 1;
  max-width: 350px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.form-section:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
}

/* Правая часть (список) */
.list-section {
  flex: 2;
  background: #f9f9f9;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
  min-height: 400px;
  min-width: 600px;
  text-align: left;
}
</style>