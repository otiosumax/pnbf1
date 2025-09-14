<script setup lang="ts">
import { ref } from 'vue';
import DefectCard from './DefectCard.vue';

interface Defect {
    title: string;
    message: string;
}

let defects = ref<Defect[]>([
    { title: 'Ошибка 404', message: 'Страница не найдена' },
    { title: 'Ошибка 500', message: 'Внутренняя ошибка сервера' },
]);

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
