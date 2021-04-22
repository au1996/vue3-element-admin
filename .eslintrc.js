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
  parserOptions: {
    parser: 'babel-eslint', // 解析器（parser）
    ecmaVersion: 2020, // ECMA版本
    sourceType: 'module' // 指定源代码存在的位置，script | module，默认为script
  },
  // eslint:recommended:表示引入eslint的核心功能，并且报告一些常见的共同错误。
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    'vue/html-self-closing': 0,
    // 设置每行最大属性数
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10, // 标签为单行时，每行最大属性数值为 10，默认值为 1
        multiline: {
          max: 1, // 标签为多行时，每行最大属性数字为 1，默认值为 1
          allowFirstLine: false // 不允许属性与该标记名称位于同一行，默认值为 false
        }
      }
    ],
    'vue/no-multiple-template-root': 'off',
    // 禁用单行标签内容需换行的校验
    'vue/singleline-html-element-content-newline': 'off',
    // 禁用多行标签内容需换行的校验
    'vue/multiline-html-element-content-newline': 'off',
    // 组件 name 属性值必须使用帕斯卡命名法（单词首字母大写）
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 禁用禁止使用 v-html 的校验
    'vue/no-v-html': 'off',
    // 对象必须使用 getter / setter 对，即：每个已定义 setter 的属性都需有一个 getter
    'accessor-pairs': 2,
    // 箭头函数 => 前后必须有空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 单行代码块花括号打开块之后和关闭块之前，至少一个空格
    'block-spacing': [2, 'always'],
    // 强制执行标准大括号风格样式（关键字要与花括号保持在同一行）
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true // 允许同一行上打开和关闭括号
      }
    ],
    // 关闭驼峰命名规则校验（变量命名时，名称之间不允许下划线，常量（全部大写）除外）
    camelcase: [
      0,
      {
        properties: 'always' // 属性名称强制执行驼峰命名法样式
      }
    ],
    // 在对象或数组中不允许尾随逗号
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    // only-multiline：都行
    'comma-dangle': [2, 'never'],
    // 变量声明，数组文字，对象文字，函数参数和序列中的逗号前后加上一致的间距
    'comma-spacing': [
      2,
      {
        before: false, // 在逗号前不允许有空格
        after: true // 在逗号后需要一个或多个空格
      }
    ],
    // 使用标准逗号样式，逗号位于当前行的末尾。在数组元素，对象属性或变量声明在同一行之后和同一行需要逗号
    'comma-style': [2, 'last'],
    // 子类构造函数必须使用 super()调用父类构造函数。非子类的构造函数不得调用
    'constructor-super': 2,
    // 当一个块只包含一条语句时，if，else if，else，for，while，或 do 允许省略花括号
    curly: [2, 'multi-line'],
    // 表达式中点"."要求与属性位于同一行
    'dot-location': [2, 'property'],
    // 强制文件以换行符结束（文件以一空行结束）
    'eol-last': 2,
    // 强制使用 === 和 !== 但不将此规则应用于 null
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 使用生成器时关键字 * 前后均须有空格
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 回调模式需处理 err 或 error，报告所有未处理的错误
    'handle-callback-err': [2, '^(err|error)$'],
    // 使用两个空格进行缩进，
    indent: [
      2,
      2,
      {
        SwitchCase: 1 // case 针对 switch 语句使用 2 个空格缩进
      }
    ],
    // 在 JSX 属性中强制使用单引号
    'jsx-quotes': [2, 'prefer-single'],
    // 对象字面量属性中强制在冒号后放置空格，冒号前不允许空格
    'key-spacing': [
      2,
      {
        beforeColon: false, // 不允许在对象文字中的键和冒号之间使用空格
        afterColon: true // 需要在冒号和对象文字中的值之间至少有一个空格
      }
    ],
    // 关键字前后至少有一个空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 构造函数名需以大写字母开头，以下内置标识符可免除此规则：Array、Boolean、 Date、Error、Function、Number、Object、RegExp、String、Symbol
    'new-cap': [
      2,
      {
        newIsCap: true, // new 方式调用的函数需以大写开头
        capIsNew: false // 允许直接调用大写开头的函数，无需使用 new
      }
    ],
    // 使用 new 关键字调用无参构造函数，函数名后强制使用括号
    'new-parens': 2,
    // 禁止使用数组构造函数，
    'no-array-constructor': 2,
    // 禁止使用 arguments.caller 和 arguments.callee
    'no-caller': 2,
    // 关闭 console 检验规则
    'no-console': 'off',
    // 禁止给类赋值
    'no-class-assign': 2,
    // 禁止在条件语句中使用赋值运算符
    'no-cond-assign': 2,
    // 禁止修改 const 关键字声明的变量
    'no-const-assign': 2,
    // 关闭正则表达式中的控制字符校验规则
    'no-control-regex': 0,
    // 不允许对变量使用 delete 操作符
    'no-delete-var': 2,
    // 不允许在函数声明或表达式中使用重复的参数名称
    'no-dupe-args': 2,
    // 不允许在类的声明中出现重复名称
    'no-dupe-class-members': 2,
    // 不允许在对象中使用重复键
    'no-dupe-keys': 2,
    // 不允许在 switch 语句的 case 子句中使用重复的 case 分支
    'no-duplicate-case': 2,
    // 不允许在正则表达式中使用空字符
    'no-empty-character-class': 2,
    // 对象和数组使用解构时，不允许空模式
    'no-empty-pattern': 2,
    // 禁止使用 eval()函数
    'no-eval': 2,
    // 禁止给 catch 语句中的异常参数赋值
    'no-ex-assign': 2,
    // 不允许直接修改内置原生对象
    'no-extend-native': 2,
    // 避免不必要的函数绑定 bind()
    'no-extra-bind': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 在使用函数表达式时，禁止使用不必要的括号
    'no-extra-parens': [2, 'functions'],
    // 禁止 switch 穿透，需使用 break 中断
    'no-fallthrough': 2,
    // 禁止省略浮点数中的 0
    'no-floating-decimal': 2,
    // 不允许重新分配 function 声明
    'no-func-assign': 2,
    // 禁止使用隐式 eval()，即：始终使用函数作为 setTimeout()、setInterval()和execScript()的第一个参数
    'no-implied-eval': 2,
    // 禁止在块中声明 function
    'no-inner-declarations': [2, 'functions'],
    // 不允许 RegExp 构造函数中使用无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止使用无效空格（不是正常的制表符和空格），但允许在字符串中使用任何空格字符
    'no-irregular-whitespace': 2,
    // 禁止使用该__iterator__属性
    'no-iterator': 2,
    // label 标签名不能与变量名相同
    'no-label-var': 2,
    // 禁止使用标签语句
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    // 禁止使用不必要的嵌套块
    'no-lone-blocks': 2,
    // 不允许使用混合空格和制表符进行缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用斜线（\）进行换行
    'no-multi-str': 2,
    // 禁止多个连续空行，最大连续空行数为 1
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    // 不允许修改只读全局变量
    'no-native-reassign': 2,
    // 不允许否定 in 表达式中的左操作数
    'no-negated-in-lhs': 2,
    // 不允许使用 Object 构造函数
    'no-new-object': 2,
    // 不允许使用 new require
    'no-new-require': 2,
    // 禁止使用 Symbol 构造器
    'no-new-symbol': 2,
    // 禁止使用原始包装器，new String，new Number 或 new Boolean
    'no-new-wrappers': 2,
    // 禁止将全局对象作为函数调用，即不允许调用 Math，JSON 和 Reflect 对象作为函数
    'no-obj-calls': 2,
    // 不允许使用八进制
    'no-octal': 2,
    // 不允许字符串中的八进制转义序列
    'no-octal-escape': 2,
    // node 中避免使用__dirname 和__filename 全局变量进行路径字符串拼接
    'no-path-concat': 2,
    // 使用方法 getPrototypeOf 替换__proto__属性
    'no-proto': 2,
    // 不允许同一作用域内声明相同变量名称
    'no-redeclare': 2,
    // 正则表达式文字中不允许有多个空格
    'no-regex-spaces': 2,
    // return 语句中的赋值必需有括号包裹
    'no-return-assign': [2, 'except-parens'],
    // 不允许将变量自我赋值
    'no-self-assign': 2,
    // 禁止变量与自己进行比较操作
    'no-self-compare': 2,
    // 禁止使用逗号运算符，除非在 for 语句的初始化或更新部分，表达式序列显式包含在圆括号中
    'no-sequences': 2,
    // 禁止对全局对象赋值
    'no-shadow-restricted-names': 2,
    // 功能标识符与其应用程序之间不允许有间距
    'no-spaced-func': 2,
    // 禁止使用稀疏数组，不适用于最后一个元素之后的尾随逗号
    'no-sparse-arrays': 2,
    // 使用 this 前请确保 super() 已调用
    'no-this-before-super': 2,
    // 用 throw 抛错时，抛出 Error 对象而不是字符串
    'no-throw-literal': 2,
    // 禁止在行尾添加尾随空白（空格，制表符和其他 Unicode 空白字符）
    'no-trailing-spaces': 2,
    // 禁止引用未声明的变量
    'no-undef': 2,
    // 禁止使用 undefined 来初始化变量
    'no-undef-init': 2,
    // 禁止混淆多行表达式
    'no-unexpected-multiline': 2,
    // 检查循环条件内的引用是否在循环中被修改
    'no-unmodified-loop-condition': 2,
    // 当存在更简单的选择时，此规则不允许三元运算符
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false // 不允许将条件表达式作为默认的分配模式
      }
    ],
    // return，throw，continue，和 break 语句后不允许跟代码
    'no-unreachable': 2,
    // 不允许 return，throw，break，和 continue 语句使用 finally 块，即：finally 代码块中不要再改变程序执行流程，但它允许间接使用
    'no-unsafe-finally': 2,
    // 不允许存在声明但未使用的变量，函数和函数的参数
    'no-unused-vars': [
      0,
      {
        vars: 'all', // 检查全局范围内的变量
        args: 'none' // 不检查参数
      }
    ],
    // 禁止使用.call()和.apply()
    'no-useless-call': 2,
    // 禁止不必要的计算属性键作对象属性
    'no-useless-computed-key': 2,
    // 禁止不必要的构造函数
    'no-useless-constructor': 2,
    // 关闭不必要的转义检测规则
    'no-useless-escape': 0,
    // 对象的属性在同一行上时禁止在属性前使用空格，当对象和属性位于单独的行上时，此规则允许使用空格，因为通常在较长的属性链中添加换行符
    'no-whitespace-before-property': 2,
    // 禁止使用 with
    'no-with': 2,
    // 一个变量关键字（var，let 或 const）只声明一个变量
    'one-var': [
      2,
      {
        initialized: 'never' // 每个作用域要求多个变量声明用于初始化变量
      }
    ],
    // 使用一致的换行符样式，将换行符放置在运算符之后
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before', // 三元运算换行符置于 ? 前
          ':': 'before' // 三元运算换行符置于 : 前
        }
      }
    ],
    // 在 block 语句和类的开头和结尾处不允许出现空行
    'padded-blocks': [2, 'never'],
    // 字符串尽可能使用单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串包含必须被转义的引号即可
        allowTemplateLiterals: true // 允许字符串使用反引号
      }
    ],
    // 禁止使用分号结尾
    semi: [2, 'never'],
    // 分号后强制使用空格，并在分号前禁止使用空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 代码块前至少有一个空格
    'space-before-blocks': [2, 'always'],
    // 函数名称或 function 关键字与开头括号之间不允许有空格
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // 禁止在括号内使用空格
    'space-in-parens': [2, 'never'],
    // 中缀运算符周围需有空格
    'space-infix-ops': 2,
    // 一元运算词后须有空格，一元运算符后不允许有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释//和/*后必须跟一个空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    // 模板字符串${}中不允许有空格
    'template-curly-spacing': [2, 'never'],
    // 不允许 NaN 值得直接比较，需使用 isNaN()
    'use-isnan': 2,
    // typeof 比较需使用有效字符串（"undefined"，"object"，"boolean"，"number"，"string"，"function"，"symbol"，和"bigint"）
    'valid-typeof': 2,
    // 自调用匿名函数 (IIFEs) 使用括号包裹
    'wrap-iife': [2, 'any'],
    // yield 表达式前后都要有空格
    'yield-star-spacing': [2, 'both'],
    // 禁止 Yoda 条件（条件的字面值排在第一，而变量排在第二）
    yoda: [2, 'never'],
    // 使用 const 声明初始赋值后永远不重新赋值的变量
    'prefer-const': 2,
    // 生产环境中禁止使用 debugger 调试器
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 花括号内需要空格（{}除外）
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false // 以对象元素开始或结束的花括号间不允许有空格
      }
    ],
    // 数组方括号内不允许使用空格
    'array-bracket-spacing': [2, 'never']
  }
}
