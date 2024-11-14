// @ts-nocheck
const globals = require('globals');
const airbnbBase = require('eslint-config-airbnb-base');
const pluginImport = require('eslint-plugin-import');
const pluginJs = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...airbnbBase.rules,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-console': 'warn',
    },
  },
  pluginJs.configs.recommended,
];
