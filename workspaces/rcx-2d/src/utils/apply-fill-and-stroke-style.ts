import type { AnyObject, RCXRenderingContext } from '@blinkorb/rcx';
import {
  isFiniteNumber,
  isValidFillOrStrokeStyle,
  isValidStrokeCap,
  isValidStrokeJoin,
} from '@blinkorb/rcx/utils';

import { getHasCtx2d } from './get-has-ctx-2d.js';

export const applyFillAndStrokeStyles = (
  renderingContext: RCXRenderingContext,
  style: Partial<AnyObject>
) => {
  if (getHasCtx2d(renderingContext)) {
    const { fill, stroke, strokeWidth, strokeCap, strokeJoin } = style;

    if (isValidFillOrStrokeStyle(fill)) {
      renderingContext.ctx2d.fillStyle = fill;
      renderingContext.ctx2d.fill();
    }

    if (isFiniteNumber(strokeWidth)) {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (isValidStrokeCap(strokeCap)) {
      renderingContext.ctx2d.lineCap = strokeCap;
    }

    if (isValidStrokeJoin(strokeJoin)) {
      renderingContext.ctx2d.lineJoin = strokeJoin;
    }

    if (isValidFillOrStrokeStyle(stroke)) {
      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.stroke();
    }
  }
};
