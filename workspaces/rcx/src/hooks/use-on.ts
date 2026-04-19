import { registerHook } from '../internal/hooks.ts';
import type { RCXOnMountHook } from '../types.ts';

export const useOnMount = (callback: () => void | (() => void)) => {
  const hook: RCXOnMountHook = {
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
