import type {
  CreateRootOptionsCtx2d,
  RCXRenderingContext,
} from '@blinkorb/rcx';

export const getHasCtx2d = (
  renderingContext: RCXRenderingContext
): renderingContext is CreateRootOptionsCtx2d =>
  typeof renderingContext.ctx2d !== 'undefined';
