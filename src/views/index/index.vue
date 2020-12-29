<template>
    <img alt="Vue logo" src="/@/assets/logo.png" />
    <h2>{{ x }}:{{ y }}</h2>
    <p v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path">{{ route.path }}</router-link>
    </p>
    <input v-model="text"> {{ text }}
    <div @click="counterClickHandle">{{ counter }}</div>
    <p>{{ twiceCounter }}</p>

    <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref, watch, computed } from 'vue'
import { useMousePosition, useDebouncedRef } from '/@/hooks/'
import HelloWorld from '/@/components/HelloWorld.vue'
import { routes } from '/@/router/'

interface Data {
  itemRefs: HTMLElement[]
}
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup(props, ctx) {
    let itemRefs: HTMLElement[] = []
    const setItemRef = (el: HTMLElement) => itemRefs.push(el)


    onMounted(() => {
      counterClickHandle()
    })

    const counter = ref(0)

    watch(counter, (newVal, oldVal) => {
      console.log('newVal, oldVal: ', newVal, oldVal, itemRefs);
    })

    const twiceCounter = computed(() => counter.value * 2)

    const counterClickHandle = () => {
      counter.value++
      console.log('counter: ', counter.value);
    }
    const { x, y } = useMousePosition()

    return {
      x,
      y,
      counter,
      counterClickHandle,
      twiceCounter,
      routes,
      text: useDebouncedRef('hello')
    }
  }
})
</script>
