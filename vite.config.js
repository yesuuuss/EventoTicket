
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // 👈 nuevo

export default defineConfig({
  plugins: [react(), tailwindcss()],          // 👈 agrégalo aquí
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true }
    }
  }
})
