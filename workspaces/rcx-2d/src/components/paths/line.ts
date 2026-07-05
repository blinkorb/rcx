import type {
  RCXComponent,
  RCXLineStyle,
  RCXPropsWithChildren,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import { resolveStyles } from '@blinkorb/rcx/utils';

import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.js';
import { assertCtx2d } from '../../utils/assert-ctx-2d.js';

export type LineProps = RCXPropsWithChildren<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXLineStyle>;
}>;

export const Line: RCXComponent<LineProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { startX, startY, endX, endY, beginPath = true } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    renderingContext.ctx2d.moveTo(startX, startY);
    renderingContext.ctx2d.lineTo(endX, endY);
  });

  useRenderAfterChildren((renderingContext) => {
    assertCtx2d(renderingContext);

    const { closePath = false } = props;

    if (closePath) {
      renderingContext.ctx2d.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Line.displayName = 'Line';
