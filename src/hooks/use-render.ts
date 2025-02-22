import { CXRenderingContext } from '../types.js';
import { registerHook } from './utils.js';

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
