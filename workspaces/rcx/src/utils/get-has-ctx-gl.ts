import type { CreateRootOptionsCtxGl, RCXRenderingContext } from '../types.js';

export const getHasCtxGl = (
  renderingContext: RCXRenderingContext
): renderingContext is CreateRootOptionsCtxGl =>
  typeof renderingContext.ctxGl !== 'undefined';
