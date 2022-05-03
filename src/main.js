import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$log = console.log
