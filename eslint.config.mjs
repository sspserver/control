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

      // Import order disagreements with VS Code's own organiser should not
      // break the build — report as warnings instead of errors.
      'perfectionist/sort-imports': 'warn',

      // ── Overly opinionated React rules ──────────────────────────────────
      // These produce high noise with low signal for this codebase.
      'react/no-clone-element': 'off',
      'react/no-unstable-context-value': 'off',
      'react/no-unstable-default-props': 'off',
      // useContext is still idiomatic; 'use()' preference is React 19+ only
      'react/no-use-context': 'off',
      // Direct setState in useEffect is intentional in many patterns here
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      // HMR export rule is dev-only and conflicts with re-export barrel files
      'react-refresh/only-export-components': 'off',
    },
  },
);
