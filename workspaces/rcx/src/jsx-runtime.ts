import type {
  AnyObject,
  RCXComponent,
  RCXElement,
  RCXFragmentProps,
} from './types.ts';

export const jsx = <C extends RCXComponent<P>, P extends AnyObject>(
  type: C,
  props: P
): RCXElement<C, P> => ({
  type,
  props,
});

export const jsxs = jsx;

export const Fragment: RCXComponent<RCXFragmentProps> = ({ children }) =>
  children;

Fragment.displayName = 'Fragment';
