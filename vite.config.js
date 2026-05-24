import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE to your GitHub repo name if deploying as a project page.
// Example: if your repo is github.com/yourname/lifer  →  base: '/lifer/'
// If deploying to yourname.github.io (user page)      →  base: '/'
const BASE = process.env.VITE_BASE_URL || '/'

export default defineConfig({
  plugins: [react()],
  base: BASE,
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts:  ['recharts'],
          icons:   ['lucide-react'],
        },
      },
    },
  },
})
