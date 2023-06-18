import {createRouter, createWebHashHistory, NavigationGuard} from 'vue-router';
import Index from "../pages/Index.vue";
import User from "../pages/UserPage.vue";
import UserManage from "../pages/UserManagePage.vue";
import TeamManage from "../pages/TeamManagePage.vue";
import PostManage from "../pages/PostManagePage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes = [
    // 欢迎页
    {
        path: '/',
        component: Index,
    },
    // 个人管理页
    {
        path: '/user',
        component: User,
        meta: {
            requireAuth: true // 设置需要登录验证
        }
    },
    // 用户管理页
    {
        path: '/userManage',
        component: UserManage,
        meta: {
            requireAuth: true // 设置需要登录验证
        }
    },
    // 队伍管理页
    {
        path: '/team',
        component: TeamManage,
        meta: {
            requireAuth: true // 设置需要登录验证
        }
    },
    // 文章管理页
    {
        path: '/post',
        component: PostManage,
        meta: {
            requireAuth: true // 设置需要登录验证
        }
    },
    // 登录页
    {
        path: '/login',
        component: LoginPage,
        meta: {
            navShow: true // 设置导航栏显示
        }
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const beforeEachFunc: NavigationGuard = (to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (localStorage.getItem('user')) { // 判断是否已经登录
            next();
        } else {
            next({
                path: '/login', // 跳转到登录页面
                query: {redirect: to.fullPath} // 传递当前路由地址到登录页面，登录后进行跳转
            });
        }
    } else {
        next();
    }
};

router.beforeEach(beforeEachFunc);

export default router;
