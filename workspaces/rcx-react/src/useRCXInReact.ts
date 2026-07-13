import type {
  AnyObject,
  CreateRootOptions,
  CreateRootSuccess,
  RCXComponent,
  RCXElement,
} from '@blinkorb/rcx';
import { createRoot } from '@blinkorb/rcx/root';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useRCXInReact = <C extends RCXComponent<P>, P extends AnyObject>(
  callback: () => RCXElement<C, P>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: readonly any[]
) => {
  const [root, setRoot] = useState<CreateRootSuccess | null>(null);
  const rootRef = useRef(root);
  // eslint-disable-next-line react-hooks/refs
  rootRef.current = root;

  const setCreateRootOptions = useCallback(
    (options: CreateRootOptions | null) => {
      if (!options) {
        setRoot(null);
      } else {
        const rootOrError = createRoot(options);

        if ('error' in rootOrError) {
          setRoot(null);

          if (
            globalThis.console &&
            typeof globalThis.console.error === 'function'
          ) {
            // eslint-disable-next-line no-console
            console.error(rootOrError.error);
          }
        } else {
          setRoot(rootOrError);
        }
      }
    },
    []
  );

  useEffect(() => {
    // render the canvas if our root or any props have changed
    rootRef.current?.render(callback());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, callback, ...dependencies]);

  useEffect(() => {
    // unmount the RCX instance when this component unmounts
    return () => {
      rootRef.current?.unmount();
    };
  }, []);

  return setCreateRootOptions;
};
