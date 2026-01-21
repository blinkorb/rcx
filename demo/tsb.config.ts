import { Config } from '../node_modules/@jakesidsmith/tsb/dist/index';

const config: Config = {
  indexHTMLPath: 'index.html',
  main: 'index.tsx',
  outDir: 'build',
  tsconfigPath: 'tsconfig.json',
  host: 'localhost',
};

export default config;
