import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateBug from '@/components/CreateBug.vue';
import Dashboard from '@/views/DashboardView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import AdminProfile from '@/views/profiles/AdminProfile.vue';
import DeveloperProfile from '@/views/profiles/DeveloperProfile.vue';
import TesterProfile from '@/views/profiles/TesterProfile.vue';
import ManagerProfile from '@/views/profiles/ManagerProfile.vue';
import UserManagement from '@/views/admin/UserManagement.vue';
import BugManagement from '@/views/admin/BugManagement.vue';
import BugDetails from '@/views/bugs/BugDetails.vue';
import CreateProject from '@/views/projects/CreateProject.vue';
import CommentSection from '@/components/CommentSection.vue'; // Импорт компонента CommentSection
import ResetPassword from '@/components/ResetPassword.vue'; // Импорт компонента ResetPassword
import ResetPasswordRequest from '@/components/ResetPasswordRequest.vue'; // Импорт компонента ResetPasswordRequest

const routes = [
  { path: '/', component: HomeView },
  { path: '/create-bug', component: CreateBug },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  // Маршруты для администратора
  { path: '/admin', component: AdminProfile },
  { path: '/admin/users', component: UserManagement },
  { path: '/admin/bugs', component: BugManagement },

  // Маршруты для разработчика
  { path: '/developer', component: DeveloperProfile },
  {
    path: '/bugs/:id', // Динамический параметр :id
    name: 'BugDetails',
    component: BugDetails,
    props: true, // Передаем параметр :id как props
  },

  // Маршруты для тестировщика
  { path: '/tester', component: TesterProfile },

  // Маршруты для менеджера
  { path: '/manager', component: ManagerProfile },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: CreateProject,
  },

  // Маршрут для комментариев
  {
    path: '/bugs/:id/comments', // Динамический параметр :id для комментариев к багу
    name: 'CommentSection',
    component: CommentSection,
    props: true, // Передаем параметр :id как props
  },

  // Маршрут для запроса восстановления пароля
  {
    path: '/password/reset',
    name: 'ResetPasswordRequest',
    component: ResetPasswordRequest,
  },

  // Маршрут для восстановления пароля
  {
    path: '/reset-password/:token', // Динамический параметр :token для восстановления пароля
    name: 'ResetPassword',
    component: ResetPassword,
    props: true, // Передаем параметр :token как props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;