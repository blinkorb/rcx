import { Config } from '@jakesidsmith/tsb';

const config: Config = {
  indexHTMLPath: 'demo/index.html',
  main: 'demo/index.tsx',
  outDir: 'build',
  tsconfigPath: 'tsconfig.dev.json',
  host: 'localhost',
};

export default config;
