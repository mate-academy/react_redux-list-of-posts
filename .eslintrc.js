module.exports = {
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  "globals": {
    it: false
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'no-console': 'off',
    "no-shadow": 'off',
    "no-param-reassign": 0
  }
};
