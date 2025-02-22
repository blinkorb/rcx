import type { AnyArray } from '../types.js';

export const isArray = <T>(input: T): input is Extract<T, AnyArray> =>
  Array.isArray(input);
