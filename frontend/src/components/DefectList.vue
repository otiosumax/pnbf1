<script setup lang="ts">
import DefectCard from './DefectCard.vue';
import { onMounted, ref } from 'vue';
import { useDefectsStore } from '@/stores/defects';

interface Defect {
    id: number;
    title: string;
    message: string;
}

const defectsStore = useDefectsStore();
const defects = ref<Defect[]>([]);
onMounted(async () => {
    await defectsStore.fetchDefects();
    defects.value = defectsStore.list;
});

</script>

<template>
    <div class="defect-list">
        <h2>Список дефектов</h2>
        <div v-if="defects.length === 0">
            <p>Дефекты отсутствуют</p>
        </div>
        <div v-else>
            <DefectCard v-for="defect in defects" :key="defect.id" :defect="defect" />
        </div>
    </div>
</template>
