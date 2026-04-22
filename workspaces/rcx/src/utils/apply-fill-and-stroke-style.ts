import type { AnyObject, RCXRenderingContext } from '../types.js';
import { isValidFillOrStrokeStyle } from './is-valid-fill-or-stroke-style.js';
import { isValidStrokeCap } from './is-valid-stroke-cap.js';
import { isValidStrokeJoin } from './is-valid-stroke-join.js';

export const applyFillAndStrokeStyles = (
  renderingContext: RCXRenderingContext,
  style: Partial<AnyObject>
) => {
  const { fill, stroke, strokeWidth, strokeCap, strokeJoin } = style;

  if (isValidFillOrStrokeStyle(fill)) {
    renderingContext.ctx2d.fillStyle = fill;
    renderingContext.ctx2d.fill();
  }

  if (typeof strokeWidth === 'number') {
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
};
