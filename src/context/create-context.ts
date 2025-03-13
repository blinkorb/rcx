import { cxGlobal } from '../internal/global.ts';
import type {
  AnyObject,
  RCXComponent,
  RCXPropsWithChildren,
} from '../types.ts';

export type ProviderProps<T> = RCXPropsWithChildren<{
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

    return currentNode.context[symbol] as Readonly<T> | undefined;
  };

  const Provider: RCXComponent<ProviderProps<T>> = ({ children, value }) => {
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
