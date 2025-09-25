import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './pages/Dashboard.vue'
import Tasks from './pages/Tasks.vue'
import Profile from './pages/Profile.vue'
import Settings from './pages/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/tasks', component: Tasks},
    { path: '/profile', component: Profile },
    { path: '/settings', component: Settings },
  ],
})

createApp(App).use(router).mount('#app')