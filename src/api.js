import axios from 'axios';
import { useAuthStore } from './stores/auth';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'Content-Type': 'application/json' }
});

// Добавляем интерцептор для автоматического обновления токена
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            const authStore = useAuthStore();
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                authStore.logout();
                return Promise.reject(error);
            }

            try {
                const res = await axios.post('http://127.0.0.1:8000/api/refresh-token', { refresh_token: refreshToken });
                authStore.setTokens(res.data.access_token, res.data.refresh_token);
                error.config.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                return axios(error.config);
            } catch (e) {
                authStore.logout();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
