<template>
  <div class="upload-container">
    <n-upload
      multiple
      directory-dnd
      action="https://your-server.com/upload"  
      :max="5"
    >
      <n-upload-dragger class="upload-dragger">
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <ArchiveIcon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    ArchiveIcon
  }
})
</script>

<style scoped>
.upload-container {
  width: 30%; /* Set the width to 30% of the parent container */
  margin: 0 auto; /* Center the container */
  flex: 1; /* Each section takes up an equal amount of space */
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  padding: 20px;
  height: 70%; /* Set the height to approximately 70% of the remaining space */
  margin: 10px 10px; /* Add some space between the sections */
}

.upload-dragger {
  width: 80%; 
  height: 80%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 20px 20px; /* Add some space between the sections */
}
</style>