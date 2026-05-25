import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For Capacitor (Android/iOS): base must be './'
// For GitHub Pages project page: set VITE_BASE_URL=/repo-name/
// For Netlify/Vercel: leave as '/'
const isCapacitor = process.env.BUILD_TARGET === 'capacitor'
const BASE = isCapacitor ? './' : (process.env.VITE_BASE_URL || '/')

export default defineConfig({
  plugins: [react()],
  base: BASE,
  server: { port: 3000, open: true },
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
