<template>
    <div class="home-container">
        <h2 class="text-3xl font-bold text-center mb-6">Добро пожаловать в BugTracker!</h2>
        <p class="text-center mb-6">
            Это приложение для отслеживания ошибок в вашем проекте. Вы можете создавать, обновлять и отслеживать ошибки.
        </p>

        <div class="flex justify-center gap-4">
            <router-link to="/create-bug" class="btn-primary">Создать ошибку</router-link>
            <router-link to="/dashboard" class="btn-primary">Перейти в панель</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.home-container {
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    font-size: 2rem;
    color: #333;
}

p {
    color: #555;
}

.btn-primary {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4c6ef5;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #2a4bb1;
}

.flex {
    display: flex;
    justify-content: center;
}

.gap-4 {
    gap: 16px;
}
</style>
