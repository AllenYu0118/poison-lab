import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/poison-lab/',
  resolve:{
      alias: {
      '/@': path.resolve(__dirname, './src')
  }},
  server: {
    port: 3001
  },
  plugins: [
    vue()
  ]
})
