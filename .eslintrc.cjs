module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    'eslint-plugin-import-helpers',
    'import',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],

    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['/scss$/'],
          ['/^react$/'],
          ['/^three$/'],
          ['module'],
          ['/^types/'],

          ['/^engine/'],

          ['parent', 'sibling', 'index'],
        ],

        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
};
