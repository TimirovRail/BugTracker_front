<template>
    <div class="bug-container">
        <h2>Создать ошибку</h2>
        <form @submit.prevent="submitBug">
            <input v-model="bug.title" type="text" class="input-field" placeholder="Заголовок" required />

            <textarea v-model="bug.description" class="input-field" placeholder="Описание" required></textarea>

            <select v-model="bug.severity" class="input-field">
                <option value="low">Низкая</option>
                <option value="medium">Средняя</option>
                <option value="high">Высокая</option>
                <option value="critical">Критическая</option>
            </select>

            <select v-model="bug.priority" class="input-field">
                <option value="low">Низкий</option>
                <option value="normal">Обычный</option>
                <option value="high">Высокий</option>
            </select>

            <select v-model="bug.status" class="input-field">
                <option value="new">Новая</option>
                <option value="in_progress">В работе</option>
                <option value="testing">На проверке</option>
                <option value="closed">Закрыта</option>
            </select>

            <textarea v-model="bug.steps" class="input-field" placeholder="Шаги воспроизведения"></textarea>

            <textarea v-model="bug.environment" class="input-field" placeholder="Информация об окружении"></textarea>

            <input type="file" multiple @change="handleFileUpload" class="file-input" />

            <button type="submit" class="btn-primary">Добавить</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const bug = ref({
    title: '',
    description: '',
    severity: 'low',
    priority: 'normal',
    status: 'new',
    steps: '',
    environment: '',
    attachments: [],
});

const handleFileUpload = (event) => {
    bug.value.attachments = event.target.files;
};

const submitBug = async () => {
    const formData = new FormData();
    Object.keys(bug.value).forEach((key) => {
        if (key === 'attachments') {
            for (let file of bug.value.attachments) {
                formData.append('attachments[]', file);
            }
        } else {
            formData.append(key, bug.value[key]);
        }
    });

    await axios.post('http://localhost:8000/api/bugs', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    alert('Ошибка создана!');
};
</script>

<style scoped>
.bug-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.input-field,
.file-input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.file-input {
    background: #f8f8f8;
    padding: 8px;
}

.btn-primary {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

.btn-primary:hover {
    background: #0056b3;
}
</style>