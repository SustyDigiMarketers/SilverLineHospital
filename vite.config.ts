import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
// @ts-expect-error JS script without types
import { generateInsuranceManifest } from './scripts/generate-insurance-manifest.js'
// @ts-expect-error JS script without types
import { generateManifest as generateGalleryManifest } from './scripts/generate-gallery-manifest.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function manifestPlugin() {
  return {
    name: 'vite-manifest-plugin',
    buildStart() {
      try {
        generateGalleryManifest();
        generateInsuranceManifest();
      } catch (e) {
        console.error('Failed to generate manifests in Vite plugin:', e);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [manifestPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
        }
      }
    }
  }
})
