import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import { useRenderBeforeChildren } from '@blinkorb/rcx/hooks';

import { getHasCtx2d } from '../utils/get-has-ctx-2d.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ClearCanvasProps = RCXPropsWithChildren<{}>;

export const ClearCanvas: RCXComponent<ClearCanvasProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      // eslint-disable-next-line no-self-assign
      renderingContext.ctx2d.canvas.width = renderingContext.ctx2d.canvas.width;
    }
  });

  return props.children;
};

ClearCanvas.displayName = 'Rotate';
