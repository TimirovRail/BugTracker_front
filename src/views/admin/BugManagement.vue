<template>
    <div class="bug-management">
        <h2>Управление ошибками</h2>
        <button @click="openCreateBugModal">Создать отчет об ошибке</button>
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
                        <button @click="openEditBugModal(bug)">Редактировать</button>
                        <button @click="deleteBug(bug.id)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="isCreateBugModalOpen" class="modal">
            <div class="modal-content">
                <h3>Создать отчет об ошибке</h3>
                <form @submit.prevent="submitCreateBug">
                    <label for="title">Заголовок:</label>
                    <input type="text" id="title" v-model="newBug.title" required />
                    <label for="description">Описание:</label>
                    <textarea id="description" v-model="newBug.description" required></textarea>
                    <label for="priority">Приоритет:</label>
                    <select id="priority" v-model="newBug.priority" required>
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                    <label for="assignedTo">Ответственный:</label>
                    <select id="assignedTo" v-model="newBug.assignedTo" required>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.name }}
                        </option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" @click="closeCreateBugModal">Отмена</button>
                </form>
            </div>
        </div>

        <div v-if="isEditBugModalOpen" class="modal">
            <div class="modal-content">
                <h3>Редактировать отчет об ошибке</h3>
                <form @submit.prevent="submitEditBug">
                    <label for="edit-title">Заголовок:</label>
                    <input type="text" id="edit-title" v-model="editBugData.title" required />
                    <label for="edit-description">Описание:</label>
                    <textarea id="edit-description" v-model="editBugData.description" required></textarea>
                    <label for="edit-priority">Приоритет:</label>
                    <select id="edit-priority" v-model="editBugData.priority" required>
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                    <label for="edit-status">Статус:</label>
                    <select id="edit-status" v-model="editBugData.status" required>
                        <option value="open">Открыта</option>
                        <option value="in_progress">В работе</option>
                        <option value="resolved">Решена</option>
                        <option value="closed">Закрыта</option>
                    </select>
                    <label for="edit-assignedTo">Ответственный:</label>
                    <select id="edit-assignedTo" v-model="editBugData.assignedTo" required>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.name }}
                        </option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" @click="closeEditBugModal">Отмена</button>
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
const bugs = ref([]);
const users = ref([]);

const isCreateBugModalOpen = ref(false);
const isEditBugModalOpen = ref(false);
const newBug = ref({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: null,
});
const editBugData = ref({
    id: null,
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assignedTo: null,
});

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

const openCreateBugModal = () => {
    isCreateBugModalOpen.value = true;
};

const closeCreateBugModal = () => {
    isCreateBugModalOpen.value = false;
    newBug.value = { title: '', description: '', priority: 'medium', assignedTo: null };
};

const submitCreateBug = async () => {
    try {
        await axios.post('http://localhost:8000/api/bugs', newBug.value, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        closeCreateBugModal();
        loadBugs();
    } catch (error) {
        console.error('Ошибка при создании отчета об ошибке:', error);
    }
};

const openEditBugModal = (bug) => {
    editBugData.value = { ...bug };
    isEditBugModalOpen.value = true;
};

const closeEditBugModal = () => {
    isEditBugModalOpen.value = false;
    editBugData.value = { id: null, title: '', description: '', priority: 'medium', status: 'open', assignedTo: null };
};

const submitEditBug = async () => {
    try {
        await axios.put(`http://localhost:8000/api/bugs/${editBugData.value.id}`, editBugData.value, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        closeEditBugModal();
        loadBugs(); 
    } catch (error) {
        console.error('Ошибка при редактировании отчета об ошибке:', error);
    }
};

const deleteBug = async (bugId) => {
    try {
        await axios.delete(`http://localhost:8000/api/bugs/${bugId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        loadBugs(); 
    } catch (error) {
        console.error('Ошибка при удалении отчета об ошибке:', error);
    }
};

onMounted(() => {
    loadBugs();
    loadUsers();
});
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

form label {
    display: block;
    margin-bottom: 5px;
}

form input,
form textarea,
form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

form textarea {
    height: 100px;
}

form button {
    margin-right: 10px;
}
</style>