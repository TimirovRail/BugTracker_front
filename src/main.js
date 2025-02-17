import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируем маршруты

const app = createApp(App);
app.use(router); // Подключаем маршруты
app.mount('#app');
