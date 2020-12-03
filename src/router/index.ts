import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/index/index.vue')
        },
        {
            path: '/intersection-observer',
            component: () => import('../views/intersection-observer/index.vue')
        }
    ]
})