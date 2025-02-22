import { cxGlobal } from '../internal/global.js';
import type { Hook, HookMap } from '../types.js';

export const registerHook = <H extends keyof HookMap, T extends HookMap[H]>(
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
  const hook = { type: hookType, value: originalValue } as Hook;
  currentNode.hooks[hookIndex] = hook;
  cxGlobal.hookIndex += 1;
  return hook.value as T;
};
