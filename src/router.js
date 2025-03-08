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
import CommentSection from '@/components/CommentSection.vue'; 
import ResetPassword from '@/components/ResetPassword.vue'; 
import ResetPasswordRequest from '@/components/ResetPasswordRequest.vue'; 

const routes = [
  { path: '/', component: HomeView },
  { path: '/create-bug', component: CreateBug },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  { path: '/admin', component: AdminProfile },
  { path: '/admin/users', component: UserManagement },
  { path: '/admin/bugs', component: BugManagement },

  { path: '/developer', component: DeveloperProfile },
  {
    path: '/bugs/:id', 
    name: 'BugDetails',
    component: BugDetails,
    props: true,
  },

  { path: '/tester', component: TesterProfile },

  { path: '/manager', component: ManagerProfile },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: CreateProject,
  },

  {
    path: '/bugs/:id/comments',
    name: 'CommentSection',
    component: CommentSection,
    props: true, 
  },

  {
    path: '/password/reset',
    name: 'ResetPasswordRequest',
    component: ResetPasswordRequest,
  },

  {
    path: '/reset-password/:token', 
    name: 'ResetPassword',
    component: ResetPassword,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;