<script setup lang="ts">
import Chart from '@/components/Chart.vue';
import DefectCard from '@/components/shared/DefectCard.vue';
import { DefectStatus, useProjectsStore } from '@/stores/projects';
import { UserRole, useUserStore } from '@/stores/user';

const projectsStore = useProjectsStore();
const userStore = useUserStore();
const projects = projectsStore.projects;
const defects = projectsStore.getAllDefects();

const summaryDefectsOpen = defects.filter((d) => { return d.status == DefectStatus.open });
const summaryDefectsClosed = defects.filter((d) => { return d.status == DefectStatus.closed });

const randomDefectIndex = Math.floor(Math.random() * defects.length);
console.log(summaryDefectsClosed)

function exportToCSV() {
    const rows = [
        ['Project', 'Open defects', 'Closed defects']
    ];

    projects.forEach(project => {
        const open = project.defects.filter(d => d.status === DefectStatus.open).length;
        const closed = project.defects.filter(d => d.status === DefectStatus.closed).length;
        rows.push([project.name, open.toString(), closed.toString()]);
    });

    // Преобразуем в CSV
    const csvContent = rows.map(e => e.join(",")).join("\n");

    // Создаем blob и ссылку для скачивания
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "defects_stats.csv";
    link.click();
}
</script>

<template>
    <div class="max-w-screen-lg overflow-auto mx-auto border border-gray-400 rounded-lg p-4 w-1fr">
        <div class="flex gap-4 h-full">
            <div
                class="flex flex-col h-full p-4 gap-2 items-center border border-gray-400 rounded-lg flex-1 overflow-auto">
                <p>Summary</p>
                <div class="h-60">
                    <Chart :data="{ 'open': summaryDefectsOpen.length, 'closed': summaryDefectsClosed.length }" />
                </div>
            </div>
            <div class="h-76 border border-gray-400 rounded-lg p-4 flex-1 overflow-auto">
                <p>Open defects</p>
                <div class="flex flex-col">
                    <DefectCard v-for="defect in summaryDefectsOpen" :defect="defect" />
                </div>
            </div>
        </div>
        <div v-if="userStore.role != UserRole.engineer" class="grid grid-cols-3 gap-4 w-full">
            <div v-for="project in projects" class="flex flex-col items-center mt-4 border border-gray-400 rounded-lg">
                <h2 class> {{ project.name }} </h2>
                <Chart
                    :data="{ 'open': project.defects.filter((d) => { return d.status == DefectStatus.open }).length, 'closed': project.defects.filter((d) => { return d.status == DefectStatus.closed }).length, }" />
            </div>
        </div>
        <button v-if="userStore.role != UserRole.engineer" @click="exportToCSV"
            class="mt-4 bg-rose-400 text-white cursor-pointer rounded-lg px-3 py-1 transition hover:bg-rose-500 active:bg-rose-600">
            Export to CSV
        </button>
    </div>
</template>