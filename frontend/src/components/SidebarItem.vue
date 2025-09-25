<script setup>
defineProps({
    to: { type: String, required: true },
    title: { type: String, required: true },
})
</script>

<template>
    <router-link :to="to" class="flex gap-2 items-center w-full px-4 py-2 rounded-md transition"
        active-class="bg-white text-rose-400">
        <slot class="mr-2" />
        <p>{{ title }}</p>
    </router-link>
</template>