<script setup>
import { DefectStatus } from '@/stores/projects';
import Chart from '../Chart.vue';
import DefectCard from './DefectCard.vue';
import Icon from '@/components/shared/Icon.vue';

const props = defineProps({
    project: Object,
    selectedProjectId: Number,
    toggleDefects: Function,
    deleteProject: Function,
    deleteDefect: Function,
});

const defects = props.project.defects;

const summaryDefectsOpen = defects.filter((d) => { return d.status == DefectStatus.open });
const summaryDefectsClosed = defects.filter((d) => { return d.status == DefectStatus.closed });
</script>

<template>
    <div class="border border-gray-400 rounded-lg px-4 py-3 flex flex-col gap-2 transition">
        <div class="flex justify-between items-center">
            <div>
                <h3 class="font-semibold text-lg">{{ project.name }}</h3>
                <p class="text-sm text-gray-600">{{ project.description }}</p>
            </div>
            <div class="flex flex-col items-end gap-4">
                <div class="flex justify-end gap-2">
                    <p class="text-gray-400">id = {{ project.id }}</p>
                    <Icon @click="deleteProject(project.id)" name="mdiDelete"
                        class="text-gray-400 transition hover:text-gray-500 active:text-gray-600" />
                </div>
                <button
                    class="bg-rose-400 text-white px-3 py-1 rounded-lg hover:bg-rose-500 active:bg-rose-600 transition"
                    @click="toggleDefects(project.id)">
                    {{ selectedProjectId === project.id ? 'Скрыть дефекты' : 'Показать дефекты' }}
                </button>
            </div>
        </div>

        <Transition name="expand">
            <div v-if="selectedProjectId === project.id" class="mt-2 border-t border-gray-300 pt-2">
                <div v-if="project.defects && project.defects.length === 0" class="flex justify-between">
                    <p class="text-gray-500 italic">Нет дефектов</p>
                </div>
                <div v-else-if="project.defects && project.defects.length > 0">
                    <div class="flex justify-between">
                        <p class="text-gray-500 italic">Дефекты:</p>

                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <DefectCard v-for="defect in project.defects" :key="defect.id" :defect="defect"
                            :deleteDefect="deleteDefect" />
                        </div>
                        <div class="w-60 border border-gray-400 rounded-lg">
                            <Chart :title="project.name" :data="{ 'open': summaryDefectsOpen.length, 'closed': summaryDefectsClosed.length }" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-5px);
}

.expand-enter-to,
.expand-leave-from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
}
</style>