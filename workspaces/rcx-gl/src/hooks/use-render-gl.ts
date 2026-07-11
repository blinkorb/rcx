import {
  AnyObject,
  useRenderAfterChildren,
  useRenderBeforeChildren,
  useUnreactive,
} from '@blinkorb/rcx';

import { getHasCtxGl } from '../utils/get-has-ctx-gl.js';

export const useRenderGl = <T extends AnyObject>({
  setup,
  renderBeforeChildren,
  renderAfterChildren,
}: {
  setup: (ctx: WebGLRenderingContext) => T;
  renderBeforeChildren?: (ctx: WebGLRenderingContext, info: T) => void;
  renderAfterChildren?: (ctx: WebGLRenderingContext, info: T) => void;
}) => {
  const unreactive = useUnreactive<{ hasRendered: boolean; info: T | null }>({
    hasRendered: false,
    info: null,
  });

  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext)) {
      if (!unreactive.hasRendered) {
        unreactive.info = setup(renderingContext.ctxGl);
      }

      if (unreactive.info) {
        renderBeforeChildren?.(renderingContext.ctxGl, unreactive.info);
      }

      unreactive.hasRendered = true;
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext) && unreactive.info) {
      renderAfterChildren?.(renderingContext.ctxGl, unreactive.info);
    }
  });
};
