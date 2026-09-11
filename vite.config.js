import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: {
      ignored: ['**/downloads/**', '**/scratch/**', '**/public/assets/New folder/**'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        customizer: resolve(__dirname, 'customizer.html'),
      },
    },
  },
});
