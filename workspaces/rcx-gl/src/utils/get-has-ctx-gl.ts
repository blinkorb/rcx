import type {
  CreateRootOptionsCtxGl,
  RCXRenderingContext,
} from '@blinkorb/rcx';

export const getHasCtxGl = (
  renderingContext: RCXRenderingContext
): renderingContext is CreateRootOptionsCtxGl =>
  typeof renderingContext.ctxGl !== 'undefined';
