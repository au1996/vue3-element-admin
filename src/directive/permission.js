export default {
  mounted(el, binding) {
    const permission = binding.value // 获取到 v-permission的值
    if (permission) {
      const hasPermission = checkArray(permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}

function checkArray(key) {
  const arr = ['admin', 'xueyue']
  if (arr.includes(key)) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
