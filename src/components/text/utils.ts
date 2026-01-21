import type { RCXChildren } from '../../types.ts';
import { isArray } from '../../utils/type-guards.ts';

export const getTextFromChildren = (children: RCXChildren): string => {
  if (
    children === null ||
    typeof children === 'boolean' ||
    typeof children === 'undefined'
  ) {
    return '';
  }

  if (typeof children === 'object') {
    if (isArray(children)) {
      return children.reduce<string>(
        (acc, child) => acc + getTextFromChildren(child),
        ''
      );
    }

    return getTextFromChildren(children.props.children);
  }

  return children.toString();
};
