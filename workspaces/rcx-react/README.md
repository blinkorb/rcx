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
