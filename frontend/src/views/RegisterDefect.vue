<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '@/stores/projects';
import { saveDefectImage } from '@/stores/images';

const router = useRouter();
const projectsStore = useProjectsStore();

const projectId = ref<number | null>(null);
const title = ref('');
const description = ref('');

const projects = projectsStore.projects;

const registerDefect = () => {
    if (!projectId.value || !title.value || !description.value) {
        alert('Заполни все поля!');
        return;
    }
    router.push('/defects');
};

const files = ref<File[]>([]);

const handleFiles = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    files.value = Array.from(input.files);
};

const createObjectURL = (file: File) => {
    return URL.createObjectURL(file)
}
</script>

<template>
    <div class="max-w-lg mx-auto mt-10 border border-gray-300 rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4">Регистрация дефекта</h2>

        <label class="block mb-2 text-sm font-medium">Проект</label>
        <select v-model="projectId" class="w-full border rounded px-3 py-2 mb-4">
            <option :value="null" disabled>Выберите проект</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
                {{ project.name }}
            </option>
        </select>

        <label class="block mb-2 text-sm font-medium">Название дефекта</label>
        <input v-model="title" type="text" placeholder="Введите название"
            class="w-full border rounded px-3 py-2 mb-4" />

        <label class="block mb-2 text-sm font-medium">Описание</label>
        <textarea v-model="description" rows="4" placeholder="Введите описание"
            class="w-full border rounded px-3 py-2 mb-4"></textarea>
        <div class="mb-4">
            <label for="fileUpload"
                class="block w-full cursor-pointer bg-rose-400 text-white py-2 rounded-lg text-center hover:bg-rose-500 active:bg-rose-600 transition">
                📸 Загрузить изображения
            </label>
            <input id="fileUpload" type="file" multiple @change="handleFiles" class="hidden" />
            <p v-if="files.length" class="text-sm mt-2 text-gray-600">
                Выбрано файлов: {{ files.length }}
            </p>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
            <div v-for="file in files" :key="file.name" class="w-20 h-20 border rounded-lg overflow-hidden">
                <img :src="createObjectURL(file)" class="object-cover w-full h-full" alt="preview" />
            </div>
        </div>
        <button @click="registerDefect"
            class="w-full bg-rose-400 text-white py-2 mt-4 rounded-lg hover:bg-rose-500 active:bg-rose-600 transition">
            Сохранить
        </button>
    </div>
</template>