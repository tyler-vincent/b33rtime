import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'


export default defineConfig({
  plugins: [
    WindiCSS({
      root: __dirname,
      scan: {
        fileExtensions: ['erb', 'haml', 'html', 'vue', 'js', 'ts', 'jsx', 'tsx'],
        dirs: ['app/views', 'app/javascript'], // or app/javascript, or app/packs
      },
    }),
    RubyPlugin(),
    vue(),
  ],
})
