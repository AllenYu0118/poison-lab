import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(process.env.VITE_ROUTER_BASE),
    routes: [
        {
            path: '/',
            component: () => import('/@/views/index/index.vue')
        },
        {
            path: '/intersection-observer',
            component: () => import('/@/views/intersection-observer/index.vue')
        }
    ]
})