import { AnyObject } from '../types.ts';

export const isOwnPropertyOf = <T extends AnyObject>(
  obj: T,
  key: PropertyKey
): key is keyof T => Object.prototype.hasOwnProperty.call(obj, key);
