# RCX

**Reactive JSX-based library for creating HTML5 canvas applications**

## Preamble

This library is in early development, and so the interfaces you interact with may change. We'll setup full documentation when the API stabilizes. For now the readme(s) should give you enough info to get started.

## About

RCX closely resembles other JSX-based view libraries such as React/Vue, but allows you to render to canvas. It can even be used in conjunction with other view libraries (see [rcx-react readme](https://github.com/blinkorb/rcx-2d/blob/master/workspaces/rcx/README.md)). It allows you to render using either 2D canvas context or WebGL (or both).

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

The canvas component allows you to control things like the size and pixel ratio of your canvas, and provides context to other components to inform them of its size, pixel ratio, etc.

A `pixelRatio` of 2 and `width` of `100` will actually render a canvas that is `200` in width, but scale your drawings so you don't have to manually scale everything - allows for crisper drawings on high density/retina displays. You can use the `getRecommendedPixelRatio` util to use our recommendation (`2` for any devices with a `devicePixelRatio` greater than or equal to 2, and `1` for every other device).

If you set the `width` and or `height` to `"auto"` then the canvas' pixels will match the actual size of the canvas on the screen (scaled by pixel ratio). This way you can have your canvas automatically scale to fill its parent (using CSS) for example.

```tsx
import { Canvas } from '@blinkorb/rcx';

const App = () => {
  return (
    <Canvas pixelRatio={getRecommendedPixelRatio()}>
      {/* Your component(s) here */}
    </Canvas>
  );
};
```

You can then render this component using the by creating an RCX root and calling the `render` function. The `createRoot` takes an object containing at least one of `ctx2d` (for 2D canvas drawings) and or `ctxGl` (for WebGL drawings). The `render` function receives the JSX element of your canvas app.

You should handle cases where your canvas element does not exist, the browser does not support the context you want to use, or you've failed to provide at least one canvas context to the `createRoot` function, and display a nice error message to the user. The below example uses alerts, but you can do something better.

```tsx
import { createRoot } from '@blinkorb/rcx';

const init = () => {
  // Get an existing canvas from the DOM
  const canvas = document.getElementById('canvas');
  // Or you could create and mount one yourself e.g.
  //
  // const canvas = document.createElement('canvas');
  // document.body.appendChild(canvas);

  if (!canvas) {
    alert('Could not get canvas element');
    return;
  }

  const ctx2d = canvas.getContext('2d');

  if (!ctx2d) {
    alert('Canvas 2D context is not supported in this browser');
    return;
  }

  const root = createRoot({ ctx2d });

  if ('error' in root) {
    alert(root.error);
  } else {
    root.render(<App />);
  }
};

init();
```

## 2D Context Components

You can find some documentation on the 2D context components/utils that we supply in the [rcx-2d readme](https://github.com/blinkorb/rcx-2d/blob/master/workspaces/rcx/README.md).

## WebGL Components

You can find some documentation on the WebGL components/utils that we supply in the [rcx-gl readme](https://github.com/blinkorb/rcx-gl/blob/master/workspaces/rcx/README.md).

## Custom Components

You can define your own components with complex drawing logic directly applied via canvas context using the `useRenderBeforeChildren` and `useRenderAfterChildren` hooks.

It is highly recommended to `.save()` the canvas state before beginning drawing in `useRenderBeforeChildren` and to `.restore()` the canvas state after drawing in the `useRenderAfterChildren`.

We also provide some utils for ensuring the context you want to use was provided before drawing, and for resolving and applying styles (as styles can be provided as an array, and all fills and strokes are always applied in the same way for 2D contexts).

Here's an example that draws a rectangle with rounded corners (using 2D context).

```tsx
import { assertCtx2d, applyFillAndStrokeStyles } from '@blinkorb/rcx-2d';

interface RoundedRectangleProps extends RectangleProps {
  radius: number;
  closePath?: boolean;
}

const RoundedRectangle: RCXComponent<RoundedRectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { x, y, width, height, radius, beginPath = true, closePath } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    renderingContext.ctx2d.moveTo(x + radius, y);
    renderingContext.ctx2d.lineTo(x + width - radius, y);
    renderingContext.ctx2d.arcTo(x + width, y, x + width, y + radius, radius);
    renderingContext.ctx2d.lineTo(x + width, y + height - radius);
    renderingContext.ctx2d.arcTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
      radius
    );
    renderingContext.ctx2d.lineTo(x + radius, y + height);
    renderingContext.ctx2d.arcTo(x, y + height, x, y + height - radius, radius);
    renderingContext.ctx2d.lineTo(x, y + radius);
    renderingContext.ctx2d.arcTo(x, y, x + radius, y, radius);

    if (closePath) {
      renderingContext.ctx2d.closePath();
    }
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.ctx2d.restore();
  });

  return props.children;
};
```

## Hooks

### useCanvasContext

Provides the context from the current canvas including its `pixelRatio`, `width` and `height` (scaled by `pixelRatio`), and actual width/height (e.g. with a `pixelRatio` of `2` and `width` of `100` the `actualWidth` of the canvas will be `200` - you should generally avoid using the actual sizes and rely on the scaled `width` and `height` values).

### useRenderBeforeChildren

Used for creating custom components with complex rendering logic. Takes a callback that receives the current canvas rendering context to allow manually drawing with the canvas context. The callback is called before any children are rendered. See [Custom Components](#custom-components) for a full example.

### useRenderAfterChildren

Used for creating custom components with complex rendering logic. Takes a callback that receives the current canvas rendering context to allow manually drawing with the canvas context. The callback is called after any children are rendered. See [Custom Components](#custom-components) for a full example.

### useLoop

Takes a callback and calls this in an infinite `requestAnimationFrame` loop.

```tsx
useLoop(() => {
  // Your logic here
});
```

### useOnMount

Takes a callback that is executed when the component mounts. This callback can return another callback that is executed when a component unmounts e.g. to cleanup listeners.

```tsx
useOnMount(() => {
  // Logic on mount

  return () => {
    // Logic on unmount
  };
});
```

### useOnUnmount

Takes a callback that is executed when the component is mounted.

```tsx
useOnUnmount(() => {
  // Logic on unmount
});
```

### useReactive

Receives an object that will be wrapped in a JavaScript proxy. Any mutations to this object will cause a re-render.

Note: you must use either a `useReactive` or `useUnreactive` for any state values you want to persist. When a component re-renders any state that is defined as basic variables will be recreated.

```tsx
const state = useReactive({ count: 0 });

// This will reset to zero every render
const notState = { count: 0 };
```

### useUnreactive

Receives an object that will be available until the component is unmounted. Unlike `useReactive` any mutations on this object will not cause a re-render.

Note: you must use either a `useReactive` or `useUnreactive` for any state values you want to persist. When a component re-renders any state that is defined as basic variables will be recreated.

```tsx
const state = useUnreactive({ count: 0 });

// This will reset to zero every render
const notState = { count: 0 };
```

### useWindowSize

Returns the current window size. This will update when the window is resized.

## Integrating With React

See [`rcx-react`](https://github.com/blinkorb/rcx-2d/blob/master/workspaces/rcx/README.md) for documentation about integrating RCX into a React application.
