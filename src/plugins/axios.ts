import axios, { AxiosInstance } from 'axios'

export const myAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.API_KEY,
    lang: 'en',
    units: 'metric'
  }
})


export default {
  install(app: { config: { globalProperties: { $axios: AxiosInstance } } }) {
    app.config.globalProperties.$axios = myAxiosInstance
  }
}

export const $axios = myAxiosInstance