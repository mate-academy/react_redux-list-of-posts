module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
