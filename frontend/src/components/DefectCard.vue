<script lang="ts" setup>
import { useDefectsStore } from '@/stores/defects';
import Close from './icons/close.vue'

interface Defect {
  id: number;
  title: string;
  message: string;
}

const defectsSore = useDefectsStore();

defineProps<{
  defect: Defect;
}>()
</script>

<template>
  <div class="defect-card">
    <h3 class="defect-title">🐾 Дефект: {{ defect.title }}</h3>
    <p class="defect-message">{{ defect.message }}</p>
    <p class="defect-id"><strong>ID:</strong> {{ defect.id }}</p>
    <button class="close-button" aria-label="Close" onclick="defectsSore.removeDefect(defect.id)">
      <Close />
    </button>
  </div>
</template>

<style scoped>
.defect-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 12px 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid #42b883;
}

.defect-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
}

.defect-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.defect-message {
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
  line-height: 1.4;
}

.defect-id {
  font-size: 0.9rem;
  color: #888;
}

.close-button {
    background: transparent;
    border: none;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    padding: 4px;
}
</style>