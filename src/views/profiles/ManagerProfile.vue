<template>
  <div class="manager-profile">
    <h1>Панель менеджера</h1>
    <p>Добро пожаловать, {{ user.name }}! Вы авторизованы как менеджер.</p>

    <!-- Управление проектами -->
    <div class="projects-section">
      <h2>Управление проектами</h2>
      <router-link to="/projects/create" class="create-project-link">
        Создать новый проект
      </router-link>
      <!-- Кнопка для обновления списка проектов -->
      <button @click="loadProjects">Обновить список проектов</button>

      <!-- Таблица для отображения проектов -->
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="projects.length === 0" class="no-projects">Нет доступных проектов.</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.description }}</td>
              <td>
                <select v-model="project.status" @change="updateProjectStatus(project)">
                  <option value="planned">Запланирован</option>
                  <option value="in_progress">В работе</option>
                  <option value="completed">Завершен</option>
                </select>
              </td>
              <td>
                <button @click="viewProjectDetails(project.id)">Подробнее</button>
                <button @click="deleteProject(project.id)">Удалить</button>
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
const projects = ref([]);
const loading = ref(false);

// Загрузка списка проектов
const loadProjects = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:8000/api/projects', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    projects.value = response.data;
    console.log('Загруженные проекты:', projects.value);
  } catch (error) {
    console.error('Ошибка при загрузке проектов:', error);
  } finally {
    loading.value = false;
  }
};

// Обновление статуса проекта
const updateProjectStatus = async (project) => {
  try {
    await axios.put(`http://localhost:8000/api/projects/${project.id}`, {
      status: project.status,
    }, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    alert('Статус проекта обновлен!');
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
};

// Переход на страницу с деталями проекта
const viewProjectDetails = (projectId) => {
  router.push({ name: 'ProjectDetails', params: { id: projectId } });
};

// Удаление проекта
const deleteProject = async (projectId) => {
  if (confirm('Вы уверены, что хотите удалить проект?')) {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert('Проект удален!');
      loadProjects(); // Перезагружаем список проектов
    } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
    }
  }
};

// Загрузка проектов при монтировании компонента
onMounted(() => {
  loadProjects();
});
</script>

<style scoped>
.manager-profile {
  padding: 20px;
}

.manager-profile h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.projects-section {
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

.loading,
.no-projects {
  text-align: center;
  margin-top: 20px;
}
</style>