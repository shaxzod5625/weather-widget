<template>
  <el-row class="settingsItem">
    <el-col :span="4" class="settingsItem-burger">
      <span class="settingsItem-burger-item"></span>
      <span class="settingsItem-burger-item"></span>
      <span class="settingsItem-burger-item"></span>
    </el-col>
    <el-col :span="16" class="settingsItem-city">
      {{ city }}
    </el-col>
    <el-col :span="4" class="settingsItem-delete">
      <el-button 
        circle
        class="settingsItem-delete__button"
        @click="$emit('deleteCity', city)"
      >
        <el-icon>
          <Delete />
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
import { defineComponent } from 'vue'
import { Delete } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'SettingItem',
  components: {
    Delete
  },
  props: {
    city: {
      type: String,
      required: true
    }
  }
})
</script>