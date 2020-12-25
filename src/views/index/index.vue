<template>
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <h2>{{ x }}:{{ y }}</h2>
  <p v-for="(route, index) in routes" :key="index">
    <router-link :to="route.path">{{ route.path }}</router-link>
  </p>
  
  
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMousePosition } from '/@/hooks/'
import HelloWorld from '/@/components/HelloWorld.vue'
import { routes } from '/@/router/'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup(props, ctx) {
    console.log('props, ctx: ', props, ctx)
    const { x, y } = useMousePosition()

    return {
      x,
      y,
      routes
    }
  }
})
</script>
