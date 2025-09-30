<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue"
import Icon from "./Icon.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore();

const menu = [
  { to: "/", title: "Dashboard", icon: "mdiViewDashboard", roles: ["engineer", "manager", "admin"] },
  { to: "/tasks", title: "Tasks", icon: "mdiCheckboxMarked", roles: ["engineer", "manager"] },
  { to: "/projects", title: "Projects", icon: "mdiHomeCity", roles: ["manager", "admin"] },
  { to: "/reports", title: "Reports", icon: "mdiChartBar", roles: ["admin"] },
  { to: "/profile", title: "Profile", icon: "mdiAccount", roles: ["engineer", "manager", "admin"] },
  { to: "/settings", title: "Settings", icon: "mdiCog", roles: ["admin"] }
]
</script>

<template>
  <div class="px-4 py-2 flex flex-col gap-4 items-center bg-rose-400 rounded-tr-lg text-white">
    <div class="flex flex-col items-center">
      <h3 class="mt-4">Имя Фамильев</h3>
      <p class="text-xs text-rose-100">ImyaFamilyev@mail.ru</p>
    </div>
    <!--  -->
    <SidebarItem
      v-for="item in menu.filter((i) => {i.roles.includes(userStore.role)})"
      :key="item.to"
      :to="item.to"
      :title="item.title"
    >
      <Icon :name="item.icon" />
    </SidebarItem>
  </div>
</template>