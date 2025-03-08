<template>
    <div class="bug-container">
        <h2>Создать ошибку</h2>
        <form @submit.prevent="submitBug">
            <div class="form-group">
                <label for="title">Заголовок:</label>
                <input v-model="bug.title" type="text" class="input-field" placeholder="Введите заголовок ошибки"
                    required />
            </div>

            <div class="form-group">
                <label for="description">Подробное описание проблемы:</label>
                <textarea v-model="bug.description" class="input-field" placeholder="Опишите проблему подробно"
                    required></textarea>
            </div>

            <div class="form-group">
                <label for="severity">Степень критичности:</label>
                <select v-model="bug.severity" class="input-field">
                    <option value="low">Низкая</option>
                    <option value="medium">Средняя</option>
                    <option value="high">Высокая</option>
                    <option value="critical">Критическая</option>
                </select>
            </div>

            <div class="form-group">
                <label for="priority">Приоритет:</label>
                <select v-model="bug.priority" class="input-field">
                    <option value="low">Низкий</option>
                    <option value="normal">Обычный</option>
                    <option value="high">Высокий</option>
                </select>
            </div>

            <div class="form-group">
                <label for="status">Статус:</label>
                <select v-model="bug.status" class="input-field">
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="testing">На проверке</option>
                    <option value="closed">Закрыта</option>
                </select>
            </div>

            <div class="form-group">
                <label for="steps">Шаги воспроизведения:</label>
                <textarea v-model="bug.steps" class="input-field"
                    placeholder="Опишите шаги для воспроизведения ошибки"></textarea>
            </div>

            <div class="form-group">
                <label for="environment">Информация об окружении:</label>
                <textarea v-model="bug.environment" class="input-field"
                    placeholder="Укажите устройство, ОС, версию ПО и т.д."></textarea>
            </div>

            <div class="form-group">
                <label for="attachments">Прикрепление файлов:</label>
                <input type="file" multiple @change="handleFileUpload" class="file-input" />
            </div>

            <div class="form-group">
                <label for="assignee">Ответственный:</label>
                <select v-model="bug.assignee" class="input-field" required>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn-primary">Добавить</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
    assignee: null, 
});
const users = ref([]); 
const bugId = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        users.value = response.data;

        console.log('Список пользователей:', users.value);

        if (users.value.length > 0 && !bug.value.assignee) {
            bug.value.assignee = users.value[0].id;  
        }
    } catch (error) {
        console.error('Не удалось загрузить пользователей', error);
    }
});

const handleFileUpload = (event) => {
    bug.value.attachments = event.target.files;
};

const submitBug = async () => {
    const formData = new FormData();
    Object.keys(bug.value).forEach((key) => {
        if (Array.isArray(bug.value[key])) {
            bug.value[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, bug.value[key]);
        }
    });

    try {
        const response = await axios.post('http://localhost:8000/api/bugs', formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        bugId.value = response.data.id;
        alert('Ошибка успешно создана!');
    } catch (error) {
        console.error('Ошибка при создании ошибки:', error);
        alert('Не удалось создать ошибку.');
    }
};
</script>

<style scoped>
.bug-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
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