import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  plugins: [
    vue(),
  ],
  css: {
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-nested')
        ]
      }
    }
  },
  resolve: {
    alias: [
      { find: 'vue', replacement: fileURLToPath(new URL('node_modules/vue/dist/vue.esm-bundler.js', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@http', replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@errors', replacement: fileURLToPath(new URL('./src/components/Errors', import.meta.url)) },
      { find: '@helpers', replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)) },
      { find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
      { find: '@plugins', replacement: fileURLToPath(new URL('./src/plugins', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@config', replacement: fileURLToPath(new URL('./src/config.js', import.meta.url)) },
      { find: '@actions', replacement: fileURLToPath(new URL('./src/actions', import.meta.url)) },
    ]
  },
  build: {
    chunkSizeWarningLimit: 5000, // increase limit to 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
