import { RuleTester } from 'eslint';

import relativeExtensions from './relative-extensions.js';

const ruleTester = new RuleTester({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
});

ruleTester.run(
  'relative-extensions', // rule name
  relativeExtensions, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        filename: 'example.js',
        code: "import thing from './thing.js';",
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        filename: 'example.js',
        code: "import thing from './thing.ts';",
        output: "import thing from './thing.js';",
        errors: 1,
      },
      {
        filename: 'example.js',
        code: "import thing from './thing.tsx';",
        output: "import thing from './thing.js';",
        errors: 1,
      },
      {
        filename: 'example.js',
        code: "import thing from './thing.jsx';",
        output: "import thing from './thing.js';",
        errors: 1,
      },
      {
        filename: 'example.js',
        code: "import thing from './thing';",
        output: "import thing from './thing.js';",
        errors: 1,
      },
    ],
  }
);

// eslint-disable-next-line no-console
console.log('All tests passed!');
