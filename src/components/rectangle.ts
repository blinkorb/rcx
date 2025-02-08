import { useRenderBeforeChildren } from '../hooks/use-render.ts';
import type { CXComponent, PropsWithChildren } from '../types.ts';

export type RectangleProps = PropsWithChildren<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  pixelRatio?: number;
}>;

export const Rectangle: CXComponent<RectangleProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, width, height, fill, stroke, strokeWidth } = props;

    renderingContext.ctx2d.save();

    if (typeof fill === 'string') {
      renderingContext.ctx2d.fillStyle = fill;
      renderingContext.ctx2d.fillRect(x, y, width, height);
    }

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (typeof stroke === 'string') {
      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.strokeRect(x, y, width, height);
    }

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Rectangle.displayName = 'Rectangle';
