import type { AnyObject, NestedArray } from '../types.js';
import { isArray } from './type-guards.js';

export const resolveStyles = <S extends AnyObject>(
  styles: NestedArray<false | null | undefined | S>
): Partial<S> => {
  if (typeof styles === 'object' && !!styles) {
    if (isArray(styles)) {
      return styles.reduce((acc, style) => {
        return {
          ...acc,
          ...resolveStyles(style),
        };
      }, {});
    }

    return styles;
  }

  return {};
};
