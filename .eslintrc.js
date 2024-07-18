module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
  },
};
