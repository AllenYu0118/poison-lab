import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import { store } from './store/'
import './index.css'
import { observe } from './utils'

createApp(App).use(router).use(store).mount('#app')
let data = {
  stage: 'GitChat',
  course: {
    title: '前端开发进阶',
    author: ['Allen'],
  },
}

window['data'] = data

observe(data)
console.log('data: ', data)
