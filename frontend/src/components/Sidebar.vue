<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue"
import Icon from "./Icon.vue"
import { useUserStore, UserRole } from "@/stores/user"
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const userStore = useUserStore();
const router = useRouter();

const menu = [
  { to: "/", title: "Dashboard", icon: "mdiViewDashboard", roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  { to: "/defects", title: "Defects", icon: "mdiSmokeDetector", roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  { to: "/projects", title: "Projects", icon: "mdiHomeCity", roles: [UserRole.manager, UserRole.admin] },
  // { to: "/reports", title: "Reports", icon: "mdiChartBar", roles: [UserRole.admin] },
  { to: "/profile", title: "Profile", icon: "mdiAccount", roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  // { to: "/settings", title: "Settings", icon: "mdiCog", roles: [UserRole.admin] }
]

const handleLogout = () => {
  userStore.logout();
  router.push('/login')

};

onMounted(() => {
  console.log(userStore.role);
})
</script>

<template>
  <div class="px-4 py-2 flex flex-col gap-4 items-center bg-rose-400 rounded-tr-lg text-white">
    <div class="flex flex-col items-center">
      <h3 class="mt-4">{{ userStore.name }} {{ userStore.surname }}</h3>
      <p class="mt-2 text-xs text-rose-100"> {{ userStore.mail }}</p>
    </div>

    <SidebarItem v-for="item in menu.filter((item) => { return item.roles.includes(userStore.role) })" :key="item.to"
      :to="item.to" :title="item.title">
      <Icon :name="item.icon" />
    </SidebarItem>
    <div class="absolute bottom-4">
      <p @click="handleLogout"
        class="bg-white text-rose-400 px-2 rounded-lg cursor-pointer select-none transition hover:text-rose-500 hover:shadow-lg">
        Log out</p>
    </div>
  </div>
</template>