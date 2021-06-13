const userList = [
  { username: 'admin', password: '123', role: 'admin', email: 'admin@qq.com', createTime: 1623318878699 },
  { username: 'editor', password: '456', role: 'editor', email: 'editor@qq.com', createTime: 1623328878699 },
  { username: 'xueyue', password: '123456', role: 'admin', email: 'xueyue@qq.com', createTime: 1623338878699 }
]

const roleList = [
  { name: 'admin', description: '管理员', level: 0 },
  { name: 'editor', description: '编辑人员', level: 1 }
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
          code: 20000,
          message: '登录成功',
          role,
          token: new Date().getTime().toString(32)
        }
      } else {
        return {
          code: 40000,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 20000,
        message: 'success',
        data: query
      }
    }
  },
  {
    url: '/api/users',
    method: 'get',
    timeout: 500,
    response: () => {
      const list = userList
      return {
        code: 20000,
        message: 'success',
        list
      }
    }
  },
  {
    url: '/api/roles',
    method: 'get',
    response: () => {
      const list = roleList
      return {
        code: 20000,
        message: 'success',
        list
      }
    }
  }
]
