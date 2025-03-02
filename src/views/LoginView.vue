<template>
    <div class="register-container">
        <h2 class="text-2xl font-bold text-center mb-4">Вход</h2>

        <form @submit.prevent="login">
            <div class="mb-3">
                <label class="block text-gray-700">Email</label>
                <input v-model="email" type="email" class="input-field" required placeholder="Введите email" />
            </div>

            <div class="mb-3">
                <label class="block text-gray-700">Пароль</label>
                <input v-model="password" type="password" class="input-field" required placeholder="Введите пароль" />
            </div>

            <button type="submit" class="btn-primary">Войти</button>

            <p v-if="errorMessage" class="text-red-600 text-sm text-center mt-2">
                {{ errorMessage }}
            </p>
        </form>

        <p class="mt-4 text-center text-gray-600">
            Нет аккаунта?
            <router-link to="/register" class="text-blue-600 hover:underline">Регистрация</router-link>
        </p>
        <p class="mt-4 text-center text-gray-600">
            <router-link to="/password/reset" class="text-blue-600 hover:underline">Забыли пароль?</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; 

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore(); 

const login = async () => {
    try {
        const authResponse = await axios.post('http://localhost:8000/api/login', {
            email: email.value,
            password: password.value,
        });

        localStorage.setItem('token', authResponse.data.access_token);
        localStorage.setItem('refresh_token', authResponse.data.refresh_token);

        const userResponse = await axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${authResponse.data.access_token}`,
            },
        });

         await authStore.login({
            token: authResponse.data.access_token,
            refreshToken: authResponse.data.refresh_token,
            user: userResponse.data, 
        });

        alert('Вы успешно вошли!');
        router.push('/dashboard');
    } catch (error) {
        console.error('Ошибка при входе:', error); 
        errorMessage.value = error.response?.data?.message || 'Ошибка входа';
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
}

.btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #45a049;
}
</style>