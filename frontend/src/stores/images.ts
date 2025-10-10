import localforage from "localforage";

export const defectImagesStore = localforage.createInstance({
  name: "defectImages",
  storeName: "images",
  description: "Хранение картинок для дефектов",
});

// Сохраняем картинку к дефекту
export async function saveDefectImage(defectId: number, file: File) {
  await defectImagesStore.setItem(`${defectId}_${file.name}`, file);
}

// Получение всех картинок для дефекта
export async function getDefectImages(defectId: number) {
  const keys = await defectImagesStore.keys();
  const defectKeys = keys.filter((k) => k.startsWith(`${defectId}_`));

  const files: File[] = [];
  for (const key of defectKeys) {
    const file = await defectImagesStore.getItem<File>(key);
    if (file) files.push(file);
  }
  return files;
}