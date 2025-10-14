import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Defects from "@/views/Defects.vue";
import RegisterDefect from "@/views/RegisterDefect.vue";
import Projects from "@/views/Projects.vue";
import Reports from "@/views/Reports.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import { useUserStore, UserRole } from "@/stores/user";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  },
  {
    path: "/defects",
    name: "defects",
    component: Defects,
    meta: { roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  },
  {
    path: "/defects/:id",
    name: "defectDetails",
    component: Defects,
    meta: { roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  },
  {
    path: "/defects/register",
    name: "registerDefect",
    component: RegisterDefect,
    meta: { roles: [UserRole.engineer, UserRole.admin] },
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
    meta: { roles: [UserRole.manager, UserRole.admin] },
  },
  {
    path: "/projects/:id",
    name: "projectDetails",
    component: Projects,
    meta: { roles: [UserRole.manager, UserRole.admin] },
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
    meta: { roles: [UserRole.admin] },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { roles: [UserRole.engineer, UserRole.manager, UserRole.admin] },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { public: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // публичные страницы
  if (to.meta.public) {
    return next();
  }

  // если не залогинен → на логин
  if (!userStore.isAuthenticated) {
    return next("/login");
  }

  // если у пользователя нет доступа к маршруту → редирект
  if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
    return next("/"); // можно сделать страницу "Нет доступа"
  }

  next();
});

export default router;
