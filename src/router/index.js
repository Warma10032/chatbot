import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/Login.vue';
import SignUpComponent from '@/pages/SignUpComponent.vue';
import KnowledgeBase from '@/pages/KnowledgeBase.vue';
import GradioPage from '@/pages/GradioPage.vue';

const routes = [
  { 
    // 默认重定向到登录页面
    path: '/', 
    redirect: '/Login' 
  }, 
  { 
    path: '/Login', 
    name: 'Login', 
    component: LoginPage,
  },   
  { 
    path: '/SignUpComponent', 
    name: 'SignUp', 
    component: SignUpComponent 
  },
  {
    path: '/KnowledegBase', 
    name: 'KnowledgeBase', 
    component: KnowledgeBase,
  },
  { path: '/gradio-page', 
    name: GradioPage,
    component: GradioPage
  },
];
  


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
