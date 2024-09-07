<template>
  <div class="app-container">
    <div class="header">
      <img src="@/img/WechatIMG263-removebg-preview.png" alt="Logo" class="logo" />
      <div class="center-text">请构建您的知识库！</div>
      <RouterLink to="/gradio-page" class="navigate-button">返回聊天</RouterLink>
    </div>
    <div class="content">
      <div class="upload-section">
        <h2>选择并上传文件</h2>
        <!-- 选择文件 -->
        <input type="file" @change="handleFileSelection" class="file-input" />
        <!-- 点击上传按钮 -->
        <button @click="uploadFile" class="upload-button" :disabled="!selectedFile">上传</button>
      </div>
      <div class="files-section">
        <h2>已上传文件</h2>
        <div v-if="uploadedFiles.length === 0">暂无已上传文件</div>
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

export default {
  name: 'AppLayout',
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
     axios.get(`http://127.0.0.1:8000/chatbot/view_file/${filename}/`)
    .then(response => {
      const fileContent = response.data.file_content;
      alert(`文件内容: \n${fileContent}`);  // 这里简单用 alert 展示文件内容，你也可以使用更好的方式展示
    })
    .catch(error => {
      console.error('查看文件出错:', error);
      alert('查看文件失败');
    });
   };

    onMounted(() => {
      getUploadedFiles();  // 页面加载时获取文件列表
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
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    height: 100vh; /* Use the full viewport height */
    max-width: 1200px; /* Maximum width of the container */
    margin: 0 auto; /* Center the container */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  
  .logo {
    width: 100px;
    height: auto;
  }
  .center-text{
    flex-grow: 1;
    text-align: center;
    margin: 0 10px;
    font-size: 18px; /* 设置文字大小 */
    font-family: 'Arial', sans-serif; /* 设置字体 */
  }
  .navigate-button {
    padding: 5px 10px;
    font-size: 14px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .content {
    display: flex;
    flex-grow: 1; /* Allow the content to grow and fill the remaining space */
    width: 100%;
    margin-top: 20px;
  }
  
  .upload-section{
    flex: 1; /* Each section takes up an equal amount of space */
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    padding: 20px;
    height: 70%; /* Set the height to approximately 70% of the remaining space */
    margin: 10px 10px; /* Add some space between the sections */
    width: 30%;
  }

  .files-section{
    flex: 1; /* Each section takes up an equal amount of space */
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    padding: 20px;
    height: 70%; /* Set the height to approximately 70% of the remaining space */
    margin: 10px 10px; /* Add some space between the sections */
    width: 65%;
  }
  
  .file-input {
    margin-bottom: 20px;
  }
  
  .file-item {
    margin: 10px 0;
  }
  
  .view-button, .delete-button {
    margin-left: 10px;
    cursor: pointer;
  }
  
  .view-button {
    color: #4CAF50;
  }
  
  .delete-button {
    color: #f44336;
  }
  </style>
  
  