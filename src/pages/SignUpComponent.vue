<template>
  <div class="register-container">
    <n-card title="注册" style="max-width: 400px; margin: 100px auto;">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="form.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="form.password" type="password" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input v-model:value="form.confirmPassword" type="password" placeholder="请确认密码" />
        </n-form-item>
        <!-- 使用 n-button 绑定 handleSubmit 方法 -->
        <n-button type="primary" @click="handleSubmit">注册</n-button>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
};

function validateConfirmPassword(rule, value) {
  if (value !== form.value.password) {
    return new Error('两次密码输入不一致');
  }
  return true;
}

const formRef = ref(null);

async function handleSubmit() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/chatbot/register/', {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password,
        });
        console.log('注册成功：', response.data);
        alert('注册成功');
        // 注册成功后跳转到登录页面
        window.location.href = '/login';
      } catch (error) {
        console.error('注册失败：', error.response.data);
        alert('注册失败，请检查输入信息');
      }
    } else {
      console.log('表单验证失败');
    }
  });
}
</script>

<style scoped>
/* 顶部组件样式 */
body {
  background-color: #f5f7fa;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.n-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.n-button {
  margin-top: 16px;
}
</style>
