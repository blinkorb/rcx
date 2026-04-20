import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const cwd = process.cwd();

const packageJson = JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf-8'));

const modifiedJson = {
  ...packageJson,
  scripts: {},
  main: packageJson.main.replace('src/', '').replace('.ts', '.js'),
  exports: Object.fromEntries(
    Object.entries(packageJson.exports).map(([key, imports]) => [
      key,
      Object.fromEntries(
        Object.entries(imports).map(([importPath, actual]) => [
          importPath,
          actual.replace('src/', '').replace('.ts', '.js'),
        ])
      ),
    ])
  ),
};

writeFileSync(
  resolve(cwd, 'dist/package.json'),
  JSON.stringify(modifiedJson, null, 2),
  'utf-8'
);
