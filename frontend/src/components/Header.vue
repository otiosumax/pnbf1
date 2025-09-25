<script setup>
import Icon from './Icon.vue';

</script>

<template>
    <div class="w-full bg-yellow-50 shadow-sm flex gap-8 items-center justify-between py-4 px-8">
        <div
            class="text-3xl font-semibold text-rose-400 cursor-pointer transition hover:text-rose-500 active:text-rose-600">
            <span class="">De</span><span class="text-black">Fectus</span>
        </div>
        <div class="relative flex flex-1 max-w-128 rounded-xl shadow-sm transition hover:shadow-lg">
            <input class="w-full bg-white rounded-xl h-10 px-4 focus:shadow-xl transition"></input>
            <Icon name="mdiMagnify"
                class="absolute right-0 bg-rose-400 text-white rounded-xl h-10 w-10 cursor-pointer transition hover:bg-rose-500 active:bg-rose-600" />
        </div>
        <div class="flex flex-col cursor-default select-none">
            <p>Сегодняшняя</p>
            <p class="text-blue-400">дата</p>
        </div>
    </div>
</template>