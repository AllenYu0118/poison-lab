import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  base: '/poison-lab/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
  },
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify()],
      rules: [
        ['input-default', { padding: 0, height: '30px', 'min-width': '500px' }],
        [
          'btn-default',
          {
            height: '32px',
            'min-width': '100px',
            'background-color': '#fff',
            border: '1px solid #ccc',
          },
        ],
      ],
    }),
  ],
})
