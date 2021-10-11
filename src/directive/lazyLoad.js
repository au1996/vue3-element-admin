export default {
  mounted(el, binding) {
    const defaultSrc = 'http://www.xueyueob.cn/icons/favicon.ico'
    init(el, binding.value, defaultSrc)
    if (IntersectionObserver) {
      setTimeout(() => {
        observe(el)
      }, 0)
    } else {
      listenerScroll(el)
    }
  }
}

// 初始化
function init(el, val, def) {
  el.setAttribute('data-src', val)
  el.setAttribute('src', def)
}

// 利用IntersectionObserver监听el
function observe(el) {
  var io = new IntersectionObserver((entries) => {
    const realSrc = el.dataset.src
    // console.log('observe', realSrc, entries[0])
    if (entries[0].isIntersecting) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  })
  io.observe(el)
}

// 监听scroll事件
function listenerScroll(el) {
  const handler = throttle(load, 200)
  load(el)
  window.addEventListener('scroll', () => {
    handler(el)
  })
}

// 节流
function throttle(fn, delay) {
  let timer
  let prevTime
  return function (...args) {
    const currTime = Date.now()
    const context = this
    if (!prevTime) prevTime = currTime
    clearTimeout(timer)

    if (currTime - prevTime > delay) {
      prevTime = currTime
      fn.apply(context, args)
      clearTimeout(timer)
      return
    }

    timer = setTimeout(function () {
      prevTime = Date.now()
      timer = null
      fn.apply(context, args)
    }, delay)
  }
}

// 加载真实图片
function load(el) {
  const windowHeight = document.documentElement.clientHeight
  const elTop = el.getBoundingClientRect().top
  const elBtm = el.getBoundingClientRect().bottom
  const realSrc = el.dataset.src
  if (elTop - windowHeight < 0 && elBtm > 0) {
    if (realSrc) {
      el.src = realSrc
      el.removeAttribute('data-src')
    }
  }
}
