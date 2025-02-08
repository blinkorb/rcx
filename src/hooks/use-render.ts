import { CXRenderingContext } from '../types.ts';
import { registerHook } from './utils.ts';

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
