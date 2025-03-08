<template>
    <h2 class="text-2xl font-bold mb-4 text-center">Панель управления</h2>
    <p class="text-center mb-4">Здесь вы можете отслеживать ошибки.</p>

    <div v-if="loading" class="text-center">Загрузка...</div>
    <div v-else-if="errors.length === 0" class="text-center">Ошибок пока нет.</div>
    <div v-else>
        <div class="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table class="w-full table-auto text-left">
                <thead class="bg-blue-600 text-white">
                    <tr>
                        <th class="px-4 py-2">ID</th>
                        <th class="px-4 py-2">Заголовок</th>
                        <th class="px-4 py-2">Статус</th>
                        <th class="px-4 py-2">Приоритет</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="error in errors" :key="error.id" class="hover:bg-gray-100">
                        <td class="px-4 py-2 border-b border-gray-200">{{ error.id }}</td>
                        <td class="px-4 py-2 border-b border-gray-200">{{ error.title }}</td>
                        <td class="px-4 py-2 border-b border-gray-200">{{ error.status }}</td>
                        <td class="px-4 py-2 border-b border-gray-200">{{ error.priority }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppLayout from '@/components/layouts/AppLayout.vue';

const errors = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/bugs', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        errors.value = response.data;
    } catch (error) {
        console.error('Ошибка при загрузке ошибок:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.text-center {
    text-align: center;
}

.table-auto {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
}

thead {
    background-color: #4c6ef5;
}

tbody tr {
    background-color: white;
    transition: background-color 0.3s ease;
}

tbody tr:hover {
    background-color: #f0f4ff;
}

.border-b {
    border-bottom: 1px solid #ddd;
}

.text-2xl {
    font-size: 1.5rem;
}

.font-bold {
    font-weight: bold;
}

.mb-4 {
    margin-bottom: 1rem;
}

.bg-blue-600 {
    background-color: #3182ce;
}

.text-white {
    color: white;
}

.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
    border-radius: 0.375rem;
}
</style>
