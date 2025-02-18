<template>
    <div class="reset-password-container">
        <h2 class="text-2xl font-bold text-center mb-4">Сброс пароля</h2>

        <form @submit.prevent="resetPassword">
            <div class="mb-3">
                <label class="block text-gray-700">Новый пароль</label>
                <input v-model="password" type="password" class="input-field" required
                    placeholder="Введите новый пароль" />
            </div>

            <div class="mb-3">
                <label class="block text-gray-700">Подтверждение пароля</label>
                <input v-model="password_confirmation" type="password" class="input-field" required
                    placeholder="Подтвердите пароль" />
            </div>

            <button type="submit" class="btn-primary">Сбросить пароль</button>

            <p v-if="errorMessage" class="text-red-600 text-sm text-center mt-2">
                {{ errorMessage }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const password = ref('');
const password_confirmation = ref('');
const errorMessage = ref('');
const router = useRouter();
const route = useRoute();
const token = route.query.token;  // Получаем токен из URL

const resetPassword = async () => {
    try {
        await axios.post('http://localhost:8000/api/password/reset', {
            token: token,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });
        alert('Пароль успешно сброшен!');
        router.push('/login');
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Ошибка при сбросе пароля';
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
