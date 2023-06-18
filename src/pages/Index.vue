<template>
  <a-carousel arrows dots-class="slick-dots slick-thumb">
    <template #customPaging="props">
      <a>
        <img :src="getImgUrl(props.i)"/>
      </a>
    </template>
    <div v-for="item in 4" :key="item">
      <img :src="getImgUrl(item - 1)" style="max-height: 500px; min-width: 800px"/>
    </div>

  </a-carousel>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {getCurrentUser} from "../services/user";

const user = ref()

const imgList = [
  {imgUrl: './src/imgs/1.png'},
  {imgUrl: "./src/imgs/2.png"},
  {imgUrl: "./src/imgs/3.png"},
  {imgUrl: "./src/imgs/4.png"}
]

const getImgUrl = (i: number) => {
  return imgList[i].imgUrl;
};

onMounted(async () =>{
 // let currentUser = getCurrentUser();

})

</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}

.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}

.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}

.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}

.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}

.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}

.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
