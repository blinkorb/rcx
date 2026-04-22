import { registerHook } from '../internal/hooks.js';
import { RCXRenderingContext } from '../types.js';

export const useRenderBeforeChildren = (
  callback: (renderingContext: RCXRenderingContext) => void
) => {
  registerHook('useRenderBeforeChildren', callback);
};

export const useRenderAfterChildren = (
  callback: (renderingContext: RCXRenderingContext) => void
) => {
  registerHook('useRenderAfterChildren', callback);
};
