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

You can tell TypeScript to treat your RCX components differently (using the JSX types from RCX itself) by adding the following to the top of any RCX component files.

Note that you cannot use JSX for both React and RCX within the same file - the types will clash - instead you create separate files for your RCX app/components.

```tsx
/** @jsxImportSource @blinkorb/rcx */
```

### Example Usage

We provide a `useRCXInReact` hook that allows you to register an RCX component within a React app, and have it automatically re-render when any relevant state is changed. This works very similarly to React hooks you are familiar with like `useMemo` and `useEffect`, where the second argument is a list of dependencies, and when any of those change it will trigger RCX to re-render.

The below example shown you how you can share a simple piece of React state with an RCX app/component that will render that state.

The first piece of code is our RCX app (that sets up the canvas) and an additional component that renders some content (just renders a `count` using the `Text` component).

Note the `@jsxImportSource` comment at the top of the RCX component file because it is assumed that the `tsconfig.json` is already setup for React JSX, but this file needs RCX's JSX.

```tsx
/** @jsxImportSource @blinkorb/rcx */

import {
  Canvas,
  type RCXComponent,
  Text,
  useCanvasContext,
} from '@blinkorb/rcx';

const Content: RCXComponent<{ count: number }> = ({ count }) => {
  const { width, height } = useCanvasContext();

  return (
    <Text
      x={width * 0.5}
      y={height * 0.5}
      style={{
        fill: 'black',
        align: 'center',
        baseline: 'middle',
        fontSize: 100,
      }}
    >
      {count}
    </Text>
  );
};

const CanvasApp: RCXComponent<{ count: number }> = ({ count }) => (
  <Canvas>
    <Content count={count} />
  </Canvas>
);

export default CanvasApp;
```

This second part is the React app/component that is rendering, and shares a `count` with, the RCX app/components. We're just using a `useState` to track our `count` value, and rendering an "Increment" button to make changes to this state.

It's within our React component that we call the `useRCXInReact` hook, and uses the returned callback to register the canvas element with RCX via a React `ref`.

`useRCXInReact` takes 2 arguments:

- a callback that renders the RCX app/component (returns an RCX element)
- a list of dependencies for this callback (in this case the renderer callback only needs access to the `count` value)

When the dependencies of this hook change we'll handle re-rendering the RCX app/components automatically. If this React component unmounts or the canvas element changes we'll also handle cleaning up everything related to RCX (stop rendering, release any RCX state, etc).

Note there is no `@jsxImportSource` because it is assumed that the `tsconfig.json` is already setup for React JSX.

Note that we are using the `jsx` function directly from `@blinkorb/rcx/jsx-runtime`. This is essentially equivalent to writing `<CanvasApp count={count} />`, but we need to manually call the `jsx` function because this file is a React file and will automatically use React's JSX, but we want to use RCX's JSX. The first argument is the component, and the second argument is an object of props.

```tsx
import { jsx } from '@blinkorb/rcx/jsx-runtime';
import { useRCXInReact } from '@blinkorb/rcx-react';
import { useState } from 'react';

import CanvasApp from './canvas-app';

const ReactApp = () => {
  const [count, setCount] = useState(0);
  const onCanvasChanged = useRCXInReact(
    () => jsx(CanvasApp, { count }),
    [count]
  );

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <canvas ref={onCanvasChanged} />
    </>
  );
};
```

### Linting

If you're using [ESLint](https://eslint.org/) with [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks) you can include our `useRCXInReact` hook in your ESLint config to ensure that all dependencies are correctly provided to the hook.

The `(useRCXInReact)` syntax allows you to add multiple hooks to include in this rule by separating them with a pipe e.g. `(useRCXInReact|useSomeOtherHook)`

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
