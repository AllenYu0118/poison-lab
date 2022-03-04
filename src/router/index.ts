import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component: () => import('/@/views/index/index.vue'),
  },
  {
    path: '/intersection-observer',
    component: () => import('/@/views/intersection-observer/index.vue'),
  },
  {
    path: '/publish-subscribe',
    component: () => import('/@/views/publish-subscribe/index.vue'),
  },
  {
    path: '/ref-effect',
    component: () => import('/@/views/ref-effect/index.vue'),
  },

  {
    path: '/demo',
    component: () => import('/@/views/demo/index.vue'),
  },

  {
    path: '/ffmpeg',
    component: () => import('/@/views/ffmpeg/index.vue'),
  },
]

export default createRouter({
  history: createWebHistory('/poison-lab/'),
  routes,
})
