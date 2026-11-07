import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8444),
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8444),
  },
})
