<template>
  <div class="item" v-for="item in 5" :ref="setItemRef" :data-time="new Date()" :key="item">
    {{ item }}
  </div>

  <div>当前 itemRefs 内有元素：{{ itemRefs.length }} 个</div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
export default defineComponent({
  setup() {
    let itemRefs: HTMLElement[] = reactive([])
    const setItemRef = (el: HTMLElement) => itemRefs.push(el)

    watch(itemRefs, () => {
      console.log('itemRefs: ', itemRefs)
    })

    return {
      setItemRef,
      itemRefs,
    }
  },
})
</script>

<style scoped>
.item {
  height: 30px;
  border-bottom: 1px solid #eeeeee;
}
</style>
