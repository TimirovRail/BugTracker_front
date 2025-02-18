<template>
    <div class="comments-container">
        <h3 class="text-xl font-semibold">Комментарии</h3>

        <!-- Отображаем комментарии -->
        <div v-for="comment in comments" :key="comment.id" class="comment">
            <p><strong>{{ comment.user.name }}:</strong> {{ comment.content }}</p>

            <!-- Прикрепленные файлы -->
            <p v-if="comment.attachments.length">Прикрепленные файлы:</p>
            <ul>
                <li v-for="file in comment.attachments" :key="file.name">
                    <a :href="file.url" target="_blank">{{ file.name }}</a>
                </li>
            </ul>
        </div>

        <!-- Форма для добавления комментариев -->
        <textarea v-model="newComment.content" placeholder="Добавить комментарий" class="input-field"></textarea>
        <input type="file" @change="handleFileUpload" class="file-input" multiple />
        <button @click="submitComment" class="btn-primary">Добавить комментарий</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
    bugId: Number, // ID ошибки, к которой привязываются комментарии
});

const comments = ref([]);
const newComment = ref({ content: '', attachments: [] });

// Загружаем комментарии при монтировании
onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/bugs/${props.bugId}/comments`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        comments.value = response.data;
    } catch (error) {
        console.error('Ошибка при загрузке комментариев', error);
    }
});

// Обработка файлов при добавлении комментария
const handleFileUpload = (event) => {
    newComment.value.attachments = event.target.files;
};

// Отправка нового комментария
const submitComment = async () => {
    const formData = new FormData();
    formData.append('content', newComment.value.content);
    for (let file of newComment.value.attachments) {
        formData.append('attachments[]', file);
    }

    try {
        const response = await axios.post(`http://localhost:8000/api/bugs/${props.bugId}/comments`, formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        comments.value.push(response.data); // Добавляем новый комментарий в список
        newComment.value.content = ''; // Очищаем поле ввода
        newComment.value.attachments = []; // Очищаем прикрепленные файлы
    } catch (error) {
        console.error('Ошибка при добавлении комментария', error);
    }
};
</script>

<style scoped>
.comments-container {
    background: #f8f8f8;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.comment {
    margin-bottom: 10px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
}

.file-input {
    margin-top: 10px;
}

.btn-primary {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary:hover {
    background: #0056b3;
}
</style>
