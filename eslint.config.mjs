import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';
import nextPlugin from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default antfu(
  {
    react: true,
    typescript: true,
    lessOpinionated: true,
    isInEditor: false,
    stylistic: {
      semi: true,
    },
    formatters: {
      css: true,
      html: 'prettier',
      prettierOptions: {
        maxLineLength: 80,
        printWidth: 80,
      },
    },
    ignores: ['next-env.d.ts', 'src/generated/*'],
  },
  compat.config({
    extends: ['next', 'prettier'],
  }).recommended,
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off',
      'style/brace-style': ['error', '1tbs'],
      'ts/consistent-type-definitions': ['error', 'type'],
      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
      'react/prefer-shorthand-fragment': ['off'],
      'format/prettier': 'off',
    },
  },
);
