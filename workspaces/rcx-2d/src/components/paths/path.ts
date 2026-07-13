import type {
  RCXComponent,
  RCXPoint,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import { isArray, resolveStyles } from '@blinkorb/rcx/utils';

import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.js';
import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

export type PathProps = RCXPropsWithChildren<{
  points?: readonly RCXPoint[];
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Path: RCXComponent<PathProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { points, beginPath = true } = props;

      renderingContext.ctx2d.save();

      if (beginPath) {
        renderingContext.ctx2d.beginPath();
      }

      points?.forEach((point, index) => {
        const [x, y] = isArray(point) ? point : [point.x, point.y];

        if (index === 0) {
          renderingContext.ctx2d.moveTo(x, y);
        } else {
          renderingContext.ctx2d.lineTo(x, y);
        }
      });
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { closePath = false } = props;

      if (closePath) {
        renderingContext.ctx2d.closePath();
      }

      applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Path.displayName = 'Path';
