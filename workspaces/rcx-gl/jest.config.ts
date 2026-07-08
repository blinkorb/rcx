import type { Config } from 'jest';

const MODULES_TO_TRANSFORM = [
  'color',
  'color-string',
  'color-name',
  'color-convert',
];

const config = {
  transformIgnorePatterns: [
    `node_modules/(?!(${MODULES_TO_TRANSFORM.join('|')})/)`,
  ],
  preset: 'ts-jest/presets/js-with-ts-esm',
  testMatch: ['<rootDir>/src/**/*.(spec|test).{js,jsx,ts,tsx}'],
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '(.+)\\.js$': '$1',
    '^@blinkorb/rcx$': '<rootDir>/../rcx/src/index.ts',
    '^@blinkorb/rcx/root$': '<rootDir>/../rcx/src/root.ts',
    '^@blinkorb/rcx/jsx-runtime$': '<rootDir>/../rcx/src/jsx-runtime.ts',
  },
} satisfies Config;

export default config;
