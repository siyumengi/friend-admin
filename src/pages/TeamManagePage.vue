<template>
  <!--  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加用户</a-button>-->
  <a-table bordered :data-source="team" :columns="columns" @change="onChange"
           :scroll="{ x: 1700 , y: 600  }"
           row-key="id"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'avatarUrl'">
        <a-image :src="text" style="width: 50px;height: 50px"></a-image>
      </template>
      <template v-else-if="column.dataIndex === 'delete'">
        <a-popconfirm
            v-if="team.length"
            title="是否删除?"
            @confirm="onDelete(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
      <template v-else-if="column.dataIndex === 'update'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">保存 </a-typography-link>
            <a-popconfirm title="取消更新" @confirm="cancel(record.id)">
              <a> 取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.id)">更新</a>
          </span>
        </div>
      </template>
      <template
          v-else-if="['id','createUser','hasJoinNum'].includes(column.dataIndex)  ">

      </template>
      <template v-else>
        <div class="editable-cell">
          <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.id][column.dataIndex]" @pressEnter="save(record.id)"/>
            <check-outlined class="editable-cell-icon-check" @click="save(record.id)"/>
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.id)"/>
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
import {UserType} from "../models/user";
import {useRouter} from "vue-router";
import {TeamType} from "../models/team";
import {getAllTeam, getDelete, getUpdateTeam, getUpdateUser} from "../services/team";


let router = useRouter();
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: "id"
  },
  {
    title: '队伍名称',
    dataIndex: 'name',
    key: "name",
    onFilter: (value: string, record: TeamType) => record.name.indexOf(value) === 0,
    sorter: (a: TeamType, b: TeamType) => a.name.length - b.name.length,
  },
  {
    title: '队伍介绍',
    dataIndex: 'description',
    key: "description",
    onFilter: (value: string, record: TeamType) => record.description.indexOf(value) === 0,
    sorter: (a: TeamType, b: TeamType) => a.description.length - b.description.length,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    key: "avatarUrl",
    scopedSlots: {customRender: 'pic'}
  },
  {
    title: '最大人数',
    dataIndex: 'maxNum',
    key: "maxNum",
    sorter: (a: TeamType, b: TeamType) => a.maxNum > b.maxNum
  },
  {
    title: '过期时间',
    dataIndex: 'expireTime',
    key: "expireTime"

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
    title: '创建人用户信息',
    dataIndex: 'createUser',
    key: "createUser"
  },
  {
    title: '已加入的用户数',
    dataIndex: 'hasJoinNum',
    key: "hasJoinNum"

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
const team: Ref<TeamType[]> = ref([]);
const onChange: TableProps<UserType>['onChange'] = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
}
// const count = computed(() => user.value.length + 1);
const editableData: UnwrapRef<Record<string, TeamType>> = reactive({});
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
  let resp = await getAllTeam();
  const postMap = resp.data.map(item => ({
    ...item,
    teamStatus: statusMap[item.status] || '',
  }))
  team.value = postMap
  console.log(team.value)
  message.success("查询成功")
})

const edit = (id: string) => {
  editableData[id] = cloneDeep(team.value.filter(item => id === item.id)[0]);
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
  const oldData = cloneDeep(team.value.filter(item => id === item.id)[0]);
  Object.assign(team.value.filter(item => id === item.id)[0], editableData[id]);

  Object.keys(editableData[id]).map(key => {
    if (key === 'gender') {
      editableData[id].gender = genderReverseMap[editableData[id][key]];
    } else if (key === 'userStatus') {
      editableData[id].userStatus = statusReverseMap[editableData[id][key]];
    } else if (key === 'userRole') {
      editableData[id].userRole = roleReverseMap[editableData[id][key]];
    } else {
      editableData[id][key] = editableData[id][key];
    }
  });

  editableData[id] = cloneDeep(editableData[id]);
  const oldUser = ref(editableData[id]);
  const postData = {
    currentId: currentID.value,
    ...oldUser.value,
  }

  // todo 前端参数校验
  let resp = await getUpdateTeam(postData);

  if (resp == null) {
    // 如果更新失败，则还原旧数据，并更新对应行按钮状态
    Object.assign(team.value.filter(item => id === item.id)[0], oldData);
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

import {ref} from 'vue';
import {currentID} from "../states/currentID";


const onDelete = async (id: number) => {
  let res = await getDelete(id);
  if (res) {
    editableData[id].isDelete = true;
  }
}

const handleAdd = async () => {

}

const cancel = (id: string) => {
  if (editableData[id]) {
    Object.assign(editableData[id], user.value.filter(item => id === item.id)[0]);
    editableData[id] = null; // 退出编辑模式
  }
};

</script>


<style scoped>

</style>
