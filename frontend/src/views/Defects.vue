<script setup>
import DefectCard from '@/components/DefectCard.vue';
import DefectInfo from '@/components/DefectInfo.vue';
import { useProjectsStore } from '@/stores/projects';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const projectsStore = useProjectsStore();
const defects = ref(projectsStore.getAllDefects());
const selectedDefectId = ref(null);

const redirectToRegisterDefect = () => {
    router.push('/defects/register');
};

function selectDefect(defectId) {
    selectedDefectId.value = defectId;
}

const selectedDefect = computed(() => {
    return defects.value.find(defect => defect.id === selectedDefectId.value) || null;
});

const onDeleteDefect = () => {
    defects.value = projectsStore.getAllDefects();
    // Сбросить выбранный дефект, если он был удален
    if (selectedDefectId.value && !defects.value.some(d => d.id === selectedDefectId.value)) {
        selectedDefectId.value = null;
    }
}

</script>

<template>
    <div class="grid grid-cols-2 gap-4 relative">
        <div class="flex flex-col items-center rounded-lg border border-gray-400 shadow-md px-4 py-2">
            <button @click="redirectToRegisterDefect"
                class="bg-rose-400 w-full text-white rounded-lg py-1 px-3 transition hover:bg-rose-500 active:bg-rose-600">
                Зарегистрироать дефект
            </button>
            <DefectCard
                v-for="defect in defects"
                :key="defect.id"
                :defect="defect"
                :onDeleteDefect="onDeleteDefect"
                :isSelected="defect.id == selectedDefectId"
                @click="selectDefect(defect.id)"
            />
        </div>
        <div class="rounded-lg border border-gray-400 shadow-md px-4 py-2">
            <DefectInfo
                v-if="selectedDefect"
                :defect="selectedDefect"
                :onDeleteDefect="onDeleteDefect"
            />
        </div>
    </div>
</template>