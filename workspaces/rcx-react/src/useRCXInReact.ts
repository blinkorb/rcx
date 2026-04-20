import {
  type AnyObject,
  createRoot,
  type CreateRootSuccess,
  type RCXComponent,
  type RCXElement,
} from '@blinkorb/rcx';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useRCXInReact = <C extends RCXComponent<P>, P extends AnyObject>(
  callback: () => RCXElement<C, P>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: readonly any[]
) => {
  const elementRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<CreateRootSuccess | null>(null);
  const [root, setRoot] = useState<CreateRootSuccess | null>(null);

  const onCanvasChange = useCallback((element: HTMLCanvasElement | null) => {
    // unmount the RCX instance when we don't have a canvas element
    if (!element) {
      elementRef.current = element;
      rootRef.current?.unmount();
      rootRef.current = null;
      setRoot(null);
      return;
    }

    // create a new root when we first mount the canvas or we have a new canvas element
    if (element && element !== elementRef.current) {
      // unmount existing RCX instance
      rootRef.current?.unmount();
      const rootOrError = createRoot(element);

      if ('error' in rootOrError) {
        rootRef.current = null;
        setRoot(null);
        // eslint-disable-next-line no-console
        console.error(rootOrError.error);
      } else {
        rootRef.current = rootOrError;
        setRoot(rootOrError);
      }
    }

    // update our element ref for future comparisons
    elementRef.current = element;
  }, []);

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

  return onCanvasChange;
};
