<template>
  <button @click="store.increment">当前数字是：{{ store.count }}</button>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/'
const store = useCounterStore()
</script>

<style scoped>
button {
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
</style>
