<script setup>
import { DefectStatus, useProjectsStore } from '@/stores/projects';
import { onMounted, ref } from 'vue';
import ProjectCard from '@/components/shared/ProjectCard.vue';
import { useRoute, useRouter } from 'vue-router';

const projects = ref([]);
const projectsStore = useProjectsStore();
const route = useRoute();
const router = useRouter();
const selectedProjectId = ref(0);

onMounted(() => {
    // projectsStore.loadFromLocalStorage();
    projects.value = projectsStore.projects;
    if (route.params.id) {
        selectedProjectId.value = Number(route.params.id);
    }
});

const openProject = (id) => {
    if (selectedProjectId.value === id) {
        router.push('/projects');
        selectedProjectId.value = null;
    } else {
        router.push('/projects/' + id);
        selectedProjectId.value = id;
    }
};

const createProject = () => {
    const name = prompt("Введите название проекта:");
    const description = prompt("Введите описание проекта:");

    if (!name || !description) return;

    projectsStore.createProject(name, description);
    projects.value = projectsStore.projects;
};

const deleteProject = (id) => {
    if (!confirm("Вы уверены, что хотите удалить этот проект?")) return;

    projectsStore.deleteProject(id);
    projects.value = projectsStore.projects;
};

</script>

<template>
    <div class="border border-gray-400 rounded-lg px-4 pt-4 pb-2">
        <div class="flex items-center justify-between gap-4">
            <p class="text-lg">Project count: {{ projects.length }}</p>
            <button @click="createProject"
                class="bg-rose-400 px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-500 active:bg-rose-600 transition text-white">
                Создать проект
            </button>
        </div>
        <div class="flex flex-col gap-4 my-4">
                <ProjectCard v-for="project in projects" :key="project.id" :project="project"
                :selectedProjectId="selectedProjectId" :openProject="openProject"
                :deleteProject="deleteProject" />
        </div>
    </div>
</template>