import { emitter } from './internal/emitter.ts';
import { renderElement } from './render.ts';
import type { CreateRootResult, RCXElementAny, RCXNodeAny } from './types.ts';

const getCanvasElement = (container: HTMLElement) => {
  if (container instanceof HTMLCanvasElement) {
    return container;
  }

  const canvasElement = document.createElement('canvas');
  container.appendChild(canvasElement);

  return canvasElement;
};

export const createRoot = (container: HTMLElement): CreateRootResult => {
  const canvas = getCanvasElement(container);
  const ctx2d = canvas.getContext('2d');

  if (!ctx2d) {
    const errorMessage = 'CanvasRenderingContext2D not supported';

    if (window.console && typeof window.console.error === 'function') {
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }

    return {
      error: errorMessage,
    };
  }

  const renderingContextState = { canvas, ctx2d };

  let rootElement: RCXElementAny | undefined;
  let raf: number | undefined;
  let rootNode: RCXNodeAny | undefined;

  const renderRoot = () => {
    if (typeof raf === 'number') {
      window.cancelAnimationFrame(raf);
    }

    raf = window.requestAnimationFrame(() => {
      // eslint-disable-next-line no-self-assign
      canvas.width = canvas.width;
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
      window.cancelAnimationFrame(raf);
    }

    // eslint-disable-next-line no-self-assign
    canvas.width = canvas.width;

    if (!(container instanceof HTMLCanvasElement)) {
      container.removeChild(canvas);
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
