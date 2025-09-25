<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

const currentTime = ref(new Date().toLocaleTimeString());
const currentDate = ref(new Date().toLocaleDateString());

let timer = null

onMounted(() => {
    timer = setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString();
        currentDate.value = new Date().toLocaleDateString();

    }, 1000)
})

onUnmounted(() => {
    clearInterval(timer);
})
</script>

<template>
    <div class="w-full bg-yellow-50 shadow-sm flex gap-8 items-center justify-between py-4 px-8">
        <router-link to="/">
            <div
                class="text-3xl font-semibold w-4/16 text-rose-400 cursor-pointer transition hover:text-rose-500 active:text-rose-600">
                <span>De</span><span class="text-black">Fectus</span>
            </div>
        </router-link>

        <div class="relative flex flex-1 max-w-128 rounded-xl transition">
            <input class="w-full bg-white outline-none rounded-xl h-10 px-4 shadow-sm focus:shadow-xl transition" />
            <Icon name="mdiMagnify"
                class="absolute right-0 bg-rose-400 text-white rounded-r-xl h-10 w-10 cursor-pointer transition hover:bg-rose-500 active:bg-rose-600" />
        </div>

        <div class="flex flex-col cursor-default select-none">
            <p class="text-bold">{{ currentDate }}</p>
            <p class="text-blue-400">{{ currentTime }}</p>
        </div>
    </div>
</template>