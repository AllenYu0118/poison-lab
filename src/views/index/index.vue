<template>
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <h2>{{ x }}:{{ y }}</h2>
  <router-link to="/intersection-observer">intersection-observer</router-link>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMousePosition } from '/@/hooks/'
import HelloWorld from '/@/components/HelloWorld.vue'

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
      y
    }
  }
})
</script>
