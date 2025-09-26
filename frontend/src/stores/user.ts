// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    role: 'engineer', // по умолчанию
    isAuthenticated: false
  }),
  actions: {
    setRole(newRole: string) {
      this.role = newRole
    },
    login(role: string) {
      this.role = role
      this.isAuthenticated = true
    },
    logout() {
      this.role = 'engineer'
      this.isAuthenticated = false
    }
  }
})