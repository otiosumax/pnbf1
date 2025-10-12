import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/user";
import { useProjectsStore } from "./stores/projects";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const userStore = useUserStore(pinia);
userStore.loadFromLocalStorage();
const projectsStore = useProjectsStore(pinia);
projectsStore.loadFromLocalStorage();

app.mount("#app");
