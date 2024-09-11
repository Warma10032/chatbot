<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gradio Interface</title>
  </head>
  <div class="gradio-page">
    <!-- Gradio 界面 -->
    <iframe
      src="http://localhost:7860"
      class="full-iframe"
      allow="microphone"
    ></iframe>

    <!-- 跳转到知识库上传页面的按钮 -->
    <n-button type="primary" @click="goToUploadPage" class="upload-button">
      上传资料
    </n-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

// 跳转到上传知识库页面
function goToUploadPage() {
  router.push('/KnowledegBase');  // 确保你在路由中定义了 /upload-knowledge 页面
}

// 请求麦克风权限
function requestMicrophonePermission() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      console.log('麦克风权限已授予');
      // 在这里可以处理麦克风数据，或只是简单地释放流
      stream.getTracks().forEach(track => track.stop());
    })
    .catch((error) => {
      console.error('麦克风权限被拒绝', error);
    });
}

onMounted(() => {
  requestMicrophonePermission();
  document.title = '赛博华佗';
});
</script>

<style scoped>
.gradio-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止页面溢出产生滚动条 */
}

.full-iframe {
  width: 100vw;
  height: 100vh;
  border: none; /* 移除iframe的边框 */
  position: absolute;
  top: 0;
  left: 0;
}

/* 使按钮位于页面右上角并且尺寸较小 */
.upload-button {
  position: absolute;
  top: 20px;   /* 距离顶部 20px */
  right: 30px; /* 距离右侧 20px */
  padding: 5px 10px;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10; /* 确保按钮位于 iframe 之上 */
}
</style>
