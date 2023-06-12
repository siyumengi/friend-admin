<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="logo"/>
      <a-menu
          :selectedKeys="[route.path]"
          theme="dark"
          :open-keys="[route.path]"
          mode="inline">

        <a-menu-item :key="1">
          <pie-chart-outlined/>
          <router-link to="/">
            欢迎
          </router-link>
        </a-menu-item>

        <a-menu-item :key="2">
          <desktop-outlined/>
          <router-link to="/user">
            个人管理
          </router-link>
        </a-menu-item>

        <a-menu-item :key="3">
          <user-outlined/>
          <router-link to="/userManage">
            用户管理
          </router-link>
        </a-menu-item>

        <a-menu-item :key="4">
          <team-outlined/>
          <router-link to="/team">
            队伍管理
          </router-link>
        </a-menu-item>

        <a-menu-item :key="5">
          <team-outlined/>
          <router-link to="/post">
            文章管理
          </router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
    <a-layout>

      <a-layout-header style="background: #fff; padding: 0;  font-size: 48px; ">
        <div style="float: left; margin-left: 600px;">
          friend 后台管理系统
        </div>
        <div style="float:right; margin-right: 75px; margin-bottom: 20px">
          <a-avatar size="large" src="../../favicon.ico"/>
          <a-button type="text" @click="logout">退出</a-button>
        </div>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">

        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px',height: '800px'}">
          <router-view/>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        思与梦 2023
        <template>
          <div id="components-back-top-demo-custom">
            <a-back-top>
              <div class="ant-back-top-inner">UP</div>
            </a-back-top>
            Scroll down to see the bottom-right
            <strong style="color: #1088e9">blue</strong>
            button.
          </div>
        </template>
      </a-layout-footer>

    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';

import {useRouter, useRoute} from 'vue-router'
import routes from "../configs/router.config";
import myAxios from "../configs/myAxios";
import {getUserLogout} from "../services/user";
import {message} from "ant-design-vue";

const selectedKeys = () => ref(['1'])


const route = useRoute()
const router = useRouter()

const logout = async () => {
  let res = await getUserLogout();
  if (!res) {
    message.error("退出失败");
  }
  message.success("退出成功");
  router.push({
    path:"/login"
  })
}

</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}

#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>
