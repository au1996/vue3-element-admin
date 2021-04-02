import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
import indexModule from '../mock/index'

export function setupProdMockServer() {
  createProdMockServer([...indexModule])
}
