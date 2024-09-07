<template>
    <div class="app-container">
      <div class="header">
        <img src="@/img/WechatIMG263-removebg-preview.png" alt="Logo" class="logo" />
        <div class="center-text">请构建您的知识库！</div>
        <RouterLink to="/login", class="navigate-button">Home</RouterLink>
      </div>
      <div class="content">
        <Upload></Upload>
        <div class="files-section">
          <div v-for="file in uploadedFiles" :key="file.id" class="file-item">
            <span>{{ file.name }}</span>
            <button @click="viewFile(file.id)" class="view-button">View</button>
            <button @click="deleteFile(file.id)" class="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
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
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
        axios.post('http://your-server.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          uploadedFiles.value.push({
            id: response.data.id,
            name: file.name
          });
        })
        .catch(error => {
          console.error('Upload error:', error);
        });
      };
  
      const deleteFile = (id) => {
        axios.delete(`http://your-server.com/files/${id}`)
          .then(() => {
            uploadedFiles.value = uploadedFiles.value.filter(file => file.id !== id);
          })
          .catch(error => {
            console.error('Delete error:', error);
          });
      };
  
      const viewFile = (id) => {
        window.open(`http://your-server.com/files/${id}`, '_blank');
      };
  
  
      return {
        uploadedFiles,
        handleFileUpload,
        deleteFile,
        viewFile,
      };
    }
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
  
  