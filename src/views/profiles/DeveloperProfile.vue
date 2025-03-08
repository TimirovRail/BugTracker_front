<template>
  <div class="developer-profile">
    <h1>Панель разработчика</h1>
    <p>Добро пожаловать, {{ user.name }}! Вы авторизованы как разработчик.</p>

    <div class="filters">
      <label for="status-filter">Фильтр по статусу:</label>
      <select id="status-filter" v-model="statusFilter" @change="loadAssignedBugs">
        <option value="all">Все</option>
        <option value="new">Новая</option>
        <option value="in_progress">В работе</option>
        <option value="testing">На тестировании</option>
        <option value="closed">Закрыта</option>
      </select>

      <label for="sort-priority">Сортировка по приоритету:</label>
      <select id="sort-priority" v-model="sortPriority" @change="sortBugs">
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </div>

    <div class="assigned-bugs">
      <h2>Назначенные ошибки</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Статус</th>
            <th>Приоритет</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bug in assignedBugs" :key="bug.id">
            <td>{{ bug.id }}</td>
            <td>{{ bug.title }}</td>
            <td>
              <select v-model="bug.status" @change="updateBugStatus(bug)">
                <option value="new">Новая</option>
                <option value="in_progress">В работе</option>
                <option value="testing">На тестировании</option>
                <option value="closed">Закрыта</option>
              </select>
            </td>
            <td>{{ bug.priority }}</td>
            <td>
              <button @click="viewBugDetails(bug.id)">Подробнее</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="assignedBugs.length === 0" class="no-bugs">
        <p>Нет назначенных ошибок.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;
const assignedBugs = ref([]);
const statusFilter = ref('all');
const sortPriority = ref('asc');

const loadAssignedBugs = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/bugs/assigned', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      params: {
        status: statusFilter.value === 'all' ? null : statusFilter.value,
      },
    });
    assignedBugs.value = response.data;
    sortBugs();
  } catch (error) {
    console.error('Ошибка при загрузке назначенных ошибок:', error);
  }
};

const sortBugs = () => {
  if (sortPriority.value === 'asc') {
    assignedBugs.value.sort((a, b) => a.priority.localeCompare(b.priority));
  } else {
    assignedBugs.value.sort((a, b) => b.priority.localeCompare(a.priority));
  }
};

const updateBugStatus = async (bug) => {
  try {
    await axios.put(`http://localhost:8000/api/bugs/${bug.id}`, {
      status: bug.status,
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    alert('Статус ошибки обновлен!');
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
};

const viewBugDetails = (bugId) => {
  router.push({ name: 'BugDetails', params: { id: bugId } });
};

onMounted(() => {
  loadAssignedBugs();
});
</script>

<style scoped>
.developer-profile {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.filters label {
  margin-right: 10px;
}

.filters select {
  padding: 5px;
  margin-right: 20px;
}

.assigned-bugs {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

select {
  padding: 5px;
  border-radius: 4px;
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

.no-bugs {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style>