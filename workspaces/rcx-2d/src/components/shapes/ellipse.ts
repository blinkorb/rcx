import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '@blinkorb/rcx';
import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '@blinkorb/rcx/hooks';
import { resolveStyles } from '@blinkorb/rcx/utils';

import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.js';
import { getHasCtx2d } from '../../utils/get-has-ctx-2d.js';

export type EllipseProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  counterClockwise?: boolean;
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Ellipse: RCXComponent<EllipseProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const {
        x,
        y,
        radiusX,
        radiusY,
        rotation = 0,
        startAngle = 0,
        endAngle = Math.PI * 2,
        counterClockwise = false,
        beginPath = true,
      } = props;

      renderingContext.ctx2d.save();

      if (beginPath) {
        renderingContext.ctx2d.beginPath();
      }

      renderingContext.ctx2d.ellipse(
        x,
        y,
        radiusX,
        radiusY,
        rotation,
        startAngle,
        endAngle,
        counterClockwise
      );
    }
  });

  useRenderAfterChildren((renderingContext) => {
    if (getHasCtx2d(renderingContext)) {
      const { closePath = true } = props;

      if (closePath) {
        renderingContext.ctx2d.closePath();
      }

      applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

      renderingContext.ctx2d.restore();
    }
  });

  return props.children;
};

Ellipse.displayName = 'Ellipse';
