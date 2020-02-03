module.exports = {
  'env'          : {
    'es6'    : true,
    'browser': true,
    'node'   : true,
    'jest': true
  },
  'extends'      : 'airbnb-base',
  'globals'      : {
    'Bee'              : true,
    'Atomics'          : 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType' : 'module'
  },
  'rules'        : {
    'semi'                : ['error', 'always'],
    'eqeqeq'              : 'warn',
    'handle-callback-err' : 'warn',
    'require-jsdoc'       : 'warn',
    'no-array-constructor': 'error',
    'no-global-assign'    : 'error',
    'new-cap'             : 'error',
    'no-loop-func'        : 'warn',
    'no-confusing-arrow'  : 'warn',
    'no-throw-literal'    : 'error',
    'spaced-comment'      : ['error', 'always'],
    'key-spacing'         : 'off',
    'comma-dangle'        : 'off',
    'prefer-destructuring': 'off',
    'quotes'                : 'off',
    'object-curly-newline': "off",
    'space-before-function-paren': "off",
    'no-plusplus': "off",
    'no-param-reassign': "off",
    'dot-notation': "off"
  }
};
