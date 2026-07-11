import {
  AnyObject,
  EmptyObject,
  useRenderAfterChildren,
  useRenderBeforeChildren,
  useUnreactive,
} from '@blinkorb/rcx';

import { getHasCtxGl } from '../utils/get-has-ctx-gl.js';

export interface UseRenderGlOptionsWithSetup<T extends AnyObject> {
  setup: (ctx: WebGLRenderingContext) => T;
  renderBeforeChildren?: (ctx: WebGLRenderingContext, info: T) => void;
  renderAfterChildren?: (ctx: WebGLRenderingContext, info: T) => void;
}

export interface UseRenderGlOptionsWithoutSetup {
  renderBeforeChildren?: (ctx: WebGLRenderingContext) => void;
  renderAfterChildren?: (ctx: WebGLRenderingContext) => void;
}

export function useRenderGl<T extends AnyObject>(
  options: UseRenderGlOptionsWithSetup<T>
): void;
export function useRenderGl(options: UseRenderGlOptionsWithoutSetup): void;
export function useRenderGl<T extends AnyObject>(
  options: UseRenderGlOptionsWithSetup<T> | UseRenderGlOptionsWithoutSetup
) {
  const unreactive = useUnreactive<{
    hasRendered: boolean;
    info: T | EmptyObject | null;
  }>({
    hasRendered: false,
    info: null,
  });

  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext)) {
      if (!unreactive.hasRendered) {
        if ('setup' in options) {
          unreactive.info = options.setup?.(renderingContext.ctxGl);
        } else {
          unreactive.info = {};
        }
      }

      if (unreactive.info) {
        options.renderBeforeChildren?.(renderingContext.ctxGl, unreactive.info);
      }

      unreactive.hasRendered = true;
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext) && unreactive.info) {
      options.renderAfterChildren?.(renderingContext.ctxGl, unreactive.info);
    }
  });
}
