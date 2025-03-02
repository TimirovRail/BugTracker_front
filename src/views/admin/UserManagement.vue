<template>
    <div class="user-management">
        <h2>Управление пользователями</h2>
        <button @click="addUser">Добавить пользователя</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button @click="editUser(user.id)">Редактировать</button>
                        <button @click="deleteUser(user.id)">Удалить</button>
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
const users = ref([]);


const loadUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    users.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
};

onMounted(() => {
  loadUsers();
});

const addUser = () => {
    console.log('Добавление пользователя...');
};

const editUser = (userId) => {
    console.log('Редактирование пользователя:', userId);
};

const deleteUser = (userId) => {
    console.log('Удаление пользователя:', userId);
};
</script>

<style scoped>
.user-management {
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