<template>
    <div class="reset-password-container">
        <h2 class="text-2xl font-bold text-center mb-4">Восстановление пароля</h2>

        <form @submit.prevent="sendResetLink">
            <div class="mb-3">
                <label class="block text-gray-700">Email</label>
                <input v-model="email" type="email" class="input-field" required placeholder="Введите ваш email" />
            </div>

            <button type="submit" class="btn-primary">Отправить ссылку</button>

            <p v-if="errorMessage" class="text-red-600 text-sm text-center mt-2">
                {{ errorMessage }}
            </p>

            <p class="mt-4 text-center text-gray-600">
                Уже восстановили пароль?
                <router-link to="/login" class="text-blue-600 hover:underline">Войти</router-link>
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const errorMessage = ref('');
const router = useRouter();

const sendResetLink = async () => {
    try {
        await axios.post('http://localhost:8000/api/password/email', { email: email.value });
        alert('Ссылка для сброса пароля отправлена на вашу почту!');
        router.push('/login');  // Перенаправляем пользователя на страницу входа
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Ошибка при отправке ссылки';
    }
};
</script>

<style scoped>
.reset-password-container {
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
