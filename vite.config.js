import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  base: '/Attendance-Chaser-frontEnd/',
  plugins: [vue()],
  server: {
    hostname: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {
        target: 'https://attendancechaser-env.eba-hw6nimfd.ap-northeast-1.elasticbeanstalk.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
