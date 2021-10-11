export default {
  mounted(el, binding) {
    let wait = 500
    _handleParams(el, binding)
    el.timeCall = null
    el.removeEventListener('click', () => {})
    el.addEventListener('click', (e) => {
      if (binding.modifiers.stop) e.stopPropagation()
      if (binding.modifiers.prev) e.preventDefault()
      clearTimeout(el.timeCall)
      if (el.callbackParams && el.callbackParams.length > 0) {
        wait = el.callbackParams[0]
        el.timeCall = setTimeout(() => {
          el.callback(...el.callbackParams.slice(1))
        }, wait)
      } else {
        el.timeCall = setTimeout(() => {
          el.callback()
        }, wait)
      }
    })
  },
  updated(el, binding) {
    _handleParams(el, binding)
  },
  unmounted(el) {
    el.removeEventListener('click', () => {})
  }
}

function _handleParams(el, binding) {
  el.callbackParams = []
  if (Array.isArray(binding.value)) {
    if (typeof binding.value[0] === 'function') {
      el.callback = binding.value[0]
    }
    if (binding.value.length > 1) {
      el.callbackParams = binding.value.slice(1)
    }
  } else if (typeof binding.value === 'function') {
    el.callback = binding.value
  } else {
    console.error('The v-debounce command must have a parameter function')
  }
}
