<template>
    <div class="bug-management">
        <h2>Управление ошибками</h2>
        <button @click="createBug">Создать отчет об ошибке</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Заголовок</th>
                    <th>Статус</th>
                    <th>Приоритет</th>
                    <th>Ответственный</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bug in bugs" :key="bug.id">
                    <td>{{ bug.id }}</td>
                    <td>{{ bug.title }}</td>
                    <td>{{ bug.status }}</td>
                    <td>{{ bug.priority }}</td>
                    <td>{{ bug.assignedTo?.name }}</td>
                    <td>
                        <button @click="editBug(bug.id)">Редактировать</button>
                        <button @click="deleteBug(bug.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore(); 
const bugs = ref([]);

// Загрузка ошибок
const loadBugs = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/bugs', {
      headers: {
        Authorization: `Bearer ${authStore.token}`, 
      },
    });
    bugs.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке ошибок:', error);
  }
};

onMounted(() => {
  loadBugs();
});

const createBug = () => {
    console.log('Создание отчета об ошибке...');
};

const editBug = (bugId) => {
    console.log('Редактирование ошибки:', bugId);
};

const deleteBug = (bugId) => {
    console.log('Удаление ошибки:', bugId);
};
</script>

<style scoped>
.bug-management {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
}

button {
    margin: 5px;
    padding: 5px 10px;
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