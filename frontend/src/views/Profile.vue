<script setup>
import { UserRole, useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const mail = ref(userStore.mail);
const role = ref(userStore.role);
const password = ref('');
const password2 = ref('');




</script>

<template>
    <div class="border border-gray-400 rounded-lg py-2 px-4 h-full">
        <div>
            
        </div>
        <div>

        </div>
        <div>

        </div>
    </div>
</template>