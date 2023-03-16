module.exports = {
  extends: '@antfu',
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'curly': ['error', 'multi-line'],
    'vue/multi-word-component-names': 0,
    'no-console': 0,
    'max-statements-per-line': 0,
  },
};
