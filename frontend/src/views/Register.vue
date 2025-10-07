<script setup>
import Icon from '@/components/Icon.vue';
import { ref } from 'v';
import { useRouter } from 'vue-router'

const router = useRouter();

const login = ref('');
const password = ref('');

const handleRegister = () => { };
</script>

<template>
    <div class="w-screen h-screen bg-rose-400 px-28 py-32">
        <div class="w-full flex flex-column bg-white rounded-lg px-12 py-18">
            <form class="flex flex-col" @submit.prevent="handleRegister">
                <label>Register</label>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="login" type="text" autofocus="true" />
                    <Icon name="mdiAccount" class="absolute left-2 top-2" />
                </div>
                <div class="relative mt-4">
                    <input class="border rounded-lg pr-4 pl-8 py-2" v-model="password" type="password" />
                    <Icon name="mdiLock" class="absolute left-2 top-2" />
                </div>
                <button class="w-24 py-2 rounded-lg bg-rose-400 mt-4 transition hover:bg-rose-500 active:bg-rose-600">
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