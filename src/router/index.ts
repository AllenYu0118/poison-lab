import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
    history: createWebHistory('/poison-lab/'),
    
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