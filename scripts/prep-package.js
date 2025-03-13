import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import packageJson from '../package.json' with { type: 'json' };

const cwd = dirname(fileURLToPath(import.meta.url));

const modifiedJson = {
  ...packageJson,
  main: packageJson.main.replace('src/', '').replace('.ts', '.js'),
  exports: Object.fromEntries(
    Object.entries(packageJson.exports).map(([key, imports]) => [
      key,
      Object.fromEntries(
        Object.entries(imports).map(([path, actual]) => [
          path,
          actual.replace('src/', '').replace('.ts', '.js'),
        ])
      ),
    ])
  ),
};

writeFileSync(
  resolve(cwd, '../dist/package.json'),
  JSON.stringify(modifiedJson, null, 2),
  'utf-8'
);
