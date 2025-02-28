import { registerHook } from '../internal/hooks.ts';
import { CXRenderingContext } from '../types.ts';

export const useRenderBeforeChildren = (
  callback: (renderingContext: CXRenderingContext) => void
) => {
  registerHook('useRenderBeforeChildren', callback);
};

export const useRenderAfterChildren = (
  callback: (renderingContext: CXRenderingContext) => void
) => {
  registerHook('useRenderAfterChildren', callback);
};
