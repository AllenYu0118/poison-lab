<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />

  <h3>useMousePosition：{{ x }}:{{ y }}</h3>

  <h3>路由：</h3>
  <span v-for="(route, index) in routes" :key="index" style="margin-right: 20px">
    <template v-if="route.children">
      <p>
        <router-link :to="route.path">{{ route.path }}</router-link>
      </p>
      <span
        v-for="(subRoute, subIndex) in route.children"
        :key="subIndex"
        style="margin-right: 20px"
      >
        <router-link :to="route.path + subRoute.path">{{ subRoute.path }}</router-link>
      </span>
    </template>

    <template v-else>
      <router-link :to="route.path">{{ route.path }}</router-link>
    </template>
  </span>

  <p>customRef：<input v-model="text" /> {{ text }}</p>

  <div @click="counterClickHandle">ref: {{ counter }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref, watch, computed } from 'vue'
import { useMousePosition, useDebouncedRef } from '@/hooks/'
import HelloWorld from '@/components/HelloWorld.vue'
import { routes } from '@/router/'
import { useWatchEffect } from './watchEffect'

interface Data {
  itemRefs: HTMLElement[]
}
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup(props, ctx) {
    // ref demo
    const counter = ref(0)
    const counterClickHandle = () => {
      counter.value++
    }

    // composition api
    const { x, y } = useMousePosition()

    // watchEffect demo
    useWatchEffect(counter)

    // customRef demo
    const text = useDebouncedRef('hello')

    return {
      x,
      y,
      counter,
      counterClickHandle,
      routes,
      text,
    }
  },
})
</script>
