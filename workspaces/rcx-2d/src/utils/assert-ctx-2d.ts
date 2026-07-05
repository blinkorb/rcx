import type {
  CreateRootOptionsCtx2d,
  RCXRenderingContext,
} from '@blinkorb/rcx';

export type AssetCtx2d = (
  renderingContext: RCXRenderingContext
) => asserts renderingContext is CreateRootOptionsCtx2d;

export const assertCtx2d: AssetCtx2d = (renderingContext) => {
  if (typeof renderingContext.ctx2d === 'undefined') {
    throw new Error(
      'A 2D component or hook was used outside of a canvas with a ctx2d (CanvasRenderingContext2D)'
    );
  }
};
