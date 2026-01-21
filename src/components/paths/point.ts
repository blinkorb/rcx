import { useRenderBeforeChildren } from '../../hooks/use-render.ts';
import type { RCXComponent, RCXPropsWithChildren } from '../../types.ts';

export type PointProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  lineTo?: boolean;
}>;

export const Point: RCXComponent<PointProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { x, y, lineTo = true } = props;

    if (lineTo) {
      context2D.lineTo(x, y);
    } else {
      context2D.moveTo(x, y);
    }
  });

  return props.children;
};

Point.displayName = 'Point';
