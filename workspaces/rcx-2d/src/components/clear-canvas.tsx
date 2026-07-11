import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import { useCanvasContext, useRenderBeforeChildren } from '@blinkorb/rcx/hooks';

import { getHasCtx2d } from '../utils/get-has-ctx-2d.js';

export type ClearCanvasProps = RCXPropsWithChildren<{
  fill?: string;
}>;

export const ClearCanvas: RCXComponent<ClearCanvasProps> = (props) => {
  const canvasContext = useCanvasContext();

  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      // eslint-disable-next-line no-self-assign
      renderingContext.ctx2d.canvas.width = renderingContext.ctx2d.canvas.width;
      renderingContext.ctx2d?.scale(
        canvasContext.pixelRatio,
        canvasContext.pixelRatio
      );

      if (props.fill) {
        renderingContext.ctx2d.fillStyle = props.fill;
        renderingContext.ctx2d.fillRect(
          0,
          0,
          renderingContext.ctx2d.canvas.width,
          renderingContext.ctx2d.canvas.height
        );
      }
    }
  });

  return props.children;
};

ClearCanvas.displayName = 'Rotate';
