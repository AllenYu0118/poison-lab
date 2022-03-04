<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <img :src="item.url" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import ts from '../ts'
import '../ffmpeg.min.js'

const { createFFmpeg, fetchFile } = window.FFmpeg

interface DataItem {
  index: number
  url: string
  file: File
}

interface Progress {
  duration?: number
  time?: number
  ratio?: number
}

export default defineComponent({
  props: {
    url: String,
  },
  setup(props) {
    const dataList = ref([] as DataItem[])
    const duration = ref(0)
    const count = 9
    const fileName = 'video'

    const step = computed(() => {
      return duration.value / count
    })

    const ffmpeg = createFFmpeg({
      log: false,
      corePath: './FFmpeg/ffmpeg-core.js', // 原文件放在新框架下
    })

    ffmpeg.setProgress((event: Progress) => {
      if (event.duration) {
        duration.value = event.duration
      }
    })

    // 初始化
    ;(async (media: string | File) => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      ffmpeg.FS('writeFile', fileName, await fetchFile(media))

      await nextTick(0, count)
    })(props.url)

    async function nextTick(init, stop) {
      const data = await transToImage(init)
      dataList.value.push({ ...data })

      init++

      if (init >= stop) return false

      setTimeout(() => {
        nextTick(init, stop)
      }, 100)
    }

    async function transToImage(index) {
      const outFileName = `${fileName}-poster-${index}.jpg`
      // ts(async function* () {
      await ffmpeg.run(
        '-ss',
        `${Math.floor(step.value * index)}`,
        '-i',
        fileName,
        '-frames',
        '1',
        '-to',
        `10`,
        outFileName,
      )
      // yield
      // })()

      const data = await ffmpeg.FS('readFile', outFileName)
      const imgFileBlob = new Blob([data.buffer], { type: 'jpg' })
      const file = new window.File([imgFileBlob], outFileName, { type: 'jpg' })
      const url = URL.createObjectURL(imgFileBlob)

      return {
        index,
        file,
        url,
      }
    }

    return {
      dataList,
    }
  },
})
</script>

<style scoped>
.list {
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  width: 150px;
}

.list-item img {
  width: 100%;
  height: auto;
}
</style>
