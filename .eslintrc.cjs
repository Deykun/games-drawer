const { resolve } = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:react/recommended', 'standard-with-typescript', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  include: ["src", ".eslintrc.cjs"],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "prettier"],
  settings: {
    'import/resolver': {
      'alias-array': {
        alias: true,
        map: [
          ['@', resolve(__dirname, './src/')],
        ],
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
