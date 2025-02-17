import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateBug from '@/components/CreateBug.vue';
import Dashboard from '@/views/DashboardView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', component: HomeView },
  { path: '/create-bug', component: CreateBug },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
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
