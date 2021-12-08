const directiveFiles = require.context('./', true, /\.js$/)

export default {
  install(Vue) {
    directiveFiles.keys().forEach((path) => {
      if (!path.includes('index.ts')) {
        const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
        const value = directiveFiles(path)
        Vue.directive(moduleName, value.default)
      }
    })
  }
}
