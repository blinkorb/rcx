import { registerHook } from '../internal/hooks.js';
import type { OnMountHook } from '../types.js';

export const useOnMount = (callback: () => void | (() => void)) => {
  const hook: OnMountHook = {
    onMount: () => {
      const onUnmount = callback();
      if (onUnmount) {
        hook.onUnmount = onUnmount;
      }
    },
  };
  registerHook('useOnMount', hook);
};

export const useOnUnmount = (callback: () => void) => {
  registerHook('useOnUnmount', callback);
};
