module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['babel', 'import', 'prettier', '@typescript-eslint'],
  rules: {
    // Plugin rules:
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/no-default-export': 'error',
    'import/named': 'error',
    'prettier/prettier': 'error',

    // overriding recommended rules
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // This rule gets confused with async functions and setting the
    // ctx for route responses.
    'require-atomic-updates': 0,

    // possible errors
    'array-callback-return': 'error',
    'consistent-return': 'error',
    'default-case': 'error',
    '@typescript-eslint/dot-notation': 'error',
    eqeqeq: 'error',
    'for-direction': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-implied-eval': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-else-return': 'error',
  },
};
