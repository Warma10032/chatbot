<template>
  <div class="upload-container">
    <n-upload
      multiple
      directory-dnd
      :max="5"
    >
      <n-upload-dragger class="upload-dragger">
        <div class="icon-container">
          <n-icon size="48" :depth="3">
            <ArchiveIcon />
          </n-icon>
        </div>
        <n-text class="upload-text">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" class="warning-text">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  
  components: {
    ArchiveIcon
  },
  setup() {
    const uploadedFiles = ref([]);
    const selectedFile = ref(null);  // 用于存储选中的文件

    // 选择文件
    const handleFileSelection = (event) => {
      selectedFile.value = event.target.files[0];
    };
    // 上传文件
    const uploadFile = () => {
      if (!selectedFile.value) {
        alert('请先选择文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile.value);
      formData.append('action', 'upload');

      axios.post('http://127.0.0.1:8000/chatbot/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        uploadedFiles.value.push({
          name: selectedFile.value.name,
        });
        alert('文件上传成功！');
        selectedFile.value = null;  // 上传成功后清空选择的文件
      })
      .catch(error => {
        console.error('Upload error:', error);
        alert('文件上传失败');
      });
    };
    return{
      uploadedFiles,
      selectedFile,
      handleFileSelection,
      uploadFile
    }
  }
})
</script>

<style scoped>
.upload-container {
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器占据父容器的高度 */
}

.upload-container:hover {
  transform: scale(1.05); /* 悬停时放大效果 */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* 悬停时增强阴影 */
}



.upload-dragger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px; /* 缩小内边距 */
  border: 2px dashed #007BFF; /* 保持边框样式 */
  border-radius: 8px; /* 减小圆角 */
  background-color: rgba(255, 255, 255, 0.85); 
  transition: background-color 0.3s ease, border-color 0.3s ease;
  width: 100%; /* 使其充满父容器 */
  max-width: 300px; /* 限制最大宽度，调整输入框大小 */
  height: auto; /* 根据内容自动调整高度 */
}

.upload-dragger:hover {
  background-color: rgba(255, 255, 255, 0.95); /* 悬停时背景微调 */
  border-color: #0056b3; /* 悬停时边框颜色变化 */
}

.icon-container {
  margin-bottom: 16px; /* 图标和文字间距 */
}

.upload-text {
  font-size: 20px; /* 增大字体，匹配页面风格 */
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.warning-text {
  font-size: 14px; /* 调整警告文字大小 */
  color: #f44336; /* 红色警告 */
  margin-top: 8px;
}
</style>