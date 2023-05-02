import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        alias: '/',
        name: 'welcome',
        component: () => import('../components/TheWelcome.vue')
    },
    {
        path: '/login',
        alias: '/login',
        name: 'login',
        component: () => import('../components/TheLogin.vue')
    },
    {
        path: '/register',
        alias: '/register',
        name: 'register',
        component: () => import('../components/TheSubscribe.vue')
    },
    {
        path: '/dashboard',
        alias: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/TheDashboard.vue')
    },
    {
        path: '/modifyJSON',
        alias: '/modifyJSON',
        name: 'modifyJSON',
        component: () => import('../components/TheModifyJSON.vue')
    },
    {
        path: '/admin',
        alias: '/admin',
        name:'admin',
        component: () => import('../components/TheAdmin.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;