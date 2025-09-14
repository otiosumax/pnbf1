<script setup lang="ts">
import { ref } from 'vue';
let title = ref('');
let message = ref('');
let submitDefect = () => {
    alert(`Дефект "${title.value}" зарегистрирован!`);
    title.value = '';
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