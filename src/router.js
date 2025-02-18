import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateBug from '@/components/CreateBug.vue';
import Dashboard from '@/views/DashboardView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import { useAuthStore } from '@/stores/auth';
import ResetPasswordRequest from '@/components/ResetPasswordRequest.vue';
import ResetPassword from '@/components/ResetPassword.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/create-bug', component: CreateBug },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/password/reset',
    name: 'ResetPasswordRequest',  // Страница для запроса на восстановление пароля
    component: ResetPasswordRequest,
  },
  {
    path: '/password/reset/:token',
    name: 'ResetPassword',  // Страница для сброса пароля
    component: ResetPassword,
    props: true,  // Передаем параметр token через props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresRole && authStore.user?.role !== to.meta.requiresRole) {
    return next('/');  // Если роль не совпадает, перенаправляем на главную
  }

  next();
});

export default router;
