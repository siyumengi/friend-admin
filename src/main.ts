import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as Icons from '@ant-design/icons-vue'
import * as VueRouter from 'vue-router';
import routes from "./configs/router.config";

let app = createApp(App);
//全局注册图标
const icons = Icons
for (const i in icons) {
    app.component(i, icons[i])
}

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.use(Antd).mount('#app')
