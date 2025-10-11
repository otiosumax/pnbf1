<script setup>
import DefectCard from '@/components/DefectCard.vue';
import { useProjectsStore } from '@/stores/projects';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const projectsStore = useProjectsStore();
const defects = ref(projectsStore.getAllDefects());
const selectedDefectId = ref(null);

const redirectToRegisterDefect = () => {
    router.push('/defects/register');
};

const onDeleteDefect = () => {
    defects.value = projectsStore.getAllDefects();
}

</script>

<template>
    <div class="grid grid-cols-2 gap-4 relative">
        <div class="flex flex-col items-center rounded-lg border border-gray-400 shadow-md px-4 py-2">
            <button @click="redirectToRegisterDefect"
                class="bg-rose-400 w-full text-white rounded-lg py-1 px-3 transition hover:bg-rose-500 active:bg-rose-600">
                Зарегистрироать дефект
            </button>
            <DefectCard v-for="defect in defects" :defect="defect" :onDeleteDefect="onDeleteDefect" />
        </div>
        <div class="rounded-lg border border-gray-400 shadow-md px-4 py-2">

        </div>
    </div>
</template>