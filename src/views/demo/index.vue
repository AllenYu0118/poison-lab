<template>
  <div>
    <h2>Demo</h2>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { proxyDemo } from './utils'

export default defineComponent({
  name: 'demo',
  setup() {
    const person = proxyDemo()
    console.log('person: ', person.like)

    return {}
  },
})
</script>
