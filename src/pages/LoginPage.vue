<template>
  <a-form
      :model="user"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="账户"
        name="userAccount"
        :rules="[{ required: true, message: '请输入你的账号' }]"
    >
      <a-input v-model:value="user.userAccount"/>
    </a-form-item>

    <a-form-item
        label="密码"
        name="userPassword"
        :rules="[{ required: true, message: '请输入你的密码' }]"
    >
      <a-input-password v-model:value="user.userPassword"/>
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="UserLogin">登录</a-button>
    </a-form-item>
  </a-form>

</template>


<script setup lang="ts">
import {reactive} from 'vue';
import {getLogin} from "../services/user";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";

let router = useRouter();
interface userFormat {
  userAccount: string;
  userPassword: string;
}

const user = reactive<userFormat>({
  userAccount: "siyumeng",
  userPassword: "123456789",
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const UserLogin = async () => {
  const res = await getLogin(user);

  if (!res){
    message.error("登录失败");

    return;
  }
  message.success("登录成功")
  router.push({
    path:"/"
  })
}


</script>


<style scoped>

</style>
