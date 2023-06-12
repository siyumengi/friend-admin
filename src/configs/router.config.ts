import Index from "../pages/Index.vue";
import User from "../pages/UserPage.vue";
import UserManage from "../pages/UserManagePage.vue";
import TeamManage from "../pages/TeamManagePage.vue";
import PostManage from "../pages/PostManagePage.vue";
import LoginPage from "../pages/LoginPage.vue";


const routes = [
//      欢迎页
    {
        path: '/',
        component: Index,

    },
//      个人管理页
    {
        path: '/user',
        component: User,
        meta: {
            needLogin: true
        }
    },
//      用户管理页
    {
        path: '/userManage',
        component: UserManage,
        meta: {
            needLogin: true
        }
    },
//      队伍管理页
    {
        path: '/team',
        component: TeamManage,
        meta: {
            needLogin: true
        }
    },
//      文章管理页
    {
        path: '/post',
        component: PostManage,
        meta: {
            needLogin: true
        }
    },
//     登录
    {
        path: '/login',
        component: LoginPage,
    },

]

export default routes;
