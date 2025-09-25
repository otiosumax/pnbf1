<script setup>
import SidebarItem from "./SidebarItem.vue";
import Icon from "./Icon.vue";

</script>

<template>
    <div class="absolut min-w-64 min-h-100 flex flex-col items-center bg-rose-400 rounded-tr-lg text-white">
        <h3 class="mt-4">Имя Фамильев</h3>
        <p class="text-xs text-rose-100">ImyaFamilyev@mail.ru</p>

        <SidebarItem title="Dashboard"><Icon name="view-dashboard"/></SidebarItem>
    </div>
</template>