<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <img :src="item.url" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFFmpeg } from '@/hooks/'

export default defineComponent({
  props: {
    media: [String, File],
  },
  setup(props) {
    const dataList = useFFmpeg({ media: props.media, count: 9 })

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
