<template>
  <div>
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">BugTracker</h1>
      <nav class="flex gap-4">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/create-bug" class="nav-link">Создать ошибку</router-link>
        <router-link to="/dashboard" class="nav-link">Панель</router-link>
        <template v-if="authStore.user">
          <div class="flex items-center gap-4">
            <span class="nav-link font-semibold">{{ authStore.user.name }}</span>
            <router-link 
              v-if="authStore.user.role === 'admin'" 
              to="/admin" 
              class="nav-link"
            >
              Профиль админа
            </router-link>
            <router-link 
              v-if="authStore.user.role === 'developer'" 
              to="/developer" 
              class="nav-link"
            >
              Профиль разработчика
            </router-link>
            <router-link 
              v-if="authStore.user.role === 'tester'" 
              to="/tester" 
              class="nav-link"
            >
              Профиль тестировщика
            </router-link>
            <router-link 
              v-if="authStore.user.role === 'manager'" 
              to="/manager" 
              class="nav-link"
            >
              Профиль менеджера
            </router-link>
            <button @click="handleLogout" class="nav-link hover:bg-red-500">Выйти</button>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">Вход</router-link>
          <router-link to="/register" class="nav-link">Регистрация</router-link>
        </template>
      </nav>
    </header>

    <main class="p-6">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout(); 
  router.push('/login'); 
};
</script>

<style scoped>
.nav-link {
  color: black;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>