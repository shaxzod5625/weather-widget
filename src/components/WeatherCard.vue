<template>
  <el-card>
    <el-row>
      <strong>{{ weatherData.name }}</strong>
    </el-row>
    <el-row class="weather-header">
      <el-col :span="12">
        <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" class="weatherImage"/>
      </el-col>
      <el-col :span="12">
        <p class="weatherCurrentTemp">{{ weatherData.main.temp }}</p>
      </el-col>
    </el-row>
    <el-row class="weather-feelsLike">
      <p>
        <strong>Feels like {{ weatherData.main.feels_like }}°C. {{ weatherData.weather[0].description }}</strong>
      </p>
    </el-row>
    <el-row class="weather-otherData">
      <p class="weather-otherData-item">Wind: {{ `${weatherData.wind.speed} m/s`}}</p>
      <p class="weather-otherData-item">Pressure: {{ `${weatherData.main.pressure} hPa`}}</p>
      <p class="weather-otherData-item">Humidity: {{ `${weatherData.main.humidity} %`}}</p>
      <p class="weather-otherData-item">Visibility: {{ `${weatherData.visibility/1000} km`}}</p>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherCard',
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  methods: {
    
  }
})
</script>