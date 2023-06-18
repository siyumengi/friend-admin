<template>
<!--  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加用户</a-button>-->
  <a-table bordered :data-source="user" :columns="columns" @change="onChange"
           :scroll="{ x: 1700 , y: 600  }"
           row-key="id"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'avatar'">
        <a-image :src="text" style="width: 50px;height: 50px"></a-image>
      </template>
      <template v-else-if="column.dataIndex === 'delete'">
        <a-popconfirm
            v-if="user.length"
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
          v-else-if="['id','userAccount','createTime','updateTime','isDelete','tags'].includes(column.dataIndex)  ">

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
import {getAllUser, getDelete, getUpdateUser} from "../services/user";
import {cloneDeep} from "lodash-es";
import {UserType} from "../models/user";
import {useRouter} from "vue-router";


let router = useRouter();
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: "id"
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    key: "userAccount",
    onFilter: (value: string, record: UserType) => record.userAccount.indexOf(value) === 0,
    sorter: (a: UserType, b: UserType) => a.userAccount.length - b.userAccount.length,
  },
  {
    title: '昵称',
    dataIndex: 'username',
    key: "username",
    onFilter: (value: string, record: UserType) => record.username.indexOf(value) === 0,
    sorter: (a: UserType, b: UserType) => a.username.length - b.username.length,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: "avatar",
    scopedSlots: {customRender: 'pic'}
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: "age",
    sorter: (a: UserType, b: UserType) => a.age > b.age
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: "email"

  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    filters: [
      {
        text: '未知',
        value: '未知',
      },
      {
        text: '男',
        value: '男',
      },
      {
        text: '女',
        value: '女',
      }
    ],
    onFilter: (value: string, record) => record.gender.indexOf(value) === 0
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: "phone"

  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: "tags"

  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: "userRole"
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    key: "userStatus"

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime"

  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: "updateTime"

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
const user: Ref<UserType[]> = ref([]);
const onChange: TableProps<UserType>['onChange'] = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
}
// const count = computed(() => user.value.length + 1);
const editableData: UnwrapRef<Record<string, UserType>> = reactive({});
const genderMap = {
  0: '未知',
  1: '男',
  2: '女'
};
const statusMap = {
  0: '正常',
  1: '封号',

};
const roleMap = {
  0: '普通用户',
  1: '管理员',

};
onMounted(async () => {
  let resp = await getAllUser('');
  const userMap = resp.data.map(item => ({
    ...item,
    gender: genderMap[item.gender] || '',
    userStatus: statusMap[item.userStatus] || '',
    userRole: roleMap[item.userRole] || ''
  }))
  user.value = userMap
  console.log(user.value)
  message.success("查询成功")
})

const edit = (id: string) => {
  editableData[id] = cloneDeep(user.value.filter(item => id === item.id)[0]);
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
  const oldData = cloneDeep(user.value.filter(item => id === item.id)[0]);
  Object.assign(user.value.filter(item => id === item.id)[0], editableData[id]);
  editableData[id] = cloneDeep(user.value.filter(item => id === item.id)[0]);

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
  let resp = await getUpdateUser(oldUser);

  if (resp == null) {
    // 如果更新失败，则还原旧数据，并更新对应行按钮状态
    Object.assign(user.value.filter(item => id === item.id)[0], oldData);
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
  await getDelete(id);
}

const handleAdd = async () => {

}

const cancel = (id: string) => {
  if (editableData[id]) {
    Object.assign(editableData[id], user.value.filter(item => id === item.id)[0]);
    editableData[id] = null; // 退出编辑模式
  }
};

// const rowSelection: TableProps['rowSelection'] = {
//   onChange: (selectedRowKeys: string[], selectedRows: UserType[]) => {
//     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
// };
// getCheckboxProps: (record: UserType) => ({
//   disabled: record.isDelete, // Column configuration not to be checked
//   name: record.isDelete
// }),

</script>


<style scoped>

</style>
