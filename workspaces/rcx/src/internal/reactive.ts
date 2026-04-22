import type { AnyObject } from '../types.js';
import { emitter } from './emitter.js';

export const reactive = <T extends AnyObject>(initialState: T) =>
  new Proxy(initialState, {
    set(target, key, value) {
      Reflect.set(target, key, value);
      emitter.emit('render', null);
      return true;
    },
    get(target, key) {
      const value = Reflect.get(target, key);

      if (typeof value === 'object' && !!value) {
        return reactive(value);
      }

      return value;
    },
  });
