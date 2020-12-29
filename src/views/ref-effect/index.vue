<template>
    <h2>{{ x }}:{{ y }}</h2>
    <div class="item" v-for="item in 5" :ref="setItemRef" :data-time="new Date()" :key="item">{{ item }}</div>

    <div>当前 itemRefs 内有元素：{{ itemRefs.length }} 个</div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRaw, } from 'vue'
import { useMousePosition } from '/@/hooks/'
export default defineComponent({
    setup () {
        let itemRefs: HTMLElement[] = reactive([])
        const setItemRef = (el: HTMLElement) => itemRefs.push(el)

        watch(itemRefs, () => {
            console.log('itemRefs: ', itemRefs, toRaw(itemRefs) );
        })

        const { x, y } = useMousePosition()

        return {
            setItemRef,
            itemRefs,
            x,
            y,
        }
    }
})
</script>

<style scoped>
.item {
  height: 30px;
  border-bottom: 1px solid #eeeeee;
}
</style>
