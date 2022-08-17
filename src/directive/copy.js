import Clipboard from 'clipboard'

export default {
  beforeMount(el, { value, arg }) {
    switch (arg) {
      case 'success':
        el.successCallback = value
        break
      case 'error':
        el.errorCallback = value
        break
      default:
        el.clipboardInstance = new Clipboard(el, {
          text() {
            return value
          },
          action() {
            return arg === 'cut' ? 'cut' : 'copy'
          }
        })
        el.clipboardInstance.on('success', (e) => {
          el.successCallback && el.successCallback(e)
        })
        el.clipboardInstance.on('error', (e) => {
          el.errorCallback && el.errorCallback(e)
        })
        break
    }
  },
  beforeUpdate(el, { value, arg }) {
    switch (arg) {
      case 'success':
        el.successCallback = value
        break
      case 'error':
        el.errorCallback = value
        break
      default:
        el.clipboardInstance = new Clipboard(el, {
          text() {
            return value
          },
          action() {
            return arg === 'cut' ? 'cut' : 'copy'
          }
        })
        break
    }
  },
  beforeUnmount(el, { arg }) {
    switch (arg) {
      case 'success':
        el.successCallback = null
        break
      case 'error':
        el.errorCallback = null
        break
      default:
        el.clipboardInstance && el.clipboardInstance.destroy()
        el.clipboardInstance = null
        break
    }
  }
}
