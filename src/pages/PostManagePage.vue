<template>
  <!--  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加用户</a-button>-->
  <a-table bordered :data-source="post" :columns="columns" @change="onChange"
           :scroll="{ x: 1700 , y: 600  }"
           row-key="postId"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'imageUrl'">
        <a-image :src="text" style="width: 50px;height: 50px"></a-image>
      </template>
      <template v-else-if="column.dataIndex === 'delete'">
        <a-popconfirm
            v-if="post.length"
            title="是否删除?"
            @confirm="onDelete(record.postId)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
      <template v-else-if="column.dataIndex === 'update'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.postId]">
            <a-typography-link @click="save(record.postId)">保存 </a-typography-link>
            <a-popconfirm title="取消更新" @confirm="cancel(record.postId)">
              <a> 取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.postId)">更新</a>
          </span>
        </div>
      </template>
      <template
          v-else-if="['postId','postTime','viewCount','topicId'].includes(column.dataIndex)  ">

      </template>
      <template v-else>
        <div class="editable-cell">
          <div v-if="editableData[record.postId]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.postId][column.dataIndex]" @pressEnter="save(record.postId)"/>
            <check-outlined class="editable-cell-icon-check" @click="save(record.postId)"/>
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.postId)"/>
          </div>
        </div>
      </template>
    </template>
  </a-table>
</template>


<script setup lang="ts">

import type {Ref, UnwrapRef} from 'vue';
import {onMounted, reactive, ref} from 'vue';
import {CheckOutlined, EditOutlined} from '@ant-design/icons-vue';
import {message, TableProps} from "ant-design-vue";
import {cloneDeep} from "lodash-es";
import {useRouter} from "vue-router";
import {PostType} from "../models/post";
import {currentID} from "../states/currentID";
import {getAllPost, getDelete, getUpdatePost} from "../services/post";


let router = useRouter();
const columns = [
  {
    title: 'id',
    dataIndex: 'postId',
    key: "postId"
  },
  {
    title: '帖子标题',
    dataIndex: 'title',
    key: "title",
    onFilter: (value: string, record: PostType) => record.title.indexOf(value) === 0,
    sorter: (a: PostType, b: PostType) => a.title.length - b.title.length,
  },
  {
    title: '帖子内容',
    dataIndex: 'content',
    key: "content",
    onFilter: (value: string, record: PostType) => record.content.indexOf(value) === 0,
    sorter: (a: PostType, b: PostType) => a.content.length - b.content.length,
  },
  {
    title: '图片',
    dataIndex: 'imageUrl',
    key: "imageUrl",
    scopedSlots: {customRender: 'pic'}
  },
  {
    title: '帖子发布时间',
    dataIndex: 'postTime',
    key: "postTime",
    sorter: (a: PostType, b: PostType) => a.postTime > b.postTime
  },
  {
    title: '作者',
    dataIndex: 'authorId',
    key: "authorId"

  },
  {
    title: '状态',
    dataIndex: 'status',
    key: "status"

  },
  // {
  //   title: '加入队伍用户',
  //   dataIndex: 'userVOS',
  //   key: "userVOS"
  //
  // },
  {
    title: '浏览次数',
    dataIndex: 'viewCount',
    key: "viewCount"
  },
  {
    title: '话题',
    dataIndex: 'topicId',
    key: "topicId"

  },

  {
    title: '更新',
    dataIndex: 'update',
  },
  {
    title: '删除',
    dataIndex: 'delete',
  },

];
const post: Ref<PostType[]> = ref([]);
const onChange: TableProps<PostType>['onChange'] = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
}
// const count = computed(() => user.value.length + 1);
const editableData: UnwrapRef<Record<string, PostType>> = reactive({});
const genderMap = {
  0: '未知',
  1: '男',
  2: '女'
};
const statusMap = {
  0: '公开',
  1: '私有',
  2: '加密',

};
const roleMap = {
  0: '普通用户',
  1: '管理员',

};
onMounted(async () => {
  let resp = await getAllPost();
  const postMap = resp.data.map(item => ({
    ...item,
    postStatus: statusMap[item.status] || '',
  }))
  post.value = postMap
  console.log(post.value)
  message.success("查询成功")
})

const edit = (id: string) => {
  editableData[id] = cloneDeep(post.value.filter(item => id === item.postId)[0]);
};

const genderReverseMap = {
  '未知': 0,
  '男': 1,
  '女': 2
};
const statusReverseMap = {
  '正常': 0,
  '封号': 1,

};
const roleReverseMap = {
  '普通用户': 0,
  '管理员': 1,

};
const save = async (id: string) => {
  const oldData = cloneDeep(post.value.filter(item => id === item.postId)[0]);
  Object.assign(post.value.filter(item => id === item.postId)[0], editableData[id]);

  // Object.keys(editableData[id]).map(key => {
  //   if (key === 'gender') {
  //     editableData[id].gender = genderReverseMap[editableData[id][key]];
  //   } else if (key === 'userStatus') {
  //     editableData[id].userStatus = statusReverseMap[editableData[id][key]];
  //   } else if (key === 'userRole') {
  //     editableData[id].userRole = roleReverseMap[editableData[id][key]];
  //   } else {
  //     editableData[id][key] = editableData[id][key];
  //   }
  // });

  editableData[id] = cloneDeep(editableData[id]);
  const oldUser = ref(editableData[id]);
  const postData = {
    currentId: currentID.value,
    ...oldUser.value,
  }

  // todo 前端参数校验
  let resp = await getUpdatePost(postData);

  if (resp == null) {
    // 如果更新失败，则还原旧数据，并更新对应行按钮状态
    Object.assign(post.value.filter(item => id === item.postId)[0], oldData);
    if (editableData[id]) {
      editableData[id] = cloneDeep(oldData);
    }
    editableData[id] = null; // 退出编辑模式
    message.error("更新失败");
  } else {
    // 如果更新成功，则清除编辑状态，更新列表中的数据，并提示用户
    editableData[id] = null;
    message.success("更新成功");
  }
};


const onDelete = async (id: number) => {
  console.log(id)
  let res = await getDelete(id);

}

const handleAdd = async () => {

}

const cancel = (id: string) => {
  if (editableData[id]) {
    Object.assign(editableData[id], post.value.filter(item => id === item.postId)[0]);
    editableData[id] = null; // 退出编辑模式
  }
};

</script>


<style scoped>

</style>
