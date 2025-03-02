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
            </div>
            <textarea v-model="newComment" placeholder="Добавьте комментарий"></textarea>
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
        const response = await axios.post(
            `http://localhost:8000/api/bugs/${route.params.id}/comments`,
            { content: newComment.value },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            }
        );
        bug.value.comments.push(response.data);
        newComment.value = '';
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
    }
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