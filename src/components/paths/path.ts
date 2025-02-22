import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.js';
import type { CXComponent, CXPoint, PropsWithChildren } from '../../types.js';
import { isArray } from '../../utils/type-guards.js';

export type PathProps = PropsWithChildren<{
  points?: readonly CXPoint[];
  beginPath?: boolean;
  closePath?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Path: CXComponent<PathProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { points, beginPath = true } = props;

    renderingContext.ctx2d.save();

    if (beginPath) {
      renderingContext.ctx2d.beginPath();
    }

    points?.forEach((point, index) => {
      const [x, y] = isArray(point) ? point : [point.x, point.y];

      if (index === 0) {
        renderingContext.ctx2d.moveTo(x, y);
      } else {
        renderingContext.ctx2d.lineTo(x, y);
      }
    });
  });

  useRenderAfterChildren((renderingContext) => {
    const { closePath = false, fill, stroke, strokeWidth } = props;

    if (closePath) {
      renderingContext.ctx2d.closePath();
    }

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

Path.displayName = 'Path';
