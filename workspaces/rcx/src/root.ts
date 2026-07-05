import { emitter } from './internal/emitter.js';
import { renderElement } from './render.js';
import type {
  CreateRootOptions,
  CreateRootResult,
  RCXElementAny,
  RCXNodeAny,
  RCXRenderingContext,
} from './types.js';

export const createRoot = ({
  ctx2d,
  ctxGl,
}: CreateRootOptions): CreateRootResult => {
  if (!ctx2d && !ctxGl) {
    const errorMessage = 'No canvas context supplied to RCX';

    if (globalThis.console && typeof globalThis.console.error === 'function') {
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }

    return {
      error: errorMessage,
    };
  }

  const renderingContextState: RCXRenderingContext = { ctx2d, ctxGl };

  let rootElement: RCXElementAny | undefined;
  let raf: number | undefined;
  let rootNode: RCXNodeAny | undefined;

  const renderRoot = () => {
    if (typeof raf === 'number') {
      globalThis.cancelAnimationFrame(raf);
    }

    raf = globalThis.requestAnimationFrame(() => {
      if (rootElement) {
        rootNode = renderElement(rootElement, renderingContextState, rootNode);
      } else {
        rootNode = undefined;
      }
    });
  };

  const unmount = () => {
    emitter.off('render', renderRoot);
    rootElement = undefined;

    if (typeof raf === 'number') {
      globalThis.cancelAnimationFrame(raf);
    }
  };

  return {
    render: (element: RCXElementAny) => {
      rootElement = element;
      renderRoot();

      emitter.on('render', renderRoot);
    },
    unmount,
  };
};
