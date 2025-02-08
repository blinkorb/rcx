import { emitter } from './emitter.ts';
import type { AnyObject } from './types.ts';

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
