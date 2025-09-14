import { defineStore } from 'pinia'
import { getDefects, createDefect, updateDefect, deleteDefect } from '../api/defects'

export const useDefectsStore = defineStore('defs', {
    state: () => ({ list: [] as any[] }),
    actions: {
        async fetchDefects() {
            this.list = await getDefects()
        },
        async addDefect(defect: { title: string; message: string }) {
            const newDefect = await createDefect(defect)
            this.list.push(newDefect)
        },
        async editDefect(defect: { id: number; title: string; message: string }) {
            const updatedDefect = await updateDefect(defect)
            const index = this.list.findIndex(d => d.id === defect.id)
            if (index !== -1) {
                this.list[index] = updatedDefect
            }
        },
        async removeDefect(id: number) {
            await deleteDefect(id)
            this.list = this.list.filter(d => d.id !== id)
        }
    }
})