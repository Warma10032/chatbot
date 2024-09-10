<template>
    <div class="gradio-page">
      <!-- Gradio 界面 -->
      <iframe
        src="http://localhost:7860"
        style="width: 120%; height: 900px; border: none;"
      ></iframe>
      
      <!-- 跳转到知识库上传页面的按钮 -->
      <n-button type="primary" @click="goToUploadPage" class="upload-button">
        上传资料
      </n-button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  // 跳转到上传知识库页面
  function goToUploadPage() {
    router.push('/KnowledegBase');  // 确保你在路由中定义了 /upload-knowledge 页面
  }
  </script>
  
  <style scoped>
  .gradio-page {
    position: relative; /* 确保子元素可以相对于这个容器进行绝对定位 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  /* 使按钮位于页面右上角并且尺寸较小 */
  .upload-button {
    position: absolute;
    top: 40px;   /* 距离顶部 20px */
    right: 40px; /* 距离右侧 20px */
    padding: 5px 10px; /* 调整按钮的大小 */
    font-size: 14px;   /* 调整按钮文字的大小 */
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  