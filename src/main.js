import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import router from './router'
import axios from 'axios';
import { createPinia } from 'pinia';



// 配置 Axios 的 CSRF token
axios.defaults.xsrfCookieName = 'csrftoken';  // Django 默认的 CSRF token cookie 名称
axios.defaults.xsrfHeaderName = 'X-CSRFToken';  // Django 默认的 CSRF 
const pinia = createPinia()

const app = createApp(App)
app.use(pinia);
app.config.globalProperties.$axios = axios;  // 在全局属性中添加 Axios
app.use(naive)
app.use(router)

app.mount('#app')
