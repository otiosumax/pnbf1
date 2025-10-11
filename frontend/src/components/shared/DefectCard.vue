<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDefectImages } from "@/stores/images";
import { useProjectsStore, DefectStatus } from "@/stores/projects";
import Icon from "./Icon.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  defect: {
    type: Object,
    required: true,
  },
  onDeleteDefect: Function,
  isSelected: Boolean,
});

const router = useRouter();
const projectsStore = useProjectsStore();
const previewUrl = ref<string | null>(null);
const isOpen = props.defect.status == DefectStatus.open;

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
  <div @click="router.push('/defects/' + defect.id)"
    class="relative mt-4 w-full border rounded-lg p-4 shadow hover:shadow-md transition flex gap-4 items-start"
    :class="isSelected ? 'border-rose-400 bg-rose-50' : 'border-gray-400 bg-white'">
    <div class="absolute flex right-2 top-2 flex gap-2">
      <p :class="isOpen ? 'text-blue-400' : 'text-gray-400'"> {{ isOpen ? 'Open' : 'Closed' }}</p>
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
  max-width: 100%;
  word-break: break-all;
}
</style>