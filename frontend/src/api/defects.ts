import axios from 'axios'

const API_URL = 'http://localhost:8080/defects'

export async function getDefects() {
    const res = await axios.get(API_URL)
    return res.data
}

export async function createDefect(defect: { title: string; message: string }) {
    const res = await axios.post(API_URL, defect)
    return res.data
}

export async function updateDefect(defect: { id: number; title: string; message: string }) {
    const res = await axios.put(`${API_URL}/${defect.id}`, defect)
    return res.data
}

export async function deleteDefect(id: number) {
    await axios.delete(`${API_URL}/${id}`)
}