import { defineStore } from "pinia";

export enum UserRole {
  engineer = "engineer",
  manager = "manager",
  admin = "admin",
}

export const useUserStore = defineStore("user", {
  state: () => ({
    role: UserRole.engineer,
    isAuthenticated: false,
  }),
  actions: {
    setRole(newRole: UserRole) {
      this.role = newRole;
    },
    login(role: UserRole) {
      this.role = role;
      this.isAuthenticated = true;
    },
    logout() {
      this.role = UserRole.engineer;
      this.isAuthenticated = false;
    },
  },
});
