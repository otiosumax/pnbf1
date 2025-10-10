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
    name: "",
    surname: "",
    mail: "",
    password: "",
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
    register(
      role: UserRole,
      mail: string,
      password: string,
      name: string,
      surname: string
    ) {
      this.role = role;
      this.mail = mail;
      this.password = password;
      this.isAuthenticated = true;
      this.name = name;
      this.surname = surname;
      this.saveToLocalStorage();
    },
    setName(newName: string, newSurname: string) {
      this.name = newName;
      this.surname = newSurname;
      this.saveToLocalStorage;
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "userStore",
        JSON.stringify({
          role: this.role,
          isAuthenticated: this.isAuthenticated,
          name: this.name,
          surname: this.surname,
          mail: this.mail,
          password: this.password,
        })
      );
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("userStore");
      if (data) {
        const parsed = JSON.parse(data);
        this.role = parsed.role;
        this.isAuthenticated = parsed.isAuthenticated;
        this.name = parsed.name;
        this.surname = parsed.surname;
        this.mail = parsed.mail;
        this.password = parsed.password;
      }
    },
  },
});
