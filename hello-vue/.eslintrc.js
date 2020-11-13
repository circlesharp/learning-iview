module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:vue/essential",
        "airbnb-base",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "uni": true,
        "Vue": true,
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
      // don't require .vue extension when importing
      'import/extensions': [
        'error',
        {
      	js: 'never',
      	vue: 'never'
        }
      ],
      'import/no-unresolved': [0],
      // allow optionalDependencies
      'import/no-extraneous-dependencies': [
        'error',
        {
      	optionalDependencies: ['test/unit/index.js']
        }
      ],
      'linebreak-style': [0, 'unix'],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-console': [0],
      'class-methods-use-this': [0],
      'max-len': [1, 400],
      // 禁止变量名中使用下划线
      'no-underscore-dangle': 0,
      // 禁止对函数的参数重新赋值
      'no-param-reassign': ["error", { "props": false }],
      "no-shadow": ["error", { "allow": ["res"] }],
      "import/newline-after-import": ["error", { "count": 2 }],
      "no-tabs": "off",
      "import/newline-after-import": "off",
      // 允许多余的return出现
      "no-useless-return": 0,
      "no-param-reassign": 0,//允许给参数重新赋值
    }
};