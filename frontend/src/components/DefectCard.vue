<script lang="ts" setup>
interface Defect {
    title: string;
    message: string;
}

defineProps<{
    defect: Defect
}>()
</script>



<template>
    <div class="defect-card">
        <h3>Дефект: {{ defect.title }}</h3>
        <p>{{ defect.message }}</p>
    </div>
</template>