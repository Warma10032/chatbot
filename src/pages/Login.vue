<template>
  <div class="page-container">
    <!-- 顶部头部 -->
    <div class="header-container">
      <h2 class="header-title">欢迎来到赛博华佗！</h2>
    </div>
    <!-- 主内容区域，包含轮播图和登录组件 -->
    <div class="content-wrapper">
      <!-- 轮播图容器 -->
      <!-- 可以调整样式，使轮播图容器位置更靠下 -->
      <div class="carousel-container">
        <div style="height: 100px;"></div>
        <n-carousel autoplay>
          <div class="carousel-item">
            <img
              class="carousel-img"
              src="../img/salad.jpeg"
              alt="Carousel 1"
            />
          </div>
          <div class="carousel-item">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
              alt="Carousel 2"
            />
          </div>
          <div class="carousel-item">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
              alt="Carousel 3"
            />
          </div>
          <div class="carousel-item">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
              alt="Carousel 4"
            />
          </div>
        </n-carousel>
      </div>    
       <!-- 登录容器 -->
       <div class="login-container">        
        <img class="login-logo" src="../img/WechatIMG263-removebg-preview.png" alt="Logo" />
        <h1 class="login-title">用户登录</h1>
        <div class="login-input-container">
          <label for="username">账号：</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="login-input-container">
          <label for="password">密码：</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button class="login-btn" @click="handleLogin">登录</button>
        <RouterLink class="register-link" to="/SignUpComponent">注册账号</RouterLink>
      </div>  
    </div>   
       
  </div>
</template>

<script>
import { NCarousel } from 'naive-ui';
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    NCarousel,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
 methods: {
  async handleLogin() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/chatbot/', {
        username: this.username,
        password: this.password,
      });
      console.log('登录成功：', response.data);
      alert('登录成功');
      // 登录成功后跳转到嵌入 Gradio 界面的 Vue 页面
      this.$router.push('/gradio-page'); // 跳转到一个新的 Vue 路由
    } catch (error) {
      console.error('登录失败：', error.response.data);
      alert('登录失败，用户名或密码错误');
    }
  },
},
};
</script>


<style scoped>
/* 页面背景设置 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(167,193,255,1) 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* 页面容器 */
.page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #bee7e3, #ffffff)
   /* 从青绿色渐变到白色，从顶部到底部 */
}

/* 顶部组件样式 */
.header-container {
  width: 100%;
  ; /* 从青绿色渐变到白色，从顶部到底部 */
  padding: 20px 0;
  text-align: center;
  margin-bottom: 30px;
  background: linear-gradient(to bottom, #00bfae,#bee7e3);
}

.header-title {
  font-size: 28px;
  color: #333;
  margin: 0;
  letter-spacing: 1.5px;
}

/* 主内容区域，包含轮播图和登录组件 */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  max-width: 1200px;
  gap: 40px; /* 轮播图和登录组件之间的间距 */

}

/* 轮播图容器 */
.carousel-container {
  flex: 1; /* 轮播图占据可用空间 */
  max-width: 600px;
  max-height: 337.5px;
}

.carousel-img {
  width: 100%;
  height: 337.5px;
  border-radius: 10px;
}
/* 登录框样式 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 400px; /* 增加组件大小 */
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-logo {
  width: 120px;
  height: 120px;
  margin-bottom: 25px;
  border-radius: 50%;
}

.login-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

/* 输入框样式 */
.login-input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

label {
  font-size: 16px;
  margin-right: 10px;
  width: 80px;
  text-align: right;
}

input {
  flex: 1;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 按钮样式 */
.login-btn {
  font-size: 18px;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* 注册链接样式 */
.register-link {
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  margin-top: 20px;
}

.register-link:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .carousel-container,
  .login-container {
    max-width: 100%;
    width: 100%;
  }
}
</style>