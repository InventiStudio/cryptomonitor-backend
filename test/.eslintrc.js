module.exports = {
  extends: '../.eslintrc.js',
  env: {
    mocha: true,
  },
  globals: {
    'server': true,
    'supertest': true,
    'expect': true,
    'clean': true,
    'spy': true,
  },
  rules: {
    // Because of babel-plugin-rewire
    'no-underscore-dangle': 0,
    // It's common to use for-of with await inside for testing many conditions at once
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
  }
}
