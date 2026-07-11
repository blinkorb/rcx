import {
  AnyObject,
  EmptyObject,
  useRenderAfterChildren,
  useRenderBeforeChildren,
  useUnreactive,
} from '@blinkorb/rcx';

import { getHasCtx2d } from '../utils/get-has-ctx-2d.js';

export interface UseRender2dOptionsWithSetup<T extends AnyObject> {
  setup: (ctx: CanvasRenderingContext2D) => T;
  renderBeforeChildren?: (ctx: CanvasRenderingContext2D, info: T) => void;
  renderAfterChildren?: (ctx: CanvasRenderingContext2D, info: T) => void;
}

export interface UseRender2dOptionsWithoutSetup {
  renderBeforeChildren?: (ctx: CanvasRenderingContext2D) => void;
  renderAfterChildren?: (ctx: CanvasRenderingContext2D) => void;
}

export function useRender2d(options: UseRender2dOptionsWithoutSetup): void;
export function useRender2d<T extends AnyObject>(
  options: UseRender2dOptionsWithSetup<T>
): void;
export function useRender2d<T extends AnyObject>(
  options: UseRender2dOptionsWithSetup<T> | UseRender2dOptionsWithoutSetup
) {
  const unreactive = useUnreactive<{
    hasRendered: boolean;
    info: T | EmptyObject | null;
  }>({
    hasRendered: false,
    info: null,
  });

  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      if (!unreactive.hasRendered) {
        if ('setup' in options) {
          unreactive.info = options.setup?.(renderingContext.ctx2d);
        } else {
          unreactive.info = {};
        }
      }

      if (unreactive.info) {
        options.renderBeforeChildren?.(renderingContext.ctx2d, unreactive.info);
      }

      unreactive.hasRendered = true;
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext) && unreactive.info) {
      options.renderAfterChildren?.(renderingContext.ctx2d, unreactive.info);
    }
  });
}
