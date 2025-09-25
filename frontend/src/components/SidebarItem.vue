<script setup>

defineProps({
    isActive: Boolean,
    title: String,
})
</script>

<template>
    <div class="flex items-center">
        <slot class="text-white"/>
        <p class="texti-rose-500">{{ title }}</p>
    </div>
</template>