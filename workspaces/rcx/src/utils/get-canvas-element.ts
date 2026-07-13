import type { RCXRenderingContext } from '../types.js';

export const getCanvasElement = (renderingContext: RCXRenderingContext) => {
  if (!renderingContext.ctx2d && !renderingContext.ctxGl) {
    throw new Error(
      'Could not get canvas element as no ctx2d or ctxGl was provided'
    );
  }

  const element =
    renderingContext.ctx2d?.canvas ?? renderingContext.ctxGl?.canvas;

  if (!element) {
    throw new Error('Failed to get canvas element from ctx2d or ctxGl');
  }

  return element;
};
