import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/',
  server: {
    open: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx',
    },
  },
});
