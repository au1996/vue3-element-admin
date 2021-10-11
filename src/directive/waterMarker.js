export default {
  mounted(el, binding) {
    if (binding.value) {
      const { text, fontSize, color } = binding.value
      addWaterMarker(el, text, fontSize, color)
    } else {
      addWaterMarker(el)
    }
  }
}

// 水印文字，父元素，字体，文字颜色
/**
 *
 * @param {*} ele 元素
 * @param {*} text 水印文字
 * @param {*} fontSize 字体大小
 * @param {*} color 文字颜色
 */
function addWaterMarker(ele, text, fontSize, color) {
  const can = document.createElement('canvas')
  ele.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  var cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.fontSize = fontSize || '16px Microsoft JhengHei'
  cans.fillStyle = color || 'rgba(180, 180, 180, 0.5)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  text = text || '雪月水印'
  cans.fillText(text, can.width / 10, can.height / 2)
  ele.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}
