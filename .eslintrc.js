module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    'consistent-return': 0,
    'import/extensions': 0,
    // does not understand Webpack's aliases
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    // for consistency sometimes we want to export without default (services)
    'import/prefer-default-export': 0,
    'key-spacing': 0,
    'no-multi-spaces': 0,
    'no-param-reassign': 0,
    quotes: [ 2, 'single' ],
    semi: ["error", "never"],
  },
}
