<script setup>
import Icon from '@/components/shared/Icon.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore, UserRole } from '@/stores/user';

const router = useRouter();

const userStore = useUserStore();

const mail = ref('');
const password = ref('');
const password2 = ref('');
const selectedRole = ref(UserRole.engineer);

const handleRegister = () => {
    if (!mail.value || !password.value || !password2.value) {
        alert('Введите логин и пароль');
        return;
    }
    if (password.value != password2.value) {
        alert('Пароли не совпадают');
        return;
    }
    userStore.register(selectedRole.value, mail.value, password.value);
    router.push('/');
};
</script>

<template>
    <div class="w-screen h-screen bg-rose-400 px-28 py-32">
        <div class="w-full flex flex-column bg-white rounded-lg px-12 py-18">
            <form class="flex flex-col" @submit.prevent="handleRegister">
                <label>Register</label>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="mail" type="email" autofocus="true"
                        placeholder="Почта" />
                    <Icon name="mdiAccount" class="absolute left-2 top-2" />
                </div>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="password" type="password"
                        placeholder="Пароль" />
                    <Icon name="mdiLock" class="absolute left-2 top-2" />
                </div>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="password2" type="password"
                        placeholder="Повторите пароль" />
                    <Icon name="mdiLock" class="absolute left-2 top-2" />
                </div>
                <div class="relative mt-4">
                    <select class="border rounded-lg pr-4 pl-8 py-2" v-model="selectedRole">
                        <option :value="UserRole.engineer">Engineer</option>
                        <option :value="UserRole.manager">Manager</option>
                        <option :value="UserRole.admin">Admin</option>
                    </select>
                </div>
                <button class="w-24 py-2 rounded-lg bg-rose-400 text-white mt-4 transition hover:bg-rose-500 active:bg-rose-600">
                    Register
                </button>
                <div class="mt-4">
                    <p>Уже есть аккаунт? <span @click="router.push('/login');"
                            class="text-rose-400 hover:text-rose-500 active:text-rose-600 transition">
                            Войти
                        </span>
                    </p>
                </div>

            </form>
        </div>
    </div>
</template>