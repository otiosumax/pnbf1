<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useProjectsStore, type Defect } from '@/stores/projects'
import { getDefectImages } from '@/stores/images';
import { UserRole, useUserStore } from '@/stores/user';


const props = defineProps<{
    defect: Defect;
    onDeleteDefect: () => void;
}>()

const projectsStore = useProjectsStore();
const userStore = useUserStore();

const title = ref(props.defect.title);
const description = ref(props.defect.description);
const status = ref(props.defect.status);
const imagesUrls = ref<string[]>([]);
const selectedImage = ref<string | null>(null);
const role = userStore.role;

const defect = computed({
    get: () => props.defect,
    set: (value) => {
        projectsStore.updateDefect(value.projectId, value.id, value)
    }
})

watch(() => props.defect, (newDefect) => {
    title.value = newDefect.title;
    description.value = newDefect.description;
    status.value = newDefect.status;
})


watch(() => props.defect.id, async () => {
    await loadImages();
});

const loadImages = async () => {
    // Освобождаем старые blob-ссылки, чтобы не было утечек памяти
    imagesUrls.value.forEach(url => URL.revokeObjectURL(url));

    const files = await getDefectImages(props.defect.id);
    imagesUrls.value = files.map(file => URL.createObjectURL(file));
}

onMounted(loadImages);

const saveChanges = async () => {
    projectsStore.updateDefect(props.defect.projectId, props.defect.id, {
        id: props.defect.id,
        title: defect.value.title,
        description: defect.value.description,
        attachments: props.defect.attachments,
        status: defect.value.status,
        projectId: props.defect.projectId,
    });
};

const deleteDefect = async () => {
    projectsStore.deleteDefect(props.defect.projectId, props.defect.id);
    props.onDeleteDefect();
};
</script>
<template>
    <div v-if="role == UserRole.engineer || role == UserRole.admin" class="flex flex-col gap-4">
        <label class="flex flex-col">
            Title:
            <input v-model="defect.title" type="text" class="border border-gray-400 px-3 py-1 rounded-lg" />
        </label>
        <label class="flex flex-col">
            Description:
            <textarea v-model="defect.description" class="border border-gray-400 px-3 py-1 rounded-lg" />
        </label>
        <label>
            Status:
            <select v-model="defect.status">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            </select>
        </label>
        <div class="flex flex-wrap gap-4">
            <div @click="selectedImage = img" class=" h-30 rounded-md overflow-hidden flex-shrink-0"
                v-for="(img, index) in imagesUrls" :key="index">
                <img class="w-full h-full object-cover" :src="img" alt="attachment" />
            </div>
        </div>
        <div class="flex justify-between">
            <button class="bg-rose-400 px-3 py-1 rounded-lg text-white transition hover:bg-rose-500 active:bg-rose-600"
                @click="saveChanges">Сохранить</button>
            <button class="bg-rose-400 px-3 py-1 rounded-lg text-white transition hover:bg-rose-500 active:bg-rose-600"
                @click="deleteDefect">Удалить</button>
        </div>
    </div>

    <div v-else class="flex flex-col gap-4">
        <label class="flex flex-col">
            Title:
            <p type="text" class="border border-gray-400 px-3 py-1 rounded-lg">{{ defect.title }} </p>
        </label>
        <label class="flex flex-col">
            Description:
            <p class="border border-gray-400 px-3 py-1 rounded-lg">{{ defect.description }} </p>
        </label>
        <label class="flex gap-2">
            Status:
            <p> {{ defect.status }}</p>
        </label>
        <div class="flex flex-wrap gap-4">
            <div @click="selectedImage = img" class=" h-30 rounded-md overflow-hidden flex-shrink-0"
                v-for="(img, index) in imagesUrls" :key="index">
                <img class="w-full h-full object-cover" :src="img" alt="attachment" />
            </div>
        </div>
        <div class="flex justify-between">
            <button class="bg-rose-400 px-3 py-1 rounded-lg text-white transition hover:bg-rose-500 active:bg-rose-600"
                @click="saveChanges">Сохранить</button>
            <button class="bg-rose-400 px-3 py-1 rounded-lg text-white transition hover:bg-rose-500 active:bg-rose-600"
                @click="deleteDefect">Удалить</button>
        </div>

    </div>
    <!-- Модалка для просмотра картинки -->
    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        @click="selectedImage = null">
        <img :src="selectedImage" class="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" @click.stop />
        <button class="absolute top-5 right-5 text-white text-3xl" @click="selectedImage = null">
            ✕
        </button>
    </div>
    <!--
    <label>
      Status:
      <select v-model="status">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </label>

  </div> -->
</template>