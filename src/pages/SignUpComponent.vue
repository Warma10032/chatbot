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
        <router-link to="/Login" class = 'n-button'>注册</router-link>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
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

function handleSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('注册成功');
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
