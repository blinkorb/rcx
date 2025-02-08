import { reactive } from '../reactive.ts';
import type { AnyObject } from '../types.ts';
import { registerHook } from './utils.ts';

export const useReactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useReactive', reactive(initialState));

export const useUnreactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useUnreactive', initialState);
