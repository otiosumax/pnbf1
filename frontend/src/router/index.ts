import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tasks from "@/views/Tasks.vue";
import Projects from "@/views/Projects.vue";
import Reports from "@/views/Reports.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import { useUserStore } from "@/stores/user";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { roles: ["engineer", "manager", "admin"] },
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks,
    meta: { roles: ["engineer", "manager"] },
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
    meta: { roles: ["manager", "admin"] },
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
    meta: { roles: ["admin"] },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { roles: ["engineer", "manager", "admin"] },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()

//   // публичные страницы
//   if (to.meta.public) {
//     return next()
//   }

//   // если не залогинен → на логин
//   if (!userStore.isAuthenticated) {
//     return next('/login')
//   }

//   // если у пользователя нет доступа к маршруту → редирект
//   if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
//     return next('/') // можно сделать страницу "Нет доступа"
//   }

//   next()
// })


export default router;
