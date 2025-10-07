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
      this.saveToLocalStorage();
    },
    login(role: UserRole) {
      this.role = role;
      this.isAuthenticated = true;
      this.saveToLocalStorage();
    },
    logout() {
      this.role = UserRole.engineer;
      this.isAuthenticated = false;
      localStorage.removeItem("userStore");
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "userStore",
        JSON.stringify({
          role: this.role,
          isAuthenticated: this.isAuthenticated,
        })
      );
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("userStore");
      if (data) {
        const parsed = JSON.parse(data);
        this.role = parsed.role;
        this.isAuthenticated = parsed.isAuthenticated;
      }
    },
  },
});
