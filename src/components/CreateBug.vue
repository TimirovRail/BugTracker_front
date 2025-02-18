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

            <!-- Поле для выбора ответственного -->
            <div class="mb-3">
                <label class="block text-gray-700">Ответственный</label>
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
    assignee: null,  // Здесь будет храниться выбранный ответственный
});
const users = ref([]);  // Список пользователей
const bugId = ref(null);

// Загрузка пользователей при монтировании компонента
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        users.value = response.data;

        // Отладка: выведем список пользователей в консоль
        console.log('Список пользователей:', users.value);

        // Если пользователей нет, можно задать дефолтного (например, первого из списка)
        if (users.value.length > 0 && !bug.value.assignee) {
            bug.value.assignee = users.value[0].id;  // Устанавливаем первого пользователя как ответственного
        }
    } catch (error) {
        console.error('Не удалось загрузить пользователей', error);
    }
});

// Обработка файлов
const handleFileUpload = (event) => {
    bug.value.attachments = event.target.files;
};

// Отправка формы с ошибкой
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
