/**
 * Eslint 检查规则（A）
 * "off" 或者 0 -- 关闭规则
 * "warn" 或者 1 -- 将规则打开为警告（不影响退出代码）
 * "error" 或者 2 -- 将规则打开为错误（触发时退出代码为 1）
 */
module.exports = {
  root: true, // 禁用持续查找（root）
  env: {
    browser: true, // 启用浏览器全局变量。
    node: true, // Node.js全局变量和Node.js范围。
    es6: true // 启用ES6的功能。
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析器（parser）
    ecmaVersion: 2022, // ECMA版本
    sourceType: 'module' // 指定源代码存在的位置，script | module，默认为script
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 0,
    'no-unused-vars': 0
  },
  overrides: [
    {
      files: [
        'src/views/**/index.vue',
        'src/layout/**/index.vue',
        'src/components/**/index.vue',
        'src/components/Loading.vue'
      ], // 配置文件
      rules: {
        'vue/multi-word-component-names': 0
      } // 关闭组件命名规则
    }
  ]
}
