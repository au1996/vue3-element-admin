import { configure, start, done } from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import router from './router'
import { getToken, getRoles } from './utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach: from', from)

  // cancel axios request
  if (Array.isArray(window.axiosCancelTokenList)) {
    window.axiosCancelTokenList.forEach((e) => e('cancel request'))
    window.axiosCancelTokenList = []
  }
  // start progress bar
  start()
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    // set page title
    document.title = getPageTitle(to.meta.title)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      done()
    } else {
      const roles = getRoles()
      const routes = router.getRoutes().filter((r) => r.path === to.path)
      if (routes.length) {
        // Permission filtering
        const toRoute = routes[0]
        if ((toRoute.meta && !toRoute.meta.roles) || (toRoute.meta && toRoute.meta.roles.includes(roles))) {
          next()
        } else {
          next('/401')
        }
      } else {
        // Otherwise jump to 404
        next('/404')
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  done()
})
