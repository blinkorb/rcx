import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  CXComponent,
  PropsWithChildren,
  ShapeStyle,
  StyleProp,
} from '../../types.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';

export type ArcToProps = PropsWithChildren<{
  startControlX: number;
  startControlY: number;
  endControlX: number;
  endControlY: number;
  radius: number;
  style?: StyleProp<ShapeStyle>;
}>;

export const ArcTo: CXComponent<ArcToProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { startControlX, startControlY, endControlX, endControlY, radius } =
      props;

    renderingContext.ctx2d.save();

    renderingContext.ctx2d.arcTo(
      startControlX,
      startControlY,
      endControlX,
      endControlY,
      radius
    );
  });

  useRenderAfterChildren((renderingContext) => {
    const { fill, stroke, strokeWidth } = resolveStyles(props.style);

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

ArcTo.displayName = 'ArcTo';
