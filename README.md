# RCX

**Reactive JSX-based library for creating HTML5 canvas applications**

## Preamble

This library is in early development, and so the interfaces you interact with may change. We'll setup full documentation when the API stabilizes. For now the readme should give you enough info to get started.

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

The canvas component allows you to control things like the size and pixel ratio of your canvas, and provides context to other components to inform them of its size, pixel ratio, etc.

A `pixelRatio` of 2 and `width` of `100` will actually render a canvas that is `200` in width, but scale your drawings so you don't have to manually scale everything - allows for crisper drawings on high density/retina displays. You can use the `getRecommendedPixelRatio` util to use our recommendation (`2` for any devices with a `devicePixelRatio` greater than or equal to 2, and `1` for every other device).

If you set the `width` and or `height` to `"auto"` then the canvas' pixels will match the actual size of the canvas on the screen (scaled by pixel ratio). This way you can have your canvas automatically scale to fill its parent (using CSS) for example.

```tsx
import { Canvas } from '@blinkorb/rcx';

const App = () => {
  return (
    <Canvas pixelRatio={getRecommendedPixelRatio()}>
      {/* Your component here */}
    </Canvas>
  );
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

In the below example the `Offset` component will be offset by 10 pixels in both the `x` and `y` axis. The `NoOffset` component will not be affected by the transform.

```tsx
<>
  <Translate x={10} y={10}>
    <Offset />
  </Translate>
  <NoOffset />
</>
```

#### Shape Components

We provide `Circle`, `Ellipse`, and `Rectangle` components for rendering some basic shapes. Each of these can receive a style prop to apply a stroke/border, and fill. You can also define (for some of these components) if the shape should continue from any existing drawings, or begin a new path by setting the `beginPath` prop. You can also choose to close these shapes by setting the `closePath` prop.

```tsx
<>
  <Circle
    x={50}
    y={50}
    radius={50}
    beginPath
    closePath
    style={{
      strokeWidth: 1,
      stroke: 'black',
    }}
  />
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
  <Rectangle
    x={0}
    y={0}
    width={100}
    height={50}
    beginPath
    style={{ fill: 'blue' }}
  />
</>
```

#### Path Components

We provide a selection of components for drawing paths. These components can be combined to draw more complex shapes.

All path plotting components can have stroke styles. `Path` and `ArcTo` components can also have fill styles (fills are excluded from `Line` as it is more performant to use `Path`).

```tsx
<>
  {/* Plot a single line */}
  <Line
    startX={0}
    startY={0}
    endX={10}
    endY={10}
    beginPath
    style={{
      strokeWidth: 2,
      stroke: 'black',
    }}
  />
  {/* Plot an arc */}
  <ArcTo
    startControlX={0}
    startControlY={0}
    endControlX={10}
    endControlY={10}
    radius={10}
    style={{
      strokeWidth: 2,
      stroke: 'black',
    }}
  />
  {/* Plot a path from an array of points */}
  <Path
    points={[
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 10,
      },
    ]}
    beginPath
    style={{
      strokeWidth: 2,
      stroke: 'black',
    }}
  />
  {/* Plot a path from an array of points using the Point component */}
  <Path
    beginPath
    style={{
      strokeWidth: 2,
      stroke: 'black',
    }}
  >
    {points.map((point, index) => (
      <Point $key={index} x={point.x} x={point.y} lineTo={index > 0} />
    ))}
  </Path>
  {/* Plot a path using manually specified Points */}
  <Path
    beginPath
    style={{
      strokeWidth: 2,
      stroke: 'black',
    }}
  >
    <Point x={0} x={0} lineTo={false} />
    <Point x={10} x={10} lineTo={true} />
  </Path>
</>
```

In addition to the path plotting components we provide, we also have a `Clip` component that can be used to apply a clipping mask to future drawings.

```tsx
<>
  <Circle x={50} y={50} radius={50}>
    <Clip>
      <ComponentWillOnlyDrawInsideCircle />
    </Clip>
  </Circle>
</>
```

#### Text Components

We currently only provide a single `Text` component that will render a single line of raw text. We hope to add multi-line and rich text components in the future. You can also render components that contain text or number within a `Text` component.

```tsx
<Text x={10} y={10} style={{
  fill: 'black',
  align: 'center,
}}>
  The count is {count}
  <ContainsSomeText />
</Text>
```

## Custom Components

You can define your own components with complex drawing logic directly applied via canvas context using the `useRenderBeforeChildren` and `useRenderAfterChildren` hooks.

It is highly recommended to `.save()` the canvas state before beginning drawing in `useRenderBeforeChildren` and to `.restore()` the canvas state after drawing in the `useRenderAfterChildren`.

We also provide some utils for resolving and applying styles as styles can be provided as an array, and all fills and strokes are always applied in the same way.

Here's an example that draws a rectangle with rounded corners.

```tsx
interface RoundedRectangleProps extends RectangleProps {
  radius: number;
  closePath?: boolean;
}

const RoundedRectangle: RCXComponent<RoundedRectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
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

### useLinearGradient

Can be used to create a linear gradient that can then be applied as a fill/stroke style.

```tsx
const stroke = useLinearGradient({
  startX: 0,
  startY: 0,
  endX: 10,
  endY: 10,
  stops: [
    {
      offset: 0,
      color: '#f00',
    },
    {
      offset: 1,
      color: '#000',
    },
  ],
});
```

### useRadialGradient

Can be used to create a radial gradient that can then be applied as a fill/stroke style.

```tsx
const fill = useRadialGradient({
  startX: 10,
  startY: 10,
  startRadius: 0,
  endX: 0,
  endY: 0,
  endRadius: 10,
  stops: [
    {
      offset: 0,
      color: '#000',
    },
    {
      offset: 1,
      color: '#00f',
    },
  ],
});
```

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

```tsx
const state = useReactive({ count: 0 });
```

### useUnreactive

Receives an object that will be available until the component is unmounted. Unlike `useReactive` any mutations on this object will not cause a re-render.

### useWindowSize

Returns the current window size. This will update when the window is resized.

```tsx
const state = useReactive({ count: 0 });
```

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
