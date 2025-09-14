<script setup lang="ts">
import { ref } from 'vue';

let count = ref(2);
let addition = ref(2);
let add = () => {
    count.value += addition.value;
    addition.value += addition.value;
};
let subtract = () => {
    count.value -= addition.value;
    addition.value = 0;
};
</script>

<template>
    <div class="my-component">
        <h2>Мой компонент</h2>
        <p>Первый вью компонент, немного нервничаю</p>
        <p>счетчик: {{ count }} </p>
        <div class="buttons">
            <button @click="add">+{{ addition }}</button>
            <button @click="subtract">-{{ addition }}</button>
        </div>
    </div>
</template>

<style scoped>
.buttons button {
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
}
</style>