import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../hooks/use-render.ts';
import type { CXComponent, PropsWithChildren } from '../types.ts';

export type RectangleProps = PropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Rectangle: CXComponent<RectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, width, height } = props;

    renderingContext.ctx2d.save();
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
