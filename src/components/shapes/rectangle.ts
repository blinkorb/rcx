import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.js';
import type { CXComponent, PropsWithChildren } from '../../types.js';

export type RectangleProps = PropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  beginPath?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Rectangle: CXComponent<RectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, width, height, beginPath = true } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    renderingContext.ctx2d.rect(x, y, width, height);
  });

  useRenderAfterChildren((renderingContext) => {
    const { fill, stroke, strokeWidth } = props;

    if (typeof fill === 'string') {
      renderingContext.ctx2d.fillStyle = fill;
      renderingContext.ctx2d.fill();
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (typeof stroke === 'string') {
      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.stroke();
    }

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
