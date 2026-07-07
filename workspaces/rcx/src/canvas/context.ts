import { createContext } from '../context/create-context.js';
import type { RCXCanvasContext, RCXRenderingContext } from '../types.js';

export const {
  Provider: CanvasContextProvider,
  useProvide: useProvideCanvasContext,
  useInject: useInjectCanvasContext,
} = createContext<RCXCanvasContext>('CanvasContext');

export const {
  Provider: RenderingContextProvider,
  useProvide: useProvideRenderingContext,
  useInject: useInjectRenderingContext,
} = createContext<RCXRenderingContext>('RenderingContext');
