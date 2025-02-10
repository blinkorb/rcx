import { useRenderBeforeChildren } from '../hooks/use-render.ts';
import type { CXComponent, CXPoint, PropsWithChildren } from '../types.ts';
import { isArray } from '../utils.ts';

export type PathProps = PropsWithChildren<{
  points: readonly CXPoint[];
  beginPath?: boolean;
  closePath?: boolean;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Path: CXComponent<PathProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const {
      points,
      beginPath = true,
      closePath = false,
      stroke,
      strokeWidth,
    } = props;

    renderingContext.ctx2d.save();

    if (typeof strokeWidth === 'number') {
      renderingContext.ctx2d.lineWidth = strokeWidth;
    }

    if (typeof stroke === 'string') {
      if (beginPath) {
        renderingContext.ctx2d.beginPath();
      }

      points.forEach((point, index) => {
        const [startX, startY] = isArray(point) ? point : [point.x, point.y];

        if (index === 0) {
          renderingContext.ctx2d.moveTo(startX, startY);
        } else {
          renderingContext.ctx2d.lineTo(startX, startY);
        }
      });

      if (closePath) {
        renderingContext.ctx2d.closePath();
      }

      renderingContext.ctx2d.strokeStyle = stroke;
      renderingContext.ctx2d.stroke();
    }

    renderingContext.ctx2d.restore();
  });

  return props.children;
};

Path.displayName = 'Path';
