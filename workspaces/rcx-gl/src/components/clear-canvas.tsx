import type { RCXComponent, RCXPropsWithChildren } from '@blinkorb/rcx';
import { useRenderBeforeChildren } from '@blinkorb/rcx/hooks';
import Color from 'color';

import { ColorValue } from '../types.js';
import { getHasCtxGl } from '../utils/get-has-ctx-gl.js';

export type ClearCanvasProps = RCXPropsWithChildren<{
  fill?: ColorValue;
}>;

export const ClearCanvas: RCXComponent<ClearCanvasProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtxGl(renderingContext)) {
      const color = Color(props.fill ?? 'rgba(0,0,0,0)');

      renderingContext.ctxGl.clearColor(
        color.red(),
        color.green(),
        color.blue(),
        color.alpha()
      );
      renderingContext.ctxGl.clear(renderingContext.ctxGl.COLOR_BUFFER_BIT);
    }
  });

  return props.children;
};

ClearCanvas.displayName = 'Rotate';
