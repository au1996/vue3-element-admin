import { ElMessage } from 'element-plus'

export default {
  mounted(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        ElMessage.error('内容为空')
        return
      }

      let content = el.$value
      if (typeof el.$value === 'function') {
        content = el.$value()
      }

      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      const result = document.execCommand('Copy')

      if (result) {
        ElMessage.success('复制成功：' + content)
      }

      document.body.removeChild(textarea)
    }

    el.addEventListener('click', el.handler)
  },
  updated(el, { value }) {
    el.$value = value
  },
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}
