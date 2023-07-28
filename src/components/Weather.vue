<template>
  <el-container v-if="!isLoading" class="weather-container">
    <el-container v-if="isSettingsOpened" class="weather-container">
      <el-button 
        circle class="weather-service-button" size="default"
        @click="isSettingsOpened = !isSettingsOpened"
      >
        <el-icon>
          <Setting />
        </el-icon>
      </el-button>
      <el-main>
        <Settings 
          :cities="Object.keys(weather)" 
          @addCity="addCity" 
          @deleteCity="deleteCity" 
          @update="updateCities($event)"
        />
      </el-main>
    </el-container>
    <el-container class="weather-container" v-else>
      <el-button
        circle class="weather-service-button" size="default"
        @click="isSettingsOpened = !isSettingsOpened"
      >
        <el-icon>
          <Setting />
        </el-icon>
      </el-button>
      <el-main>
        <el-row v-for="(city, index) in Object.keys(weather)" :key="index">
          <WeatherCard :weatherData="weather[city]"/>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard.vue'
import Settings from './Settings.vue'
import { Setting } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'Weather',
  components: {
    WeatherCard,
    Settings,
    Setting
  },
  data: () => ({
    isLoading: true,
    isSettingsOpened: false,
    weather: {},
    position: {},
    error: ''
  }),
  async mounted() {
    if(navigator.geolocation) {
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.position = pos.coords
          resolve(this.position)
        })
      }).then((pos) => {
        this.$axios.get(`/weather?lat=${pos.latitude}&lon=${pos.longitude}`).then((res) => {
          this.weather[res.data.name] = res.data
          localStorage.setItem('cities', JSON.stringify(Object.keys(this.weather)))
        })
      }).catch((e) => {
        console.log(e)
        throw e
      })
    }
    let cities = JSON.parse(localStorage.getItem('cities'))
    if(cities) {
      for(let city of cities) {
        this.getWeather(city)
      }
      this.isLoading = false
    } else {
      cities = ['tashkent']
      localStorage.setItem('cities', JSON.stringify(cities))
      this.isLoading = false
    }
  },
  methods: {
    async getWeather(name) {
      try {
        const res = await this.$axios.get(`/weather?q=${name}`)
        this.weather[name] = res.data
        localStorage.setItem('cities', JSON.stringify(Object.keys(this.weather)))
      } catch (e) {
        this.error = `City ${name} not found`
        console.log(e)
        throw e
      }
    },
    addCity(name) {
      this.getWeather(name)
    },
    deleteCity(name) {
      delete this.weather[name]
      localStorage.setItem('cities', JSON.stringify(Object.keys(this.weather)))
    },
    updateCities(value) {
      this.weather = {}
      for(let i = 0; i < value.length; i++) {
        this.getWeather(value[i])
      }
    }
  }
});
</script>