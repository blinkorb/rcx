# RCX

**Reactive JSX-based library for creating HTML5 canvas applications**

## About

RCX closely resembles other JSX-based view libraries such as React/Vue, but allows you to render to canvas. It can even be used in conjunction with other view libraries (see [Integrating With React](#integrating-with-react) example).

## Installation

```bash
npm i @blinkorb/rcx -P
```

## The Basics

### TypeScript Config

In order to use RCX with TypeScript (if you are not already using another JSX-based library), you should set the following `compilerOptions` in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@blinkorb/rcx"
  }
}
```

### Entry Point

All components in RCX are function components. To get started you should create an `App` component that renders the `Canvas` component.

The canvas component allows you to control things like the size and pixel density of your canvas, and provides context to other components to inform them of its size, pixel density, etc.

```tsx
import { Canvas } from '@blinkorb/rcx';

const App = () => {
  return <Canvas>{/* Your component here */}</Canvas>;
};
```

You can then render this component using the `render` function. The render function's second argument is the DOM node where you would like the canvas to appear. If the node is already a canvas RCX will render to that canvas, otherwise it will add a canvas within that node.

```tsx
import { render } from '@blinkorb/rcx';

render(<App />, document.body);
```

### Basic Components

#### Transform Components

We provide `Translate`, `Scale`, and `Rotate` components that will transform any of their children.

In the below example the `Example1` component will be offset by 10 pixels in both the `x` and `y` axis. The `Example2` component will not be affected by the transform.

```tsx
<>
  <Translate x={10} y={10}>
    <Example1 />
  </Translate>
  <Example2 />
</>
```

#### Shape Components

We provide `Circle`, `Ellipse`, and `Rectangle` components for rendering some basic shapes. Each of these can receive a style prop to apply a stroke/border, and fill. You can also define (for some of these components) if the shape should continue from any existing drawings, or begin a new path by setting the `beginPath` prop. You can also choose to close these shapes by setting the `closePath` prop.

```tsx
<Ellipse
  x={50}
  y={50}
  radiusX={20}
  radiusY={50}
  beginPath
  closePath
  style={{
    strokeWidth: 1,
    stroke: 'black',
    fill: 'red',
  }}
/>
```

## Custom Components

## Hooks

## Integrating With React

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

### Rendering RCX Components Within React

You can render an RCX component within a React app by getting a `ref` to a canvas node and rendering/unmounting the RCX tree at this node within a `useEffect`.

Make sure you're importing the correct `jsx` function from RCX.

```tsx
import { render } from '@blinkorb/rcx';
import { jsx } from '@blinkorb/rcx/jsx-runtime';
import App from './your-canvas-app-component';

const ReactComponent = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unmountOrError = canvas ? render(jsx(App, {}), canvas) : null;

    // Check if we have an error
    if (unmountOrError && 'error' in unmountOrError) {
      console.error(unmountOrError.error);
    }

    return () => {
      // Ensure we have the unmount function (no errors)
      if (unmountOrError && !('error' in unmountOrError)) {
        unmountOrError();
      }
    };
  }, [canvas]);

  return <canvas ref={setCanvas} />;
};
```
