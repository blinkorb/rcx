import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import eslintConfigRCXDev from './eslint.config.js';

export default defineConfig([
  eslintConfigRCXDev,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    name: 'rcx-dev/react',
    settings: {
      react: {
        version: '19',
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks: '(useRCXInReact)',
        },
      ],
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
]);
