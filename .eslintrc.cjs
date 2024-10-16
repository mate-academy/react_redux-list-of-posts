module.exports = {
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.spec.jsx'],
      rules: {
        'react/jsx-filename-extension': ['off'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'jsx-a11y',
    'import',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    // JS
    semi: 'off', // Отключаем стандартное правило для семиколонов
    '@typescript-eslint/semi': ['error', 'always'], // Оставляем для TypeScript
    'prefer-const': 'error',
    curly: ['error', 'all'],
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        code: 80,
      },
    ],
    'no-redeclare': ['error', { builtinGlobals: true }],
    'no-console': 'error',
    'operator-linebreak': 'off',
    'brace-style': ['error', '1tbs'],
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'implicit-arrow-linebreak': 'off',

    // React
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'standard/no-callback-literal': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['Label'],
        required: {
          some: ['id', 'nesting'],
        },
        allowChildren: true,
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Typescript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'src/vite-env.d.ts',
    'cypress',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
