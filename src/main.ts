import { createApp } from 'vue'
//@ts-ignore
import App from './App.vue'
import store from './store'
import axios from './plugins/axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/style.scss'

const app = createApp(App)

app.config.compilerOptions.isCustomElement = tag => tag.endsWith('-widget')

app
  .use(store)
  .use(axios)
  .use(ElementPlus)
  .mount('weather-widget')