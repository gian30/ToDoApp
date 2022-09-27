
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
createApp(App).use(ElementPlus).use(router).use(createPinia()).mount('#app')