<template>
    <div class="user-management">
        <h2>Управление пользователями</h2>
        <button @click="openAddUserModal">Добавить пользователя</button>
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
                        <button @click="openEditUserModal(user)">Редактировать</button>
                        <button @click="deleteUser(user.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="isAddUserModalOpen" class="modal">
            <div class="modal-content">
                <h3>Добавить пользователя</h3>
                <form @submit.prevent="submitAddUser">
                    <label for="name">Имя:</label>
                    <input type="text" id="name" v-model="newUser.name" required />
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="newUser.email" required />
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" v-model="newUser.password" required />
                    <label for="role">Роль:</label>
                    <select id="role" v-model="newUser.role" required>
                        <option value="admin">Администратор</option>
                        <option value="developer">Разработчик</option>
                        <option value="tester">Тестировщик</option>
                        <option value="manager">Менеджер</option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" @click="closeAddUserModal">Отмена</button>
                </form>
            </div>
        </div>

        <div v-if="isEditUserModalOpen" class="modal">
            <div class="modal-content">
                <h3>Редактировать пользователя</h3>
                <form @submit.prevent="submitEditUser">
                    <label for="edit-name">Имя:</label>
                    <input type="text" id="edit-name" v-model="editUserData.name" required />
                    <label for="edit-email">Email:</label>
                    <input type="email" id="edit-email" v-model="editUserData.email" required />
                    <label for="edit-role">Роль:</label>
                    <select id="edit-role" v-model="editUserData.role" required>
                        <option value="admin">Администратор</option>
                        <option value="developer">Разработчик</option>
                        <option value="tester">Тестировщик</option>
                        <option value="manager">Менеджер</option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" @click="closeEditUserModal">Отмена</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const users = ref([]);

const isAddUserModalOpen = ref(false);
const isEditUserModalOpen = ref(false);
const newUser = ref({
    name: '',
    email: '',
    password: '',
    role: 'developer',
});
const editUserData = ref({
    id: null,
    name: '',
    email: '',
    role: '',
});

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

const openAddUserModal = () => {
    isAddUserModalOpen.value = true;
};

const closeAddUserModal = () => {
    isAddUserModalOpen.value = false;
    newUser.value = { name: '', email: '', password: '', role: 'developer' };
};

const submitAddUser = async () => {
    try {
        await axios.post('http://localhost:8000/api/users', newUser.value, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        closeAddUserModal();
        loadUsers();
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
    }
};

const openEditUserModal = (user) => {
    editUserData.value = { ...user };
    isEditUserModalOpen.value = true;
};

const closeEditUserModal = () => {
    isEditUserModalOpen.value = false;
    editUserData.value = { id: null, name: '', email: '', role: '' };
};

const submitEditUser = async () => {
    try {
        await axios.put(`http://localhost:8000/api/users/${editUserData.value.id}`, editUserData.value, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        closeEditUserModal();
        loadUsers(); 
    } catch (error) {
        console.error('Ошибка при редактировании пользователя:', error);
    }
};

const deleteUser = async (userId) => {
    try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        loadUsers();
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
    }
};

onMounted(() => {
    loadUsers();
});
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