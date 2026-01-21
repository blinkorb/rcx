import type { AnyObject, RCXRenderingContext } from '../types.ts';
import { isValidFillOrStrokeStyle } from './is-valid-fill-or-stroke-style.ts';
import { isValidStrokeCap } from './is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from './is-valid-stroke-join.ts';

export const applyFillAndStrokeStyles = (
  renderingContext: RCXRenderingContext,
  style: Partial<AnyObject>
) => {
  const { fill, stroke, strokeWidth, strokeCap, strokeJoin } = style;

  if (isValidFillOrStrokeStyle(fill)) {
    renderingContext.context2D.fillStyle = fill;
    renderingContext.context2D.fill();
  }

  if (typeof strokeWidth === 'number') {
    renderingContext.context2D.lineWidth = strokeWidth;
  }

  if (isValidStrokeCap(strokeCap)) {
    renderingContext.context2D.lineCap = strokeCap;
  }

  if (isValidStrokeJoin(strokeJoin)) {
    renderingContext.context2D.lineJoin = strokeJoin;
  }

  if (isValidFillOrStrokeStyle(stroke)) {
    renderingContext.context2D.strokeStyle = stroke;
    renderingContext.context2D.stroke();
  }
};
