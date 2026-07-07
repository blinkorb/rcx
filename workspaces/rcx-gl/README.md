# RCX GL

**Canvas WebGL rendering context components and utils**

## About

A collection of components and utils for drawing to a WebGL canvas context using RCX.

## Installation

```bash
npm i @blinkorb/rcx-gl -P
```

## The Basics

See [rcx readme](https://github.com/blinkorb/rcx/blob/master/workspaces/rcx/README.md) for information about getting started with RCX.

### Basic Components

#### Shape Components

We currently only provide a `Rectangle` component - this is only a proof of concept and you can still implement your own [custom components](#custom-components). Each of these can receive a style prop to apply a stroke/border, and fill.

```tsx
<>
  <Rectangle x={0} y={0} width={100} height={50} style={{ fill: 'blue' }} />
</>
```

### Custom Components

See [rcx readme](https://github.com/blinkorb/rcx/blob/master/workspaces/rcx/README.md) for information about custom components.
