# RCX 2D

**Canvas 2D rendering context components and hooks**

## About

A collection of components, utils, and hooks for drawing to a 2D canvas context using RCX.

## Installation

```bash
npm i @blinkorb/rcx-2d -P
```

## The Basics

See [rcx readme](https://github.com/blinkorb/rcx/blob/master/workspaces/rcx/README.md) for information about getting started with RCX.

### Basic Components

#### Transform Components

We provide `Translate`, `Scale`, and `Rotate` components that will transform any of their children.

In the below example the `Offset` component will be offset by 10 pixels in both the `x` and `y` axis. In this example `NoOffset` component will not be affected by the transform.

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

### Custom Components

See [rcx readme](https://github.com/blinkorb/rcx/blob/master/workspaces/rcx/README.md) for information about custom components.

## Hooks

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
