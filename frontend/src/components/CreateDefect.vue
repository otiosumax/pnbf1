<script setup lang="ts">
import { useDefectsStore } from '@/stores/defects';
import { ref } from 'vue';
let title = ref('');
let message = ref('');
const defectStore = useDefectsStore();
let submitDefect = () => {
    defectStore.addDefect({ title: title.value, message: message.value });
    console.log('Submitted defect:', { title: title.value, message: message.value });
    title.value = '';
    message.value = '';
};
</script>

<template>
    <div class="create-defect">
        <h2>Зарегистрировать дефект</h2>
        <p>Форма регистрации нового дефекта</p>
        <form @submit.prevent="submitDefect">
            <div>
                <label for="title">Заголовок:</label>
                <input type="text" id="title" v-model="title" required />
            </div>
            <div>
                <label for="message">Сообщение:</label>
                <input type="text" id="message" v-model="message" required />
            </div>
            <button type="submit">Зарегистрировать</button>
        </form>
    </div>
</template>