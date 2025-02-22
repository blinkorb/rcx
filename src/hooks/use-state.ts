import { registerHook } from '../internal/hooks.js';
import { reactive } from '../internal/reactive.js';
import type { AnyObject } from '../types.js';

export const useReactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useReactive', reactive(initialState));

export const useUnreactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useUnreactive', initialState);
