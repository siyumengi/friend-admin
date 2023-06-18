import myAxios from "../configs/myAxios";
import {setCurrentUserState} from "../states/user";
import {currentID} from "../states/currentID";
import {message} from "ant-design-vue";
import qs from 'qs';
// 获取当前用户
export const getCurrentUser = async () => {
    let resp = await myAxios.get("/user/current?id=" + currentID.value);
    if (resp.code === 0) {
        setCurrentUserState(resp.data)
        console.log(resp.data)
        return resp.data
    }
    return null
}

// 登录
export const getLogin = async (user) => {
    let resp = await myAxios.post('/user/login', user);
    // console.log(resp)
    if (resp.code === 0) {
        currentID.value = resp.data.id
        let res = await myAxios.get("/user/current?id=" + currentID.value);
        if (res.code === 0) {
            setCurrentUserState(res.data)
        }
        return true
    }
    return false
}

// 退出

export const getUserLogout = async () => {
    let resp = await myAxios.get("/user/logout?id=" + currentID.value);
    if (resp.code === 0) {
        return true
    }
    return false
}

// 更新
export const getUpdateTeam = async (postData) => {
    const resp= await myAxios.post("/team/update", postData);

    if (resp.code === 0) {
        let res = await myAxios.get("/user/current?id=" + currentID.value);
        if (res.code === 0) {
            currentID.value = res.data.id
            setCurrentUserState(res.data)
            return res.data
        }
    }
}


// 查询用户
export const getAllTeam = async () => {
    let resp = await myAxios.get("/team/list" );
    if (resp.code === 0){
        return resp
    }
    message.error("查询失败，请检查是否登录")
}

// 根据 id 删除
export const getDelete = async (id: number) => {
    const resp = await myAxios.post('/team/delete', {
        currentId: currentID.value,
        id: id,
    });
    console.log(resp)
    if (resp) {
        message.success("删除成功")
        return true;
    }else{
        message.error("删除失败")

    }

}
