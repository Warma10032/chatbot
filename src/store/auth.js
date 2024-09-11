// src/store/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,  // 登录状态
  }), 
  actions: {
    login() {
      this.isLoggedIn = true;
      // 如果需要，可以同步到 localStorage
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    },
    checkLoginStatus() {
      const storedStatus = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = storedStatus === 'true';
    },
  },
});