import { useRenderBeforeChildren } from '../../hooks/use-render.js';
import type { CXComponent, PropsWithChildren } from '../../types.js';

export type PointProps = PropsWithChildren<{
  x: number;
  y: number;
  lineTo?: boolean;
}>;

export const Point: CXComponent<PointProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { x, y, lineTo = true } = props;

    if (lineTo) {
      renderingContext.ctx2d.lineTo(x, y);
    } else {
      renderingContext.ctx2d.moveTo(x, y);
    }
  });

  return props.children;
};

Point.displayName = 'Point';
