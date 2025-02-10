import { useRenderBeforeChildren } from '../hooks/use-render.ts';
import type { CXComponent, PropsWithChildren } from '../types.ts';

export type EllipseProps = PropsWithChildren<{
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  counterClockwise?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Ellipse: CXComponent<EllipseProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const {
      x,
      y,
      radiusX,
      radiusY,
      rotation = 0,
      startAngle = 0,
      endAngle = Math.PI * 2,
      counterClockwise = false,
      fill,
      stroke,
      strokeWidth,
    } = props;

    renderingContext.ctx2d.save();

    if (typeof fill === 'string') {
      renderingContext.ctx2d.fillStyle = fill;
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

Ellipse.displayName = 'Ellipse';
