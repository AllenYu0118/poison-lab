import { createRouter, createWebHistory } from 'vue-router'
const base = process.env.NODE_ENV === 'development' ? '' : '/poison-lab/'

export const routes = [
    {
        path: '/',
        component: () => import('/@/views/index/index.vue')
    },
    {
        path: '/intersection-observer',
        component: () => import('/@/views/intersection-observer/index.vue')
    },
    {
        path: '/publish-subscribe',
        component: () => import('/@/views/publish-subscribe/index.vue')
    },
    {
        path: '/ref-effect',
        component: () => import('/@/views/ref-effect/index.vue')
    },

    {
        path: '/demo',
        component: () => import('/@/views/demo/index.vue'),
        children: [
            {
                path: '/1',
                component: () => import('/@/views/demo/1.vue')
            },
            {
                path: '/2',
                component: () => import('/@/views/demo/2.vue')
            }

        ]
    },
]

export default createRouter({
    history: createWebHistory(base),
    routes
})
