import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import VitePluginVue from '@vitejs/plugin-vue'
import VitePluginCompression from 'vite-plugin-compression'
import VitePluginVueDevTools from 'vite-plugin-vue-devtools'
import RollupPluginEsbuild from 'rollup-plugin-esbuild'
import { viteMockServe } from 'vite-plugin-mock'

const RollupPlugin = () => ({
  ...RollupPluginEsbuild({
    target: 'chrome76',
    loaders: {
      '.vue': 'js'
    }
  }),
  enforce: 'post'
})

/**
 * https://cn.vitejs.dev/config/
 */
export default defineConfig(({ command, mode, isSsrBuild }) => {
  const ENV = loadEnv(mode, process.cwd())
  const IS_DEV = command === 'serve'
  const SHOW_DEV_TOOL = false
  const SHOW_MOCK = true

  console.log({ command, mode, isSsrBuild, ENV })

  const baseConfig = {
    base: IS_DEV ? '/' : '/vue3-element-admin/',
    plugins: [
      VitePluginVue(),
      viteMockServe({
        supportTs: false,
        mockPath: 'mock',
        localEnabled: IS_DEV,
        prodEnabled: !IS_DEV && SHOW_MOCK,
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    server: {
      port: 3001,
      open: false,
      proxy: {
        '/api': {
          target: 'https://geo.datav.aliyun.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    esbuild: {
      pure: ['console.log', 'console.dir'],
      drop: ['debugger']
    },
    build: {
      target: 'chrome76',
      sourcemap: IS_DEV,
      manifest: IS_DEV,
      chunkSizeWarningLimit: 500,
      rollupOptions: {}
    }
  }

  if (!IS_DEV) {
    baseConfig.build.rollupOptions = {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'vuex'],
          'element-plus': ['element-plus'],
          echarts: ['echarts'],
          axios: ['axios', 'qs']
        }
      }
    }
    baseConfig.plugins.push(
      RollupPlugin(),
      VitePluginCompression({
        verbose: true, // 输出压缩结果
        disable: false, // 是否禁用
        threshold: 1024 * 10, // 体积大于 10kb 才会被压缩,单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' // 生成的压缩包后缀
      })
    )
  }

  if (IS_DEV && SHOW_DEV_TOOL) {
    baseConfig.plugins.push(VitePluginVueDevTools())
  }

  return baseConfig
})
