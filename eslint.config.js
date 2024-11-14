const globals = require('globals');
const pluginJs = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script',
      },
    },
    rules: {
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
  pluginJs.configs.recommended,
];
