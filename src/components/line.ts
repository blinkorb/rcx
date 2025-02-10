import { useRenderBeforeChildren } from '../hooks/use-render.ts';
import type { CXComponent, PropsWithChildren } from '../types.ts';

export type LineProps = PropsWithChildren<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  beginPath?: boolean;
  closePath?: boolean;
  stroke?: string;
  strokeWidth?: number;
}>;

export const Line: CXComponent<LineProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const {
      startX,
      startY,
      endX,
      endY,
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

      renderingContext.ctx2d.moveTo(startX, startY);
      renderingContext.ctx2d.lineTo(endX, endY);

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

Line.displayName = 'Line';
