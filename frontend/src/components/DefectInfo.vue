<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProjectsStore, type Defect } from '@/stores/projects'


const props = defineProps<{
  defect: Defect
  onDeleteDefect: () => void
}>()

const projectsStore = useProjectsStore()

const title = ref(props.defect.title)
const description = ref(props.defect.description)
const status = ref(props.defect.status)

watch(() => props.defect, (newDefect) => {
  title.value = newDefect.title
  description.value = newDefect.description
  status.value = newDefect.status
})

async function saveChanges() {
  await projectsStore.updateDefect(props.defect.projectId, props.defect.id, {
    id: props.defect.id,
    title: title.value,
    description: description.value,
    attachments: props.defect.attachments,
    status: status.value,
    projectId: props.defect.projectId,
  })
}

async function deleteDefect() {
  await projectsStore.deleteDefect(props.defect.projectId, props.defect.id)
  props.onDeleteDefect()
}
</script>
<template>
  <div class="h-full">
    <label>
      Title:
      <input v-model="title" type="text" />
    </label>
    <label>
      Description:
      <textarea v-model="description"></textarea>
    </label>
    <div class="attachments">
      <div v-for="(img, index) in props.defect.attachments" :key="index" class="attachment">
        <img :src="img" alt="attachment" />
      </div>
    </div>
    <label>
      Status:
      <select v-model="status">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </label>
    <button @click="saveChanges">Сохранить</button>
    <button @click="deleteDefect">Удалить</button>
  </div>
</template>