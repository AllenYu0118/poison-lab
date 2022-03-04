<template>
  <CreatePosterList url="https://video.591.com.tw/debug/source/house/2022-02-24/5529.mp4" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreatePosterList from './components/CreatePosterList.vue'

export default defineComponent({
  name: 'ffmpeg',
  components: {
    CreatePosterList,
  },
})
</script>

<style scoped lang="scss"></style>
