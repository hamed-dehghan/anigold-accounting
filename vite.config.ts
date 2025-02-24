import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if your app is in a subdirectory
  server: {
    open: true, // Automatically open the browser
    hmr: true,  // Hot module replacement
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },

  },
  build: {
    chunkSizeWarningLimit: 500, 
  },
})
