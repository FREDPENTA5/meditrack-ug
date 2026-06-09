module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['dist', 'build', 'node_modules', '.turbo', 'coverage'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      excludedFiles: ['apps/web/vite.config.ts', 'apps/web/tailwind.config.ts'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
      ],
      parserOptions: {
        project: ['./apps/web/tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
      settings: {
        react: { version: 'detect' },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'react/no-array-index-key': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-underscore-dangle': 'off',
      },
    },
    {
      files: ['apps/api/**/*.ts'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
      parserOptions: {
        project: ['./apps/api/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
