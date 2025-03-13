import type { AnyObject, RCXRenderingContext } from '../types.ts';
import { isOwnPropertyOf } from './is-own-property-of.ts';

const STROKE_CAPS = {
  butt: true,
  round: true,
  square: true,
} satisfies Record<CanvasLineCap, true>;

const STROKE_JOINS = {
  bevel: true,
  round: true,
  miter: true,
} satisfies Record<CanvasLineJoin, true>;

export const applyStyles = (
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

  if (
    typeof strokeCap === 'string' &&
    isOwnPropertyOf(STROKE_CAPS, strokeCap)
  ) {
    renderingContext.ctx2d.lineCap = strokeCap;
  }

  if (
    typeof strokeJoin === 'string' &&
    isOwnPropertyOf(STROKE_JOINS, strokeJoin)
  ) {
    renderingContext.ctx2d.lineJoin = strokeJoin;
  }

  if (typeof stroke === 'string') {
    renderingContext.ctx2d.strokeStyle = stroke;
    renderingContext.ctx2d.stroke();
  }
};
