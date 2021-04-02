const userList = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'editor', password: '456', role: 'editor' },
  { username: 'xueyue', password: '123456', role: 'admin' }
]

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      let flag = false
      let role = ''
      userList.forEach((item) => {
        if (item.username === body.username && item.password === body.password) {
          flag = true
          role = item.role
        }
      })
      if (flag) {
        return {
          code: 200,
          message: '登录成功',
          role,
          token: new Date().getTime().toString(32)
        }
      } else {
        return {
          code: 400,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/user-list',
    method: 'get',
    timeout: 100,
    statusCode: 200,
    response: ({ query }) => {
      const list = userList
      return {
        code: 200,
        message: 'success',
        list
      }
    }
  }
]
