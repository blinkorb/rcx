import type { AnyObject, RCXRenderingContext } from '../types.ts';
import { isValidStrokeCap } from './is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from './is-valid-stroke-join.ts';

export const applyFillAndStrokeStyles = (
  renderingContext: RCXRenderingContext,
  style: Partial<AnyObject>
) => {
  const { fill, stroke, strokeWidth, strokeCap, strokeJoin } = style;

  if (typeof fill === 'string') {
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

  if (typeof stroke === 'string') {
    renderingContext.ctx2d.strokeStyle = stroke;
    renderingContext.ctx2d.stroke();
  }
};
