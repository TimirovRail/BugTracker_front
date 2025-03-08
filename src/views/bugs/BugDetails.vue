<template>
    <div class="bug-details">
        <h2>Детали ошибки #{{ bug.id }}</h2>
        <div>
            <h3>{{ bug.title }}</h3>
            <p>{{ bug.description }}</p>
            <p><strong>Статус:</strong> {{ bug.status }}</p>
            <p><strong>Приоритет:</strong> {{ bug.priority }}</p>
        </div>

        <div class="comments">
            <h3>Комментарии</h3>
            <div v-for="comment in bug.comments" :key="comment.id" class="comment">
                <p><strong>{{ comment.user.name }}:</strong> {{ comment.content }}</p>
                <small>{{ comment.created_at }}</small>
                <button v-if="comment.user.id === authStore.user.id" @click="deleteComment(comment.id)">Удалить</button>
            </div>
            <textarea v-model="newComment" placeholder="Добавьте комментарий"></textarea>
            <input type="file" @change="handleFileUpload" multiple />
            <button @click="addComment">Добавить комментарий</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const authStore = useAuthStore();
const bug = ref({});
const newComment = ref('');
const files = ref([]);

const loadBugDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/bugs/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        bug.value = response.data;
    } catch (error) {
        console.error('Ошибка при загрузке деталей ошибки:', error);
    }
};

const addComment = async () => {
    try {
        const formData = new FormData();
        formData.append('content', newComment.value);
        files.value.forEach((file) => {
            formData.append('attachments[]', file);
        });

        const response = await axios.post(
            `http://localhost:8000/api/bugs/${route.params.id}/comments`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        bug.value.comments.push(response.data);
        newComment.value = '';
        files.value = [];
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
    }
};

const deleteComment = async (commentId) => {
    try {
        await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        bug.value.comments = bug.value.comments.filter((comment) => comment.id !== commentId);
    } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
    }
};

const handleFileUpload = (event) => {
    files.value = Array.from(event.target.files);
};

onMounted(() => {
    loadBugDetails();
});
</script>

<style scoped>
.bug-details {
    padding: 20px;
}

.comments {
    margin-top: 20px;
}

.comment {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 10px;
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