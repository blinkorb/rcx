import eslintConfigRCXDev from '@blinkorb/eslint-config-rcx-dev';
import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  eslintConfigRCXDev,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks: '(useRCXInReact)',
        },
      ],
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
    },
  },
]);
