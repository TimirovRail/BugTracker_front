import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
    }),

    actions: {
        async login(data) {
            this.setTokens(data.token, data.refreshToken);
            this.user = data.user; 
            localStorage.setItem('user', JSON.stringify(this.user)); 
            localStorage.setItem('token', response.data.access_token);
        },

        async logout() {
            await axios.post('http://localhost:8000/api/logout', {}, {
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