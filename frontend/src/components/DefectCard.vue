<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDefectImages } from "@/stores/images";
import { useProjectsStore } from "@/stores/projects";
import Icon from "./Icon.vue";

const props = defineProps({
  defect: {
    type: Object,
    required: true,
  },
  onDeleteDefect: Function,
});

const projectsStore = useProjectsStore();
const previewUrl = ref<string | null>(null);

onMounted(async () => {
  const files = await getDefectImages(props.defect.id);
  if (files.length > 0) {
    previewUrl.value = URL.createObjectURL(files[0]);
  }
});

const deleteDefect = () => {
    if (!confirm("Удалить дефект?")) return;
    projectsStore.deleteDefect(props.defect.projectId, props.defect.id);
    props.onDeleteDefect?.();
}
</script>

<template>
  <div
    class="relative mt-4 w-full border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition flex gap-4 items-start bg-white">
    <div class="absolute right-2 top-2 flex gap-2 text-gray-400">
      <Icon @click="deleteDefect()" name="mdiDelete" />
    </div>
    <div v-if="previewUrl" class="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
      <img :src="previewUrl" alt="preview" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col justify-center overflow-hidden">
      <h2 class="text-lg font-semibold text-gray-800 truncate">
        {{ defect.title }}
      </h2>
      <p class="text-sm text-gray-600 truncate">
        {{ defect.description.split('\n')[0] }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>