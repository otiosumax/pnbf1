import { defineStore } from "pinia";

export enum DefectStatus {
  open = "open",
  closed = "closed",
}

export interface Defect {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: DefectStatus;
  attachments: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  defects: Defect[];
}

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
  }),

  actions: {
    // === Загрузка / сохранение ===
    saveToLocalStorage() {
      localStorage.setItem("projectsStore", JSON.stringify(this.projects));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("projectsStore");
      if (data) {
        this.projects = JSON.parse(data);
      }
    },

    // === CRUD проекты ===
    createProject(name: string, description: string) {
      const newProject: Project = {
        id: Date.now(),
        name,
        description,
        defects: [],
      };
      this.projects.push(newProject);
      this.saveToLocalStorage();
    },

    updateProject(id: number, name: string, description: string) {
      const project = this.projects.find((p) => p.id === id);
      if (project) {
        project.name = name;
        project.description = description;
        this.saveToLocalStorage();
      }
    },

    deleteProject(id: number) {
      this.projects = this.projects.filter((p) => p.id !== id);
      this.saveToLocalStorage();
    },

    // === CRUD дефекты ===
    addDefect(
      projectId: number,
      title: string,
      description: string,
      attachments: string[]
    ) {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        const newDefect: Defect = {
          id: Date.now(),
          title,
          projectId: project.id,
          description,
          status: DefectStatus.open,
          attachments,
        };
        project.defects.push(newDefect);
        this.saveToLocalStorage();
        return newDefect.id; // 💡 возвращаем id
      }
      return null;
    },

    getAllDefects() {
      return this.projects.flatMap((project) =>
        project.defects.map((defect) => ({
          ...defect,
          projectId: project.id,
          projectName: project.name,
        }))
      );
    },

    updateDefect(
      projectId: number,
      defectId: number,
      newData: Partial<Defect>
    ) {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        const defect = project.defects.find((d) => d.id === defectId);
        if (defect) {
          Object.assign(defect, newData);
          this.saveToLocalStorage();
        }
      }
    },

    deleteDefect(projectId: number, defectId: number) {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        project.defects = project.defects.filter((d) => d.id !== defectId);
        this.saveToLocalStorage();
      }
    },
  },
});
