import {
  AnyObject,
  useRenderBeforeChildren,
  useUnreactive,
} from '@blinkorb/rcx';

import { getHasCtxGl } from '../utils/get-has-ctx-gl.js';

export const useRenderGl = <T extends AnyObject>({
  setup,
  render,
}: {
  setup: (ctx: WebGLRenderingContext) => T;
  render: (ctx: WebGLRenderingContext, info: T) => void;
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
        render(renderingContext.ctxGl, unreactive.info);
      }

      unreactive.hasRendered = true;
    }
  });
};
