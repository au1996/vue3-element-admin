const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false, // 线上环境取消map文件
  devServer: {
    port: 3001,
    before: require('./mock/mock-server.js'),
    proxy: {
      '/api': {
        target: 'http://admin.xueyueob.cn/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  chainWebpack(config) {
    // 打包分析工具
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
    // 别名
    config.resolve.alias.set('@', resolve('src')).set('@img', resolve('src/assets/img'))
    // source-map
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))
    // 自定义环境变量
    config.plugin('define').tap((args) => {
      const arg = args[0]
      Object.assign(
        arg['process.env'],
        process.env.NODE_ENV === 'development' ? require('./src/config/env.dev') : require('./src/config/env.prod')
      )
      return args
    })
    // 修改loader
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:6].[ext]'
          }
        }
      })
    // 代码优化
    config.optimization
      // 代码切割
      .splitChunks({
        chunks: 'all', // async对异步引入的代码分割 initial对同步引入代码分割 all对同步异步引入的分割都开启
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        // maxSize: 80000, // 尝试将大于80kb的文件拆分成n个80kb的文件
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 5, // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件（按需加载模块）
        maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个（加载初始页面）
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        name: true, // 缓存组里面的filename生效，覆盖默认命名
        cacheGroups: {
          // 缓存组，将所有加载模块放在缓存里面一起分割打包
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 0,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementPlus: {
            name: 'chunk-elementPlus', // split elementPlus into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
          },
          echarts: {
            name: 'chunk-echarts', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
          },
          components: {
            name: 'chunk-components',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      .runtimeChunk({
        name: 'runtime'
      })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据进行压缩
            deleteOriginalAssets: false // 是否删除源文件
          }),
          new TerserPlugin({
            cache: true,
            sourceMap: false,
            parallel: true,
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 线上去掉console
              }
            }
          })
        ]
      }
    }
  }
}
