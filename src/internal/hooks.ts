import type { RCXHook, RCXHookMap } from '../types.ts';
import { cxGlobal } from './global.ts';

export const registerHook = <
  H extends keyof RCXHookMap,
  T extends RCXHookMap[H],
>(
  hookType: H,
  value: T
) => {
  const { currentNode, hookIndex } = cxGlobal;

  if (!currentNode) {
    throw new Error(
      `${hookType} must be called inside the body of a component`
    );
  }

  const prev = currentNode.hooks[hookIndex];

  if (!!prev && prev.type !== hookType) {
    throw new Error(
      `${hookType} was called at a different time (conditionally, or in a loop)`
    );
  }

  const originalValue = prev ? prev.value : value;
  const hook = { type: hookType, value: originalValue } as RCXHook;
  currentNode.hooks[hookIndex] = hook;
  cxGlobal.hookIndex += 1;
  return hook.value as T;
};
