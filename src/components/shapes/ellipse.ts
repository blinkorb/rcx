import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  RCXComponent,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.ts';
import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';

export type EllipseProps = RCXPropsWithChildren<{
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
  counterClockwise?: boolean;
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Ellipse: RCXComponent<EllipseProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const {
      x,
      y,
      radiusX,
      radiusY,
      rotation = 0,
      startAngle = 0,
      endAngle = Math.PI * 2,
      counterClockwise = false,
      beginPath = true,
    } = props;

    context2D.save();

    if (beginPath) {
      context2D.beginPath();
    }

    context2D.ellipse(
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      counterClockwise
    );
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { closePath = true } = props;

    if (closePath) {
      context2D.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    context2D.restore();
  });

  return props.children;
};

Ellipse.displayName = 'Ellipse';
