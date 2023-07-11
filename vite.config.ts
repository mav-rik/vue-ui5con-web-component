import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import virtualIndex from './node_modules/@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    // await virtualIndex(),
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.startsWith('my-') || tag.startsWith('ui5-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
