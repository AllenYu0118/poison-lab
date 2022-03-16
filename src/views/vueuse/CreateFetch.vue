<template>
  <p>isFetching: {{ isFetching }}</p>
  <p>error: {{ error }}</p>
  <p style="text-align: left;">data: <pre>{{ data }}</pre></p>
</template>

<script lang="ts" setup>
import { createFetch } from '@vueuse/core'
const useMyFetch = createFetch({
  baseUrl: 'https://httpbin.org',
  options: {
    async beforeFetch({ options }) {
      options.headers['Authorization'] = `Bearer`

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const { isFetching, error, data } = useMyFetch('/get')
console.log('data: ', data)
console.log('error: ', error)
console.log('isFetching: ', isFetching)
</script>

<style scoped></style>
