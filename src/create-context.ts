import { cxGlobal } from './global.ts';
import type { AnyObject, CXComponent, PropsWithChildren } from './types.ts';

export type ProviderProps<T> = PropsWithChildren<{
  value: T;
}>;

export const createContext = <T extends AnyObject>(name?: string) => {
  const symbol = Symbol(name);

  const useProvide = (value: T) => {
    const { currentNode } = cxGlobal;
    if (!currentNode) {
      throw new Error(
        'useProvide must be called inside the body of a component'
      );
    }

    currentNode.context[symbol] = value;
  };

  const useInject = () => {
    const { currentNode } = cxGlobal;
    if (!currentNode) {
      throw new Error(
        'useInject must be called inside the body of a component'
      );
    }

    return currentNode.context[symbol] as T | undefined;
  };

  const Provider: CXComponent<ProviderProps<T>> = ({ children, value }) => {
    useProvide(value);
    return children;
  };

  Provider.displayName = 'Provider';

  return {
    Provider,
    useProvide,
    useInject,
  };
};
