import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as Icons from '@ant-design/icons-vue'
import * as VueRouter from 'vue-router';
import router from "./configs/router.config";

let app = createApp(App);
//全局注册图标
const icons = Icons
for (const i in icons) {
    app.component(i, icons[i])
}


app.use(router)
app.use(Antd).mount('#app')
