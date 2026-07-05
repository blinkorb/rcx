import type { CreateRootOptionsCtxGl, RCXRenderingContext } from '../types.js';

export type AssetCtxGl = (
  renderingContext: RCXRenderingContext
) => asserts renderingContext is CreateRootOptionsCtxGl;

export const assertCtxGl: AssetCtxGl = (renderingContext) => {
  if (typeof renderingContext.ctxGl === 'undefined') {
    throw new Error(
      'A GL component or hook was used outside of a canvas with a ctxGl (WebGLRenderingContext)'
    );
  }
};
