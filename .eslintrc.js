module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  "rules": {
    "no-param-reassign": "off",
    "react-hooks/exhaustive-deps": "off",
  }
};
