import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');

const store = useUserStore();
store.loadFromLocalStorage();