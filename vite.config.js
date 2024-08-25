import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/post':'https://full-stack-blog-lyart.vercel.app'
    },
  },
  plugins: [react()],
})
