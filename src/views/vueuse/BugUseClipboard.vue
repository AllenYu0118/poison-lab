<template>
  <p>isSupported: {{ isSupported }}</p>
  <p>Current copied: {{ text || 'none' }}</p>
  <input v-model="source" type="text" />
  <button @click="copy()">
    <span v-if="!copied">Copy</span>
    <span v-else>Copied!</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
const source = ref('Hongbusi')
const { text, copy, copied, isSupported } = useClipboard({ source })
</script>
