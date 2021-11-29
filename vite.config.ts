import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import { ServerConf } from './src/config'

const { host, port } = ServerConf

const isProd = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host,
    port
  },
  plugins: [
    vue(),
    // VitePluginElementPlus({
    //   // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
    //   // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
    //   // 的文档注释
    //   // useSource: true,
    //   format: !isProd ? 'esm' : 'cjs'
    // }),
    Components({
      resolvers: [
        ElementPlusResolver()
        // ElementPlus({
        //   useSource: true
        // })
      ]
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: !isProd,
      prodEnabled: isProd,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
    })
  ],
  resolve: {
    alias: {
      views: resolve(__dirname, 'src/views'),
      styles: resolve(__dirname, 'src/styles'),
      '@': resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`
      }
    }
  }
})
