const userList = [
  {
    username: 'admin',
    password: '123',
    role: 'admin',
    introduction: '管理员',
    avatar: 'https://www.xyob.cn/icons/favicon.ico',
    email: 'admin@qq.com',
    createTime: 1623318878699
  },
  {
    username: 'editor',
    password: '456',
    role: 'editor',
    introduction: '搬砖码农',
    avatar: 'https://www.xyob.cn/cube/cube02.bmp',
    email: 'editor@qq.com',
    createTime: 1623328878699
  },
  {
    username: 'xueyue',
    password: '123456',
    role: 'admin',
    introduction: '否定先生',
    avatar: 'https://www.xyob.cn/cube/cube03.bmp',
    email: 'xueyue@qq.com',
    createTime: 1625213469913
  }
]

const roleList = [
  { name: 'admin', description: '管理员', level: 0 },
  { name: 'editor', description: '编辑人员', level: 1 }
]

const userMockList = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      let flag = -1
      userList.forEach((item, index) => {
        if (item.username === body.username && item.password === body.password) {
          flag = index
        }
      })
      if (~flag) {
        const data = {
          code: 0,
          message: '登录成功',
          token: new Date().getTime().toString(32),
          ...userList[flag]
        }
        return data
      } else {
        return {
          code: 400,
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
        code: 0,
        message: 'success',
        data: query
      }
    }
  },
  {
    url: '/api/users',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      const str = body.keyword
      const page = body.page
      const pageSize = body.page_size
      let result = userList
      if (str) {
        result = userList.filter((row) => row.username.includes(str) || row.email.includes(str))
      }

      return {
        code: 0,
        message: 'success',
        total: result.length,
        data: result.slice((page - 1) * pageSize, page * pageSize)
      }
    }
  },
  {
    url: '/api/roles',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: roleList,
        total: roleList.length
      }
    }
  }
]

export default userMockList
