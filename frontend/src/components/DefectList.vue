<script setup lang="ts">
import DefectCard from './DefectCard.vue';
import { useDefectsStore } from '@/stores/defects';

interface Defect {
    title: string;
    message: string;
}
const defectsStore = useDefectsStore();
const defects: Defect[] = defectsStore.list;

</script>

<template>
    <div class="defect-list">
        <h2>Список дефектов</h2>
        <div v-if="defects.length === 0">
            <p>Дефекты отсутствуют</p>
        </div>
        <div v-else>
            <DefectCard v-for="defect in defects" :key="defect.title" :defect="defect" />
        </div>
    </div>
</template>
