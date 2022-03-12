<template>
  <div class="parent" ref="parent">
    <div class="wrap">
      <div class="target" ref="target">Target Element (scroll down)</div>

      <div class="watch">{{ targetIsVisible ? 'inside' : 'outside' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
const parent = ref(null)
const target = ref(null)
const targetIsVisible = useElementVisibility(target, { scrollTarget: parent })
</script>

<style scoped>
.parent {
  height: 300px;
  overflow-y: auto;
  margin-top: 300px;
  border: 2px solid #ccc;
}
.wrap {
  height: 500vh;
  display: flex;
  justify-content: center;
}
.target {
  width: 350px;
  height: 60px;
  line-height: 60px;
  margin-top: 50px;
  background: rgba(255, 0, 0, 0.226);
  border: 2px dashed black;
}

.watch {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 150px;
  background: green;
  color: white;
  font-size: 2rem;
  text-align: center;
  line-height: 100px;
}
</style>
