import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/Login.vue';
import SignUpComponent from '@/pages/SignUpComponent.vue';
import KnowledgeBase from '@/pages/KnowledgeBase.vue';
import GradioPage from '@/pages/gradioPage.vue';
import { useAuthStore } from '@/store/auth';
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
    component: SignUpComponent,
    
  },
  {
    path: '/KnowledegBase', 
    name: 'KnowledgeBase', 
    component: KnowledgeBase,
    meta: { requiresAuth: true },
  },
  {
    path: '/gradio-page',
    name: 'GradioPage',
    component: GradioPage,
    meta: { requiresAuth: true },
  },
];
  


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 初始化时检查 localStorage 中的登录状态
  authStore.checkLoginStatus();

  if(to.meta.requiresAuth){
    if(authStore.isLoggedIn){
      // 如果需要认证且用户已登录，则允许访问
      next();
    }else{
      // 如果需要认证且用户未登录，则重定向到登录页面
      next({ name: 'Login' }); 
      alert('请先登录!');
    }
  } else {
    // 如果不需要认证，则直接允许访问
    next();
  }
});

export default router;
