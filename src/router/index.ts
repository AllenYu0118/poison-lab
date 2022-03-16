import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
  },
  {
    path: '/intersection-observer',
    component: () => import('@/views/intersection-observer/index.vue'),
  },
  {
    path: '/publish-subscribe',
    component: () => import('@/views/publish-subscribe/index.vue'),
  },
  {
    path: '/ref-effect',
    component: () => import('@/views/ref-effect/index.vue'),
  },

  {
    path: '/demo',
    component: () => import('@/views/demo/index.vue'),
  },

  {
    path: '/ffmpeg',
    component: () => import('@/views/ffmpeg/index.vue'),
  },

  {
    path: '/use-pinia',
    component: () => import('@/views/use-pinia/index.vue'),
  },

  {
    path: '/vueuse',
    component: () => import('@/views/vueuse/index.vue'),
    children: [
      { path: 'bug-use-element-visibility', component: () => import('@/views/vueuse/BugUseElementVisibility.vue') },
      { path: 'bug-use-clipboard', component: () => import('@/views/vueuse/BugUseClipboard.vue') },
      { path: 'createFetch', component: () => import('@/views/vueuse/CreateFetch.vue') },
    ],
  },
]

export default createRouter({
  history: createWebHistory('/poison-lab/'),
  routes,
})
