<template>
  <div>
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">BugTracker</h1>
      <nav class="flex gap-4">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/create-bug" class="nav-link">Создать ошибку</router-link>
        <router-link to="/dashboard" class="nav-link">Панель</router-link>
        <router-link to="/login" class="nav-link">Вход</router-link>
        <router-link to="/register" class="nav-link">Регистрация</router-link>
      </nav>
    </header>

    <main class="p-6">
      <slot></slot> <!-- Это место для рендеринга дочерних компонентов -->
    </main>
  </div>
</template>

<script setup>
// Здесь можно добавить необходимые скрипты, если нужно.
</script>

<style scoped>
.nav-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
