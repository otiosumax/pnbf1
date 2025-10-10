<script setup>
import { UserRole, useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const mail = ref(userStore.mail);
const role = ref(userStore.role);
const name = ref(userStore.name);
const surname = ref(userStore.surname);
const password = ref();
const password2 = ref('');

const updateInfo = () => {
    userStore.setName(name.value, surname.value);
    userStore.setRole(role.value);
}



</script>

<template>
    <div class="border border-gray-400 rounded-lg py-4 px-4 relative">
        <div class="flex flex-col gap-4 border border-gray-400 rounded-lg px-4 py-2">
            <div class="">
                <p>Фамилия</p><input class="border border-gray-400 rounded-lg pl-2" v-model="surname" />
            </div>
            <div class="">
                <p>Имя</p><input class="border border-gray-400 rounded-lg pl-2" v-model="name" />
            </div>
            <!-- <div class=""> -->
                <!-- <p>Почта</p><input class="border border-gray-400 rounded-lg pl-2" v-model="mail" /> -->
            <!-- </div> -->
            <!-- <div class=""> -->
                <!-- <p>Пароль</p><input class="border border-gray-400 rounded-lg pl-2" v-model="password" /> -->
            <!-- </div> -->
            <!-- <div class=""> -->
                <!-- <p>Повторите пароль</p><input class="border border-gray-400 rounded-lg pl-2" v-model="password2" /> -->
            <!-- </div> -->
            <div class="">
                <p>Роль</p>
                <select class="border border-gray-400 rounded-lg pl-2" v-model="role">
                    <option :value="UserRole.engineer">Инженер</option>
                    <option :value="UserRole.manager">Менеджер</option>
                    <option :value="UserRole.admin">Администратор</option>
                </select>
            </div>

        </div>
        <button class="bg-rose-400 text-white rounded-lg px-4 py-2 mt-4 transition hover:bg-rose-500 active:bg-rose-600"
            @click="updateInfo()">Сохранить</button>
    </div>
</template>