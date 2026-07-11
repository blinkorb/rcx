import {
  AnyObject,
  EmptyObject,
  useCurrentReference,
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
  const optionsRef = useCurrentReference(options);
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
        if ('setup' in optionsRef.current) {
          unreactive.info = optionsRef.current.setup?.(renderingContext.ctxGl);
        } else {
          unreactive.info = {};
        }
      }

      if (unreactive.info) {
        optionsRef.current.renderBeforeChildren?.(
          renderingContext.ctxGl,
          unreactive.info
        );
      }

      unreactive.hasRendered = true;
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext) && unreactive.info) {
      optionsRef.current.renderAfterChildren?.(
        renderingContext.ctxGl,
        unreactive.info
      );
    }
  });
}
