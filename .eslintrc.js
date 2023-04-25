module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
  overrides: [
    {
      files: ['src/features/comments/commentsSlice.ts'], 
      rules: { 'no-param-reassign': ['error', { props: false }] }, 
    },
    {
      files: ['src/features/user/userSlice.ts'], 
      rules: { 'no-param-reassign': ['error', { props: false }] }, 
    },
    {
      files: ['src/features/selectedPost/selectedPostSlice.ts'], 
      rules: { 'no-param-reassign': ['error', { props: false }] }, 
    },
    {
      files: ['src/features/posts/postsSlice.ts'], 
      rules: { 'no-param-reassign': ['error', { props: false }] }, 
    },
  ],
};
