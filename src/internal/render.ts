import { renderingContext } from '../components/canvas/context.ts';
import type {
  AnyCXElement,
  AnyCXNode,
  AnyObject,
  CXChild,
  CXChildren,
  CXRenderingContext,
  NestedArray,
} from '../types.ts';
import { isArray } from '../utils/type-guards.ts';
import { emitter } from './emitter.ts';
import { cxGlobal } from './global.ts';

const getCanvasElement = (container: HTMLElement) => {
  if (container instanceof HTMLCanvasElement) {
    return container;
  }

  const canvasElement = document.createElement('canvas');
  container.appendChild(canvasElement);

  return canvasElement;
};

const unmountNodes = (
  children: NestedArray<AnyCXNode> | AnyCXNode | undefined
) => {
  if (!!children && typeof children === 'object') {
    if (isArray(children)) {
      children.forEach((child) => unmountNodes(child));
    } else {
      children.hooks.forEach((hook) => {
        if (hook.type === 'useOnMount') {
          hook.value.onUnmount?.();
        }

        if (hook.type === 'useOnUnmount') {
          hook.value();
        }
      });

      unmountNodes(children.childNodes);
    }
  }
};

const updateNode = (
  element: AnyCXElement,
  prevNode: AnyCXNode | undefined
): AnyCXNode => {
  if (element.type === prevNode?.element.type) {
    const nextPropsCopy = { ...element.props };

    // Delete previous props
    Object.keys(prevNode.element.props).forEach((key) => {
      delete prevNode.element.props[key];
    });

    // Copy in new props
    Object.entries(nextPropsCopy).forEach(([key, value]) => {
      prevNode.element.props[key] = value;
    });

    return prevNode;
  }

  unmountNodes(prevNode);

  return {
    element,
    hooks: [],
    rendered: [],
    childNodes: [],
    context: {},
  };
};

const getMatchingChildPrev = (
  nextChild: CXChildren,
  nextChildIndex: number,
  stillRendered: NestedArray<AnyCXNode> | undefined
) => {
  if (!!nextChild && typeof nextChild === 'object' && !isArray(nextChild)) {
    if (isArray(stillRendered)) {
      if (typeof nextChild.props.$key !== 'undefined') {
        return stillRendered.find(
          (prev) =>
            !!prev &&
            typeof prev === 'object' &&
            !isArray(prev) &&
            prev.element.type === nextChild.type &&
            prev.element.props.$key === nextChild.props.$key
        );
      }

      const atIndex = stillRendered[nextChildIndex];

      if (
        !!atIndex &&
        typeof atIndex === 'object' &&
        !isArray(atIndex) &&
        atIndex.element.type === nextChild.type &&
        typeof atIndex.element.props.$key === 'undefined'
      ) {
        return atIndex;
      }
    }
  }
};

const getMatchingChildNext = (
  prevChild: NestedArray<AnyCXNode>,
  prevChildIndex: number,
  nextRendered: NestedArray<CXChild>
) => {
  if (!!prevChild && typeof prevChild === 'object' && !isArray(prevChild)) {
    if (isArray(nextRendered)) {
      if (typeof prevChild.element.props.$key !== 'undefined') {
        return nextRendered.find(
          (next) =>
            !!next &&
            typeof next === 'object' &&
            !isArray(next) &&
            next.type === prevChild.element.type &&
            next.props.$key === prevChild.element.props.$key
        );
      }

      const atIndex = nextRendered[prevChildIndex];

      if (
        !!atIndex &&
        typeof atIndex === 'object' &&
        !isArray(atIndex) &&
        atIndex.type === prevChild.element.type &&
        typeof atIndex.props.$key === 'undefined'
      ) {
        return atIndex;
      }
    }
  }
};

const renderElement = (
  element: AnyCXElement,
  renderingContextState: CXRenderingContext,
  prevNode: AnyCXNode | undefined,
  parentContext?: AnyObject
): AnyCXNode => {
  const node = updateNode(element, prevNode);

  node.context = {
    ...parentContext,
  };

  cxGlobal.currentNode = node;
  cxGlobal.hookIndex = 0;

  renderingContext.useProvide(renderingContextState);

  node.rendered = element.type(element.props);

  delete cxGlobal.currentNode;

  const traverse = (
    nextRendered: CXChildren,
    prevRendered: NestedArray<AnyCXNode> | undefined
  ): NestedArray<AnyCXNode> => {
    if (!!nextRendered && typeof nextRendered === 'object') {
      if (isArray(nextRendered)) {
        let stillRendered: NestedArray<AnyCXNode> | undefined;

        if (!isArray(prevRendered)) {
          unmountNodes(prevRendered);
        } else {
          stillRendered = prevRendered.filter((prevChild, prevChildIndex) => {
            const match = getMatchingChildNext(
              prevChild,
              prevChildIndex,
              nextRendered
            );

            if (!match) {
              unmountNodes(prevChild);
            }

            return !!match;
          });
        }

        return nextRendered.map((nextChild, nextChildIndex) =>
          traverse(
            nextChild,
            getMatchingChildPrev(nextChild, nextChildIndex, stillRendered)
          )
        );
      }

      if (!!prevRendered && typeof prevRendered === 'object') {
        if (isArray(prevRendered)) {
          unmountNodes(prevRendered);
        } else if (prevRendered.element.type !== nextRendered.type) {
          unmountNodes(prevRendered);
        }
      }

      return renderElement(
        nextRendered,
        renderingContextState,
        !!prevRendered &&
          typeof prevRendered === 'object' &&
          !isArray(prevRendered)
          ? prevRendered
          : undefined,
        node.context
      );
    }

    unmountNodes(prevRendered);

    return [];
  };

  node.hooks.forEach((hook) => {
    if (hook.type === 'useOnMount' && element.type !== prevNode?.element.type) {
      hook.value.onMount();
    }
  });

  node.hooks.forEach((hook) => {
    if (hook.type === 'useRenderBeforeChildren') {
      hook.value(renderingContextState);
    }
  });

  node.childNodes = traverse(node.rendered, prevNode?.childNodes);

  node.hooks.forEach((hook) => {
    if (hook.type === 'useRenderAfterChildren') {
      hook.value(renderingContextState);
    }
  });

  return node;
};

export const render = (element: AnyCXElement, container: HTMLElement) => {
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

  let raf: number | undefined;
  let rootNode: AnyCXNode | undefined;

  const renderRoot = () => {
    if (typeof raf === 'number') {
      window.cancelAnimationFrame(raf);
    }

    raf = window.requestAnimationFrame(() => {
      // eslint-disable-next-line no-self-assign
      canvas.width = canvas.width;
      rootNode = renderElement(element, renderingContextState, rootNode);
    });
  };

  renderRoot();

  emitter.on('render', renderRoot);

  const unmount = () => {
    if (typeof raf === 'number') {
      window.cancelAnimationFrame(raf);
    }
    // eslint-disable-next-line no-self-assign
    canvas.width = canvas.width;

    if (!(container instanceof HTMLCanvasElement)) {
      container.removeChild(canvas);
    }
  };

  return unmount;
};
