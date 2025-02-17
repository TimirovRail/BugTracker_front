<template>
    <div class="register-container">
      <h2 class="text-2xl font-bold mb-4">Регистрация</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="block text-gray-700">Имя</label>
          <input type="text" v-model="name" class="input-field" required />
        </div>
  
        <div class="mb-3">
          <label class="block text-gray-700">Email</label>
          <input type="email" v-model="email" class="input-field" required />
        </div>
  
        <div class="mb-3">
          <label class="block text-gray-700">Пароль</label>
          <input type="password" v-model="password" class="input-field" required />
        </div>
  
        <div class="mb-3">
          <label class="block text-gray-700">Подтвердите пароль</label>
          <input type="password" v-model="password_confirmation" class="input-field" required />
        </div>
  
        <div class="mb-3">
          <label class="block text-gray-700">Выберите роль</label>
          <select v-model="role" class="input-field" required>
            <option value="admin">Администратор</option>
            <option value="developer">Разработчик</option>
            <option value="tester">Тестировщик</option>
            <option value="manager">Менеджер проекта</option>
          </select>
        </div>
  
        <button type="submit" class="btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const role = ref('developer'); // Значение по умолчанию
  const router = useRouter();
  
  const register = async () => {
    try {
      await axios.post('http://localhost:8000/api/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        role: role.value, // Отправляем роль
      });
  
      alert('Регистрация успешна! Теперь войдите в систему.');
      router.push('/login'); // Перенаправление на страницу входа
    } catch (error) {
      alert('Ошибка регистрации: ' + (error.response?.data?.message || 'Попробуйте снова.'));
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
  }
  
  .btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #45a049;
  }
  </style>
  