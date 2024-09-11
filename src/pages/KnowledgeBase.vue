<template>
  <div class="app-container">
    <div class="header">
      <img src="@/img/WechatIMG263-removebg-preview.png" alt="Logo" class="logo" />
      <div class="center-text">请构建您的知识库！</div>
      <RouterLink to="/gradio-page" class="navigate-button">返回聊天</RouterLink>
    </div>
    <div class="content">
      <div class="upload-section">
        <h2 class="section-title">选择并上传文件</h2>
        <input type="file" @change="handleFileSelection" class="file-input" />
        <button @click="uploadFile" class="upload-button" :disabled="!selectedFile">上传</button>
      </div>
      <div class="files-section">
        <h2 class="section-title">已上传文件</h2>
        <div v-if="uploadedFiles.length === 0" class="no-files">暂无已上传文件</div>
        <div v-for="file in uploadedFiles" :key="file.name" class="file-item">
          <span>{{ file.name }}</span>
          <button @click="viewFile(file.name)" class="view-button">查看</button>
          <button @click="deleteFile(file.name)" class="delete-button">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Upload from './Upload.vue';
  import { RouterLink, RouterView } from 'vue-router';
  export default {
  name: 'AppLayout',
  components: {
    Upload,
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

    // 获取文件列表
    const getUploadedFiles = () => {
      axios.get('http://127.0.0.1:8000/chatbot/files/')
        .then(response => {
          uploadedFiles.value = response.data.uploaded_files;  // 确保 response.data.uploaded_files 是数组
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    };

    // 删除文件
    const deleteFile = (filename) => {
      axios.delete(`http://127.0.0.1:8000/chatbot/files/${filename}/`)
        .then(response => {
          uploadedFiles.value = uploadedFiles.value.filter(file => file.name !== filename);
          alert('文件删除成功');
        })
        .catch(error => {
          console.error('Delete error:', error);
          alert('文件删除失败');
        });
    };

    // 查看文件
    const viewFile = (filename) => {
      const fileUrl = `http://127.0.0.1:8000/chatbot/view_file/${filename}/`;
      window.open(fileUrl, '_blank');  // 在新标签页中打开文件
    };

    onMounted(() => {
      getUploadedFiles();  // 页面加载时获取文件列表
      document.title = '赛博华佗';
    });

    return {
      uploadedFiles,
      selectedFile,
      handleFileSelection,
      uploadFile,
      deleteFile,
      viewFile,
    };
  },
};
</script>

  
  <style scoped>
/* 页面容器样式 */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.logo {
  width: 120px;
}

.center-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex-grow: 1;
}

.navigate-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.2s;
}

.navigate-button:hover {
  background: linear-gradient(135deg, #45a049, #3e8e41);
  transform: translateY(-2px);
}

/* 内容区域 */
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
}

/* 上传区域样式 */
.upload-section,
.files-section {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-section {
  width: 35%;
  margin-right: 20px;
}

.files-section {
  width: 60%;
}

/* 标题样式 */
.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
}

/* 上传按钮样式 */
.upload-button {
  padding: 12px 30px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
}

.upload-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
  background-color: #45a049;
  transform: translateY(-2px);
}

/* 文件输入框样式 */
.file-input {
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  text-align: center;
  transition: border-color 0.3s;
}

.file-input:hover {
  border-color: #4CAF50;
}

/* 文件列表样式 */
.no-files {
  color: #999;
  font-size: 16px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, transform 0.2s;
}

.file-item:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

/* 按钮样式 */
.view-button,
.delete-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.view-button {
  background-color: #4CAF50;
  color: white;
}

.view-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: translateY(-2px);
}
</style>