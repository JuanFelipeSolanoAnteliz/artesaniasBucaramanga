import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'client'), // Carpeta de frontend
  plugins: [vue()],
  build: {
    outDir: join(__dirname, 'client/dist'), // Carpeta de salida del build
    emptyOutDir: true
  }
});