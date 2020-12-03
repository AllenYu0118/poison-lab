import { reactive, onMounted, onUnmounted, toRefs } from 'vue'

interface PositionReactive {
  x: number
  y: number
}

export const useMousePosition = () => {
  const position = reactive<PositionReactive>({
    x: 0,
    y: 0
  })

  const getPosition = (e: MouseEvent) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', getPosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mouseover', getPosition)
  })

  return toRefs<PositionReactive>(position)
}
