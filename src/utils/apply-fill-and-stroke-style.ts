import type { AnyObject, RCXRenderingContext } from '../types.ts';
import { isValidFillOrStrokeStyle } from './is-valid-fill-or-stroke-style.ts';
import { isValidStrokeCap } from './is-valid-stroke-cap.ts';
import { isValidStrokeJoin } from './is-valid-stroke-join.ts';

export const applyFillAndStrokeStyles = (
  renderingContext: RCXRenderingContext,
  style: Partial<AnyObject>
) => {
  const { context2D } = renderingContext;

  if (!context2D) {
    return;
  }

  const { fill, stroke, strokeWidth, strokeCap, strokeJoin } = style;

  if (isValidFillOrStrokeStyle(fill)) {
    context2D.fillStyle = fill;
    context2D.fill();
  }

  if (typeof strokeWidth === 'number') {
    context2D.lineWidth = strokeWidth;
  }

  if (isValidStrokeCap(strokeCap)) {
    context2D.lineCap = strokeCap;
  }

  if (isValidStrokeJoin(strokeJoin)) {
    context2D.lineJoin = strokeJoin;
  }

  if (isValidFillOrStrokeStyle(stroke)) {
    context2D.strokeStyle = stroke;
    context2D.stroke();
  }
};
