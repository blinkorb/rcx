import type { Config } from 'jest';

const config = {
  preset: 'ts-jest/presets/default-esm',
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
  },
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
} satisfies Config;

export default config;
