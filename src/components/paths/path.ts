import {
  useRenderAfterChildren,
  useRenderBeforeChildren,
} from '../../hooks/use-render.ts';
import type {
  RCXComponent,
  RCXPoint,
  RCXPropsWithChildren,
  RCXShapeStyle,
  RCXStyleProp,
} from '../../types.ts';
import { applyFillAndStrokeStyles } from '../../utils/apply-fill-and-stroke-style.ts';
import { resolveStyles } from '../../utils/resolve-styles.ts';
import { isArray } from '../../utils/type-guards.ts';

export type PathProps = RCXPropsWithChildren<{
  points?: readonly RCXPoint[];
  beginPath?: boolean;
  closePath?: boolean;
  style?: RCXStyleProp<RCXShapeStyle>;
}>;

export const Path: RCXComponent<PathProps> = (props) => {
  useRenderBeforeChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { points, beginPath = true } = props;

    context2D.save();

    if (beginPath) {
      context2D.beginPath();
    }

    points?.forEach((point, index) => {
      const [x, y] = isArray(point) ? point : [point.x, point.y];

      if (index === 0) {
        context2D.moveTo(x, y);
      } else {
        context2D.lineTo(x, y);
      }
    });
  });

  useRenderAfterChildren((renderingContext) => {
    const { context2D } = renderingContext;

    if (!context2D) {
      return;
    }

    const { closePath = false } = props;

    if (closePath) {
      context2D.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    context2D.restore();
  });

  return props.children;
};

Path.displayName = 'Path';
