# RCX React

**Utilities for using RCX within React applications**

## Usage

### TypeScript Config With React

If you're already using JSX with another view library, such as React, you'll likely already have your `tsconfig.json` setup to handle JSX for React e.g.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

You can tell TypeScript to treat your RCX components differently (using the JSX types from RCX itself) by adding the following to the top of any RCX component files:

```tsx
/** @jsxImportSource @blinkorb/rcx */
```

### Linting

If you're using [ESLint](https://eslint.org/) with [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks) you can include our `useRCXInReact` hook in your ESLint config to ensure that all dependencies are correctly provided to the hook.

The `(useRCXInReact)` allows you to add multiple hooks to include in this rule by separating them with a pipe e.g. `(useRCXInReact|useSomeOtherHook)`

```js
{
  rules: {
    'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks: '(useRCXInReact)',
        },
      ],
  }
}
```
