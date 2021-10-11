const componentFiles = import.meta.globEager('./*.js')
const pathList = []

for (const path in componentFiles) {
  pathList.push(path)
}

export default {
  install(Vue) {
    pathList.forEach((path) => {
      const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = componentFiles[path]
      Vue.directive(moduleName, value.default)
    })
  }
}
