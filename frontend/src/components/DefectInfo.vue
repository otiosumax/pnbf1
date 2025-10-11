<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useProjectsStore, type Defect } from '@/stores/projects'
import { getDefectImages } from '@/stores/images';


const props = defineProps<{
    defect: Defect;
    onDeleteDefect: () => void;
}>()

const projectsStore = useProjectsStore();

const title = ref(props.defect.title);
const description = ref(props.defect.description);
const status = ref(props.defect.status);
const imagesUrls = ref<string[]>([]);

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
        title: title.value,
        description: description.value,
        attachments: props.defect.attachments,
        status: status.value,
        projectId: props.defect.projectId,
    });
};

const deleteDefect = async () => {
    projectsStore.deleteDefect(props.defect.projectId, props.defect.id);
    props.onDeleteDefect();
};
</script>
<template>
    <div class="flex flex-col gap-4">
        <label class="flex flex-col">
            Title:
            <input v-model="title" type="text" class="border border-gray-400 px-3 py-1 rounded-lg" />
        </label>
        <label class="flex flex-col">
            Description:
            <textarea v-model="description" class="border border-gray-400 px-3 py-1 rounded-lg" />
        </label>
        <label>
            Status:
            <select v-model="status">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            </select>
        </label>
        <div class="flex flex-wrap gap-4">
            <div class=" h-30 rounded-md overflow-hidden flex-shrink-0" v-for="(img, index) in imagesUrls" :key="index">
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