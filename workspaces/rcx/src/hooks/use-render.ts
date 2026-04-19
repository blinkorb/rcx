import { registerHook } from '../internal/hooks.ts';
import { RCXRenderingContext } from '../types.ts';

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
