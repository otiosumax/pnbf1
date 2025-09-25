<script setup>
import SidebarItem from "./SidebarItem.vue";
import Icon from "./Icon.vue";

</script>

<template>
    <div class="absolut px-4 py-2 flex flex-col gap-4 items-center bg-rose-400 rounded-tr-lg text-white">
        <div class="flex flex-col items-center">
            <h3 class="mt-4">Имя Фамильев</h3>
            <p class="text-xs text-rose-100">ImyaFamilyev@mail.ru</p>
        </div>

        <SidebarItem to="/" title="Dashboard">
            <Icon name="mdiViewDashboard" />
        </SidebarItem>

        <SidebarItem to="/profile" title="Profile">
            <Icon name="mdiAccount" />
        </SidebarItem>

        <SidebarItem to="/settings" title="Settings">
            <Icon name="mdiCog" />
        </SidebarItem>
    </div>
</template>