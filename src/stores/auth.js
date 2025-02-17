import { defineStore } from 'pinia';
import api from '../api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null
    }),

    actions: {
        async login(data) {
            const response = await api.post('/login', data);
            this.setTokens(response.data.access_token, response.data.refresh_token);
            this.user = response.data.user;
            localStorage.setItem('user', JSON.stringify(this.user));
        },

        async logout() {
            await api.post('/logout', {}, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.clearTokens();
        },

        setTokens(accessToken, refreshToken) {
            this.token = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        },

        clearTokens() {
            this.token = null;
            this.refreshToken = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    }
});

