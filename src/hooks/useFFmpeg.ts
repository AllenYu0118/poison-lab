import { ref, watchEffect, computed } from 'vue'
import './ffmpeg.min.js'
const { createFFmpeg, fetchFile } = window.FFmpeg

interface PosterItem {
  index: number
  url: string
  file: File
}

interface Progress {
  duration?: number
  time?: number
  ratio?: number
}

interface UseFFmpegOptions {
  media: string | File
  count?: number
  fileName?: string
}

export const useFFmpeg = (useFFmpegOptions: UseFFmpegOptions) => {
  const { media, count = 9, fileName = 'video' } = useFFmpegOptions
  const posterList = ref<PosterItem[]>([])
  const duration = ref(0)

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

  watchEffect(async () => {
    await init(media)
  })

  // 初始化
  async function init(media: string | File) {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }

    ffmpeg.FS('writeFile', fileName, await fetchFile(media))

    await nextTick(0, count)
  }

  async function nextTick(init, stop) {
    const data = await transToImage(init)
    posterList.value.push({ ...data })

    init++

    if (init >= stop) return false

    setTimeout(() => {
      nextTick(init, stop)
    }, 100)
  }

  async function transToImage(index) {
    const outFileName = `${fileName}-poster-${index}.jpg`

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

  return posterList
}
