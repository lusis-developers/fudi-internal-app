import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
          @import '@fortawesome/fontawesome-free/scss/solid.scss';
          @import '@fortawesome/fontawesome-free/scss/regular.scss';
          @import '@fortawesome/fontawesome-free/scss/brands.scss';
          @import '@nabux-crush/crush-styles/nabuxInternalVariables';
          @import './src/styles.scss';
        `
      }
    }
  },
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})