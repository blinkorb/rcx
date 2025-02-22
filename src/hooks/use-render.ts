import { registerHook } from '../internal/hooks.js';
import { CXRenderingContext } from '../types.js';

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
