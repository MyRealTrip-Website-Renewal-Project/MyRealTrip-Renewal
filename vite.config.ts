import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/MyRealTrip-Renewal/', // GitHub Pages 배포용 base 경로
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/_variables.scss' as *; @use '@/styles/_mixins.scss' as *;`,
      },
    },
  },
}); 