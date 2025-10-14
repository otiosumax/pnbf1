<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import Icon from './shared/Icon.vue'

const query = ref('')
const suggestions = ref([])
const router = useRouter()
const projectsStore = useProjectsStore()

watch(query, (newQuery) => {
    const q = newQuery.trim().toLowerCase()
    if (!q) {
        suggestions.value = []
        return
    }
    // Найти проекты по имени
    const projectMatches = projectsStore.projects
        .filter(p => p.name.toLowerCase().includes(q))
        .map(p => ({
            type: 'project',
            id: p.id,
            label: p.name
        }))
    // Найти дефекты по названию
    const defectMatches = projectsStore.projects
        .flatMap(project =>
            project.defects
                .filter(d => d.title.toLowerCase().includes(q))
                .map(d => ({
                    type: 'defect',
                    id: d.id,
                    label: d.title
                }))
        )
    suggestions.value = [...projectMatches, ...defectMatches]
})

function goTo(item) {
    if (item.type === 'project') {
        router.push('/projects/' + item.id)
    } else if (item.type === 'defect') {
        router.push('/defects/' + item.id)
    }
    query.value = ''
    suggestions.value = []
}
</script>

<template>
    <div class="relative w-full max-w-lg mx-auto">
        <div class="relative border border-gray-400 bg-white rounded-lg px-3 py-2 w-full focus:outline-none">
            <input v-model="query" type="text" placeholder="Поиск" class="w-full focus:outline-none"/>
            <Icon name="mdiMagnify" class="text-black absolute top-2 right-4" />
        </div>
        <div v-if="suggestions.length && query" class="absolute left-0 right-0 bg-white border rounded-b shadow z-10">
            <ul>
                <li v-for="item in suggestions" :key="item.type + item.id" @click="goTo(item)"
                    class="px-3 py-2 hover:bg-gray-200 cursor-pointer">
                    <div>{{ item.label }}</div>
                    <div class="text-xs text-gray-500">
                        {{ item.type === 'project' ? 'Проект' : 'Дефект' }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>