import { reactive } from '../reactive.js';
import type { AnyObject } from '../types.js';
import { registerHook } from './utils.js';

export const useReactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useReactive', reactive(initialState));

export const useUnreactive = <T extends AnyObject>(initialState: T) =>
  registerHook('useUnreactive', initialState);
