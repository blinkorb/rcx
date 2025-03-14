import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type PointProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  lineTo?: boolean;
}>;

export const Point: RCXComponent<PointProps> = (props) => {
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
