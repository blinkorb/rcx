# RCX

**Reactive JSX-based library for creating HTML5 canvas applications**

## Preamble

This library is in early development, and so the interfaces you interact with may change. We'll setup full documentation when the API stabilizes. For now the [readme(s)](#documentation) should give you enough info to get started.

## About

RCX closely resembles other JSX-based view libraries such as React/Vue, but allows you to render to canvas. It can even be used in conjunction with other view libraries (e.g. integrate with React using [`rcx-react`](workspaces/rcx-react/README.md)).

## Documentation

- `rcx` is the core library for rendering to canvas with reactive JSX - [read the documentation](workspaces/rcx/README.md)
- `rcx-react` provides utilities for integrating RCX in React apps - [read the documentation](workspaces/rcx-react/README.md)
- `rcx-vue` (coming soon) will provide utilities for integrating RCX in Vue apps
- `rcx-gl` (coming eventually) will allow rendering 3D scenes using WebGL
- `rcx-2d` (coming-eventually) will contain components and utils that are currently in the core `rcx` package when the `rcx-gl` package is implemented
