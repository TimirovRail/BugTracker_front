<template>
    <div class="create-project">
        <h2>Создание нового проекта</h2>
        <form @submit.prevent="createProject">
            <div>
                <label for="name">Название проекта:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="description">Описание проекта:</label>
                <textarea id="description" v-model="description"></textarea>
            </div>
            <div>
                <label for="status">Статус проекта:</label>
                <select id="status" v-model="status">
                    <option value="planned">Запланирован</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершен</option>
                </select>
            </div>
            <button type="submit">Создать проект</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const name = ref('');
const description = ref('');
const status = ref('planned');

const createProject = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/projects', {
            name: name.value,
            description: description.value,
            status: status.value,
        }, {
            headers: { Authorization: `Bearer ${authStore.token}` }
        });
        alert('Проект создан!');
        // Очищаем форму
        name.value = '';
        description.value = '';
        status.value = 'planned';
    } catch (error) {
        console.error('Ошибка при создании проекта:', error);
        if (error.response) {
            console.error('Статус ошибки:', error.response.status);
            console.error('Данные ошибки:', error.response.data);
        }
    }
};
</script>

<style scoped>
.create-project {
    padding: 20px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #1E40AF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #3B82F6;
}
</style>