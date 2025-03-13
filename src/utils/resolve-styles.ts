import type { AnyObject, ValueOrRecursiveArray } from '../types.ts';
import { isArray } from './type-guards.ts';

export const resolveStyles = <S extends AnyObject>(
  styles: ValueOrRecursiveArray<false | null | undefined | S>
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
