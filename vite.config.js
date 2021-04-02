import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const prodMock = true
  return {
    base: '/', // 开发或生产环境服务的 公共基础路径。
    plugins: [
      vue(),
      viteMockServe({
        supportTs: false,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@img': resolve('./src/assets/img')
      }
    },
    server: {
      port: 7001,
      open: false,
      proxy: {
        '/api': 'http://admin.xueyueob.cn/api'
      }
    }
  }
})
