import type { Config } from 'jest';

const config = {
  preset: 'ts-jest/presets/default-esm',
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '(.+)\\.js$': '$1',
  },
} satisfies Config;

export default config;
