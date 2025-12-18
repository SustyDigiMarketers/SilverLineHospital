import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
    },
    publicDir: 'public',
    base: '/', // Updated to '/' for custom domain (silverlinehospitals.com)
    server: {
      port: 3000,
      open: true,
      host: true // Listen on all local IPs to allow access from other devices
    }
  };
});