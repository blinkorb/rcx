import type {
  AnyObject,
  CXComponent,
  CXElement,
  FragmentProps,
} from './types.ts';

export const jsx = <C extends CXComponent<P>, P extends AnyObject>(
  type: C,
  props: P
): CXElement<C, P> => ({
  type,
  props,
});

export const jsxs = jsx;

export const Fragment: CXComponent<FragmentProps> = ({ children }) => children;

Fragment.displayName = 'Fragment';
