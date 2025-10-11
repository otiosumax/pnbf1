<script setup>
import DefectCard from '@/components/DefectCard.vue';
import { useProjectsStore } from '@/stores/projects';

import { ref } from 'vue';

const projectsStore = useProjectsStore();
const defects = projectsStore.getAllDefects();

</script>

<template>
    <div class="rounded-lg border border-gray-400 shadow-md px-4 py-2">
        
    </div>
</template>