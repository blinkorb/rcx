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
    const { points, beginPath = true } = props;

    renderingContext.context2D.save();

    if (beginPath) {
      renderingContext.context2D.beginPath();
    }

    points?.forEach((point, index) => {
      const [x, y] = isArray(point) ? point : [point.x, point.y];

      if (index === 0) {
        renderingContext.context2D.moveTo(x, y);
      } else {
        renderingContext.context2D.lineTo(x, y);
      }
    });
  });

  useRenderAfterChildren((renderingContext) => {
    const { closePath = false } = props;

    if (closePath) {
      renderingContext.context2D.closePath();
    }

    applyFillAndStrokeStyles(renderingContext, resolveStyles(props.style));

    renderingContext.context2D.restore();
  });

  return props.children;
};

Path.displayName = 'Path';
