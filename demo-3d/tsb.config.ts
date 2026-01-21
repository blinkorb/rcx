import { Config } from '../node_modules/@jakesidsmith/tsb/dist/index';

const config: Config = {
  indexHTMLPath: '../demo/index.html',
  main: 'index.tsx',
  outDir: 'build',
  tsconfigPath: '../demo/tsconfig.json',
  host: 'localhost',
};

export default config;
