<template>
  <a-form :model="user" :label-col="labelCol" :wrapper-col="wrapperCol">
  <a-form-item label="账号">
    <a-input v-model:value="user.userAccount"/>
  </a-form-item>
  <a-form-item label="昵称">
    <a-input v-model:value="user.username"/>
  </a-form-item>
  <a-form-item label="性别">
    <a-radio-group v-model:value="user.gender" name="radioGroup">
      <a-radio :value="0">未知</a-radio>
      <a-radio :value="1">男</a-radio>
      <a-radio :value="2">女</a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="年龄">
    <a-input v-model:value="user.age"/>
  </a-form-item>
  <a-form-item label="手机号">
    <a-input v-model:value="user.phone"/>
  </a-form-item>
  <a-form-item label="邮箱">
    <a-input v-model:value="user.email"/>
  </a-form-item>
  <a-form-item label="个人介绍">
    <a-textarea v-model:value="user.profile" placeholder="Basic usage" :rows="4"/>
  </a-form-item>
  <a-form-item label="头像">
    <a-input v-model:value="user.avatar"/>
  </a-form-item>

  <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
    <a-button type="primary" @click="updateUser">更新</a-button>
  </a-form-item>
</a-form>
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getCurrentUser, getUpdateUser} from "../services/user";
import {currentID} from "../states/currentID";
import {message} from "ant-design-vue";

const userT = {
  age: 0,
  avatar: "",
  email: "",
  gender: 0,
  id: 0,
  phone: "",
  profile: "",
  tags: "",
  userAccount: "",
  userRole: 0,
  userStatus: 0,
  username: ""
}

const user = ref(userT)

const value = ref(0);


const updateUser = async () => {
  let res = await getUpdateUser(user);
  if (res == null) {
    message.error("更新失败，请检查输入是否正确" )
    return;
  }else {
    user.value = res
    message.success("更新成功")
  }

}

onMounted(async () => {
  user.value = await getCurrentUser()
  if (user.value == null) {
    message.error("请登录")
  }
})


</script>


<style scoped>

</style>
