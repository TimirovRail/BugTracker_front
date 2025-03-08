<template>
  <div class="tester-profile">
      <h1>Панель тестировщика</h1>
      <p>Добро пожаловать, {{ user.name }}! Вы авторизованы как тестировщик.</p>

      <!-- Таблица для отображения багов -->
      <div class="bugs-table">
          <h2>Список багов</h2>
          <div v-if="loading" class="loading">Загрузка...</div>
          <div v-else-if="bugs.length === 0" class="no-bugs">Нет доступных багов.</div>
          <div v-else>
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
                      <tr v-for="bug in bugs" :key="bug.id">
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
                              <button @click="addComment(bug.id)">Добавить комментарий</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
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
const bugs = ref([]);
const loading = ref(true);

const loadBugs = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/bugs', {
          headers: { Authorization: `Bearer ${authStore.token}` }
      });
      bugs.value = response.data;
  } catch (error) {
      console.error('Ошибка при загрузке багов:', error);
  } finally {
      loading.value = false;
  }
};

const updateBugStatus = async (bug) => {
  try {
      await axios.put(`http://localhost:8000/api/bugs/${bug.id}`, {
          status: bug.status,
      }, {
          headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert('Статус бага обновлен!');
  } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
  }
};

const viewBugDetails = (bugId) => {
  router.push({ name: 'BugDetails', params: { id: bugId } });
};

const addComment = async (bugId) => {
  const comment = prompt('Введите ваш комментарий:');
  if (comment) {
      try {
          await axios.post(`http://localhost:8000/api/bugs/${bugId}/comments`, {
              comment: comment,
          }, {
              headers: { Authorization: `Bearer ${authStore.token}` }
          });
          alert('Комментарий добавлен!');
      } catch (error) {
          console.error('Ошибка при добавлении комментария:', error);
      }
  }
};

onMounted(() => {
  loadBugs();
});
</script>

<style scoped>
.tester-profile {
  padding: 20px;
}

.tester-profile h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.bugs-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #1E40AF;
  color: white;
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

.loading, .no-bugs {
  text-align: center;
  margin-top: 20px;
}
</style>