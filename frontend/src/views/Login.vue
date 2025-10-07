<script setup>
import Icon from '@/components/Icon.vue';
import { useUserStore, UserRole } from '@/stores/user';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const login = ref('');
const password = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleLogin = () => {
    if (!login.value || !password.value) {
        alert('Введите логин и пароль');
        return;
    }
    userStore.login(UserRole.engineer);
    console.log('logged in');
    console.log('auth: ' + userStore.isAuthenticated);
    router.push('/');
}
</script>

<template>
    <div class="w-screen h-screen bg-rose-400 px-28 py-32">
        <div class="w-full flex flex-column bg-white rounded-lg px-12 py-18">
            <form class="flex flex-col" @submit.prevent="handleLogin">
                <label>Log in</label>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="login" type="text" autofocus="true" placeholder="Почта"/>
                    <Icon name="mdiAccount" class="absolute left-2 top-2" />
                </div>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="password" type="password" placeholder="Пароль"/>
                    <Icon name="mdiLock" class="absolute left-2 top-2" />
                </div>
                <button class="w-24 py-2 rounded-lg bg-rose-400 mt-4 transition hover:bg-rose-500 active:bg-rose-600">
                    Login
                </button>
                <div class="mt-4">
                    <p>Нет аккаунта? <span @click="router.push('/register');" class="text-rose-400 hover:text-rose-500 active:text-rose-600 transition">Регистрация</span></p>
                </div>

            </form>
        </div>
    </div>
</template>