import { registerHook } from '../internal/hooks.ts';
import { reactive } from '../internal/reactive.ts';
import type { AnyObject } from '../types.ts';

export const useReactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useReactive', reactive(initialState));

export const useUnreactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useUnreactive', initialState);
