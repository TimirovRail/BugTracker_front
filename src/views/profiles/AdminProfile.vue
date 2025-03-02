<template>
  <div class="admin-profile">
    <h1>Панель администратора</h1>
    <p>Добро пожаловать, {{ user.name }}! Вы авторизованы как администратор.</p>

    <div class="sections">
      <div class="section">
        <h2>Управление пользователями</h2>
        <button @click="manageUsers">Управление пользователями</button>
      </div>

      <div class="section">
        <h2>Управление ошибками</h2>
        <button @click="manageBugs">Управление ошибками</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;

const manageUsers = () => {
  router.push('/admin/users'); 
};

const manageBugs = () => {
  router.push('/admin/bugs'); 
};
</script>

<style scoped>
.admin-profile {
  padding: 20px;
}

.admin-profile h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.sections {
  display: flex;
  gap: 20px;
}

.section {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
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