<template>
  <input type="text" v-model="value" input-default class="input" />
  <button btn-default @click="create">生成封面图</button><br />
  <input type="file" accept="video/*" @change="fileChange" />
  <CreatePosterList :media="media" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CreatePosterList from './components/CreatePosterList.vue'

export default defineComponent({
  name: 'ffmpeg',
  components: {
    CreatePosterList,
  },
  setup() {
    const media = ref('https://video.591.com.tw/debug/source/house/2022-02-24/5529.mp4')
    const value = ref(media.value)

    const fileChange = event => {
      media.value = event.target.files[0]
      console.log('file: ', event.target.files[0])
    }

    const create = () => {
      media.value = value.value
    }

    return {
      media,
      value,
      fileChange,
      create,
    }
  },
})
</script>

<style scoped>
.input {
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid #ccc;
}
</style>
