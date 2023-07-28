/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
import axios from 'axios'
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: typeof axios,
  }
}