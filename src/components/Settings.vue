<template>
  <el-card class="settings">
    <el-row class="settings-header">
      <strong>Settings</strong>
    </el-row>
    <el-row class="settings-input">
      <el-input v-model="city" placeholder="City" @keyup.enter="addCity"/>
      <el-alert v-if="error" :title="error" type="error" />
    </el-row>
    <el-row class="settings-list">
      <draggableComponent 
        v-model="allcities" 
        :options="{animation: 200, handle: '.handle'}"
        itemKey="id"
      >
        <template #item="{element, index}">
          <el-row class="settings-card">
            <SettingItem :city="element" v-bind="$attrs" :index="index"/>
          </el-row>
        </template>
      </draggableComponent>
    </el-row>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
import draggableComponent from 'vuedraggable'
import SettingItem from './SettingItem.vue'
export default defineComponent({
  name: 'Settings',
  components: {
    SettingItem,
    draggableComponent
  },
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    city: '',
    error: ''
  }),
  computed: {
    allcities: {
      get() {
        return this.cities
      },
      set(value) {
        // this.store.commit('setSmth', value)
        this.$emit('update', value)
      }
    }
  },
  methods: {
    addCity() {
      if(this.city) {
        this.$emit('addCity', this.city)
        this.city = ''
        this.error = ''
      } else {
        this.error = 'Please enter a city'
      }
    }
  }
})
</script>