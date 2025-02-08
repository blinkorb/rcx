import type { AnyArray } from './types.ts';

export const isArray = <T>(input: T): input is Extract<T, AnyArray> =>
  Array.isArray(input);
