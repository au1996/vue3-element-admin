import debounce from './debounce'
import throttle from './throttle'
import permission from './permission'
import lazyLoad from './lazyLoad'
import waterMarker from './waterMarker'
import draggable from './draggable'
import copy from './copy'

const directives = {
  debounce,
  throttle,
  permission,
  lazyLoad,
  waterMarker,
  draggable,
  copy
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
